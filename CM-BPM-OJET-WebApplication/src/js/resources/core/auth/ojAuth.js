define(['ojet', 'jquery', 'ojUtils'],
function (ojet, $, utils) {
    var self = this;
    window.OpenIDConnectClient = (function () {
        //Just to avoid to be 'plain' on localStorage like a mask
        var _authKey = '0xA';
        var _accessTokenKey = '0xB';
        var _refreshTokenKey = '0xC';
        var _idTokenKey = '0xG';
        var _codeKey = '0xD';
        var _userInfoKey = '0xE';
        var _lastNonceKey = '0xF';

        var FlowTypes = {
            AuthorizationCode: 'AuthorizationCode',
            Implicit: 'Implicit'
        }

        /**
         * Accessor generator factory
         * 
         * Produces an accessor generator binded to {context}
         * 
         * @returns An accessor generator instance
         */
        function FactoryGetSet(context) {
            return function GetSet(defaultValue) {
                var value = defaultValue;
                var _whenChanged = new Function();
                var _persistKey = null;
                
                var accessor = function Accessor(setValue) {
                    if (arguments.length > 0) {
                        value = arguments[0];
                        _whenChanged(value);
                        return context;
                    }
                    return value;
                }.bind(context);
                
                accessor.whenChanged = function(fn) {
                    _whenChanged = fn;
                    return accessor;
                }
                accessor.isEmpty = function () {
                    return value == null || value == '';
                }
                accessor.isNotEmpty = function() {
                    return !(value == null || value == '');
                }
                accessor.clear = function () {
                    if (typeof value == 'string') {
                        value = '';
                    } else {
                        value = undefined;
                    }
                    return accessor;
                }
                accessor.isDifferentOf = function (of) {
                    return value != of;
                }
                accessor.isEqualsTo = function (to) {
                    return value == to;
                }
                accessor.persistKey = function(persistKey) {
                    if(persistKey) {
                        _persistKey = persistKey;
                        return accessor;
                    } else {
                        return persistKey; 
                    }
                }
                accessor.sync = function() {
                    if(_persistKey==null) { throw new Error("The accessor you are trying to sync doesn't have any key defined, use persistKey()") }
                    accessor(JSON.parse(atob(window.localStorage.getItem(_persistKey) || '') || '{}').persist);
                    return accessor;
                }
                accessor.persist = function() {
                    if(_persistKey==null) { throw new Error("The accessor you are trying to persists doesn't have any key defined, use persistKey()") }
                    window.localStorage.setItem(_persistKey, btoa(JSON.stringify({ persist: value })));
                    return accessor;
                }
                return accessor;
            }
        }
        

        function OpenIDConnectClient() {
            var self = this;
            var GetSet = FactoryGetSet(this);

            var _cachedParams = {};

            //Endpoint Settings
            self.loginUrl = GetSet();
            self.tokenUrl = GetSet();
            self.userInfo = GetSet();
            self.userInfoUrl = GetSet();

            //Tokens and Codes
            self.code = GetSet();
            self.accessToken = GetSet();
            self.idToken = GetSet();
            self.refreshToken = GetSet();
            
            self.redirectBackURL = GetSet(window.location.origin);
            self.clientId = GetSet();
            self.clientSecret = GetSet();
            self.lastNonce = GetSet();

            self.lastNonce.persistKey(_lastNonceKey).sync();

            self.accessToken.persistKey(_accessTokenKey).sync();
            self.refreshToken.persistKey(_refreshTokenKey).sync();
            self.userInfo.persistKey(_userInfoKey).sync();
            self.idToken.persistKey(_idTokenKey).sync();
            
            //Flow Settings
            self.useNonce = GetSet(true);
            self.flowSpec = {}; //Flow prototype definition
            self.flow = GetSet();
            self.flow.whenChanged(function(newValue) {
                self.flowSpec = OpenIDConnectClient.prototype.flows[newValue];
            })(FlowTypes.Implicit);
            
            self.accessTokenClaims = GetSet();
            self.accessToken.whenChanged(function(newValue) {
                if(newValue) {
                    self.accessTokenClaims(JWT.parse(newValue));
                }
            }).sync();

            self.cacheParameters = function () {
                _cachedParams = utils.getURLParametersIndexed(self.isImplicit());
                return self;
            }

            /**
             * Checks if a JWT id token has the same nonce inside,
             * helping to 'mitigate replay attacks'
             * 
             * @private
             * @clojured
             */
            function hasTokenValidNonce(tokenStr, nonce) {
                var token = JWT.parse(tokenStr);
                return token.payload.nonce === nonce;
            }

            self.scanForTokens = function () {
                self.cacheParameters();

                if(self.accessToken.sync().isEmpty()) {
                    self.accessToken(_cachedParams['access_token']);
                    self.accessToken.persist();
                }
                
                // Always grab it and it isn't valid it will invalidate and redirect
                if(_cachedParams['id_token']) {
                    self.idToken(_cachedParams['id_token'])
                    self.idToken.persist();

                    /* 
                    IE11 Bug that avoid this part to be used,
                    this code produces a loop in some versions of IE 11 due it doesn't interrupt
                    the javascript execution when redirected, then the nonce is lost or changed because it
                    generates a new one and lost the last one used.

                    if(self.useNonce()) {
                        if(!hasTokenValidNonce(self.idToken(), self.lastNonce())) {
                            self.invalidate();
                            self.redirectToLogin();
                            return self;
                        }
                    }
                    */
                }

                if(self.refreshToken.sync().isEmpty()) {
                    _cachedParams['refresh_token'];
                }

                if(_cachedParams['code']) {
                    self.code(_cachedParams['code']);
                }

                return self;
            }

            /**
             * @returns {Promise} logout promise that will be resolved when all steps related are finished
             */
            self.logout = function(end_session_endpoint, base_url) {
                return new Promise(function(resolve, reject) {
                    var request = new XMLHttpRequest();
                    window.location.href = end_session_endpoint + '?redirect_uri=' + base_url;
                    self.invalidate();
                    resolve(self);
                });
            }

            self.initate = function () {
                var authState = parseInt(window.localStorage.getItem(_authKey))
                if (!authState) {
                    window.localStorage.setItem(_authKey, 1);
                }
                return self;
            }

            /**
             * Clear all data related to the OIDC session on hold
             */
            self.invalidate = function () {
                self.accessToken.clear().persist();
                self.refreshToken.clear().persist();
                self.idToken.clear().persist();
                self.code.clear();

                return self;
            }

            self.isImplicit = function (setValue) {
                if (setValue) {
                    self.flow(FlowTypes.Implicit);
                    return self;
                }
                return self.flow.isEqualsTo(FlowTypes.Implicit);
            }

            self.isAuthorizationCode = function (setValue) {
                if (setValue) {
                    self.flow(FlowTypes.AuthorizationCode);
                    return self;
                }
                return self.flow.isEqualsTo(FlowTypes.AuthorizationCode);
            }

            self.hasAccessToken = function () {
                self.scanForTokens();
                return self.accessToken.isNotEmpty();
            }

            self.redirectToLogin = function () {
                var finalUrlToRedirect = self.loginUrl();
                if(self.useNonce()) {
                    self.lastNonce(GenerateUUID())
                    self.lastNonce.persist();

                    finalUrlToRedirect += '&nonce=' + self.lastNonce();
                }

                window.location.href = finalUrlToRedirect;
                return self;
            }

            self.getPayloadClaims = function() {
                return self.accessTokenClaims().payload;
            }

            /**
             * After all steps are done the returned promise will be resolved
             * 
             * @returns Promisse
             */
            self.grantAuthentication = function () {
                return new Promise(self.flowSpec.grantAuthentication.bind(this));
            }

            /**
             * Fetch the user info from the indicated info endpoint
             */
            self.fetchUserInfo = function() {
                if(self.userInfoUrl.isEmpty()) {
                    throw new Error('No user info URL was defined, use: userInfoUrl()');
                }
                return new Promise(self.flowSpec.fetchUserInfo.bind(this));
            }
        }

        /**
         * @returns A new generated unique universal identifier v4
         */
        function GenerateUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = parseFloat('0.' + Math.random().toString().replace('0.', '') + new Date().getTime()) * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        /**
         * Produces a data url encoded based on object passed
         * @param {object} data 
         */
        function objToFormDataUrl(data) {
            var urlEncodedDataPairs = [];

            for(name in data) {
                urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }
            // Combine the pairs into a single string and replace all %-encoded spaces to 
            // the '+' character; matches the behaviour of browser form submissions.
            urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
            return urlEncodedData;
        }

        /**
         * use this to make a Base64 encoded string URL friendly, 
         * i.e. '+' and '/' are replaced with '-' and '_' also any trailing '=' 
         * characters are removed
         *
         * @param {String} str the encoded string
         * @returns {String} the URL friendly encoded String
         */
        function Base64EncodeUrl(str){
            return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
        }

        /**
         * JWT
         * 
         * Receives a JWT and materializes it in an javascript object or vice versa
         */
        var JWT = {
            parse: function(jwtStr) {
                var parts = jwtStr.split('.');

                return {
                    header: JSON.parse(atob(parts[0])),
                    payload: JSON.parse(atob(parts[1])),
                    signature: parts[2]
                }
            },
            stringify: function(jwtObj) {
                var header = btoa(JSON.stringify(jwtObj.header));
                var payload = btoa(JSON.stringify(jwtObj.payload));
                var signature = jwtObj.signature;

                return [Base64EncodeUrl(header),Base64EncodeUrl(payload),signature].join('.');
            }
        }

        window.JWT = JWT;

        OpenIDConnectClient.prototype.flows = {
            'AuthorizationCode': {
                grantAuthentication: function (resolve, reject) {
                    var self = this;

                    if(self.hasAccessToken()) {
                        return resolve({ instance: self, status: 'authenticated' });
                    } else if (self.code.isNotEmpty()) {
                        //Call the server for the missing tokens
                        //Then resolve the promise
                        var req = new XMLHttpRequest();
                        req.open('POST', self.tokenUrl(), true);
                        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        req.setRequestHeader('Authorization', 'Basic ' + btoa(self.clientId() + ':' + self.clientSecret()));
                        
                        var data = objToFormDataUrl({
                            'code': self.code(),
                            'grant_type': 'authorization_code',
                            'redirect_uri': self.redirectBackURL()
                            //'client_id': self.clientId(),
                            //'client_secret': self.clientSecret()
                        });
                        
                        req.onreadystatechange = function () {
                            if (req.readyState == XMLHttpRequest.DONE) {
                                if (req.status == 200) {
                                    var response = JSON.parse(req.responseText);

                                    self.accessToken(response['access_token']);
                                    self.refreshToken(response['refresh_token']);

                                    self.accessToken.persist();
                                    self.refreshToken.persist();

                                    resolve({ instance: self, status: 'authenticated' });
                                } if (req.status == 400) {
                                    reject({ instance: self, status: 'unauthorized' });
                                } else {
                                    reject({ instance: self, status: 'unknown' });
                                }
                            }
                        };

                        req.send(data);

                    } else {
                        self.redirectToLogin();
                        reject({ instance: self, status: 'redirecting' });
                    }
                },
                fetchUserInfo: function(resolve, reject) {
                    var self = this;

                    if(!self.hasAccessToken()) {
                        reject({ instance: self, status: 'not-logged' });
                    }

                    var req = new XMLHttpRequest();
                    req.open('GET', self.userInfoUrl(), true);
                    req.setRequestHeader('Authorization', 'Bearer ' + self.accessToken());
                    req.onreadystatechange = function() {
                        if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
                            var response = JSON.parse(req.responseText);
                            self.userInfo(response);
                            self.userInfo.persist();
                            resolve({ instance: self, status: 'success' });
                        }
                    }
                    req.send();
                }
            },
            'Implicit': {
                grantAuthentication: function (resolve, reject) {
                    var self = this;
                    //Just grabs the token from parameters then persist
                    if(self.hasAccessToken()) {
                        return resolve({ instance: self, status: 'authenticated' });
                    } else if (self.accessToken.isEmpty()) {
                        self.redirectToLogin();
                        reject({ instance: self, status: 'redirecting' });
                    }
                },
                fetchUserInfo: function(resolve, reject) {
                    var self = this;

                    if(!self.hasAccessToken()) {
                        reject({ instance: self, status: 'not-logged' });
                    }

                    var req = new XMLHttpRequest();
                    req.open('GET', self.userInfoUrl(), true);
                    req.setRequestHeader('Authorization', 'Bearer ' + self.accessToken());
                    req.onreadystatechange = function() {
                        if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
                            var response = JSON.parse(req.responseText);
                            self.userInfo(response);
                            self.userInfo.persist();
                            resolve({ instance: self, status: 'success' });
                        }
                    }
                    req.send();
                }
            }
        }

        return new OpenIDConnectClient();
    })
    return OpenIDConnectClient()
    
})
