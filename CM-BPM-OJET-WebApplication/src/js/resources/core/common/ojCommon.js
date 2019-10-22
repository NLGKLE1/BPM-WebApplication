define(['text!./varconfig.json', 'crypto-js', 'ojs/ojcore', 'knockout', 'jquery', 'ojFetch', 'ojTime', 'ojRouterConfig', 'ojs/ojmodule-element-utils', 'ojCommonComponents', 'ojCommonLibs', 'ojCoreComponents'],
    function (vars, CryptoJS, oj, ko, $, ojFetch, ojTime, ojRouterConfig, ojDC, moduleUtils) {
        const self = this;

        return {
            // context: function(){
            //     return "test"
            // },
            Transporter: {
                /**
                 * Puts a
                 * @param {string} key 
                 * @param {Object} value 
                 */
                put: function (key, value) {
                    sessionStorage.setItem(key, JSON.stringify(value));

                },
                /**
                 * Returns value and remove that
                 * @param {string} key 
                 */
                pop: function (key) {
                    var value = sessionStorage.getItem(JSON.parse(key));
                    sessionStorage.removeItem(key);
                    return value;
                },
                /**
                 * Returns value
                 * @param {string} key 
                 */
                seek: function (key) {
                    var value = sessionStorage.getItem(JSON.parse(key));
                    return value;
                }
            },
            RouterCurrentPage: function () {
                return oj.Router.rootInstance.stateId._latestValue;
            },
            RouterNavHistory: function () {
                return oj.Router.rootInstance._navHistory;
            },
            currencyConverter: function (currency) {
                return {
                    "type": "number",
                    "options": {
                        "style": "currency",
                        "currency": currency
                    }
                };
            },
            formatCurrency: function (amount, curr) {
                if (!amount) {
                    return "0";
                }
                amount += '';
                let x = amount.split('.');
                let x1 = x[0];
                let x2 = x.length > 1 ? curr === 'USD' ? '.' + x[1] : ',' + x[1] : '';
                let rgx = /(\d+)(\d{3})/;
                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + (curr === 'USD' ? ',' : '.') + '$2');
                }
                return x1 + x2;
            },
            // to be simplified
            sortArrayNaturalCompare: function (array, path2key, direction) {
                let naturalCompare = function (a, b) {
                    var ax = [], bx = [];

                    if (a[path2key] != null) {
                        ((a[path2key]) + '').replace(/(\d+)|(\D+)/g, function (_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
                    }

                    if (b[path2key] != null) {
                        ((b[path2key]) + '').replace(/(\d+)|(\D+)/g, function (_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
                    }

                    while (ax.length && bx.length) {
                        var an = ax.shift();
                        var bn = bx.shift();
                        var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
                        if (nn) return nn;
                    }

                    return ax.length - bx.length;
                }
                String(direction).toLowerCase() == "desc" ? array.sort(naturalCompare).reverse() : array.sort(naturalCompare);
            },
            sortArrayDateCompare: function (array, path2key, direction) {
                if (direction.toUpperCase() === 'ASC') {
                    array.sort(function (a, b) {
                        return new Date(a[path2key]) - new Date(b[path2key]);
                    });
                } else {
                    array.sort(function (a, b) {
                        return new Date(b[path2key]) - new Date(a[path2key]);
                    });
                }
            },
            sortArray: function (array, type, sortAttribute) {
                if (type.toUpperCase() == 'ASC') { // ascending
                    array().sort(function (a, b) {
                        if (sortAttribute.indexOf(".") > -1) {
                            let at = sortAttribute.split(".");
                            const aa = (a[at[0]][at[1]] + '').toUpperCase();
                            const ab = (b[at[0]][at[1]] + '').toUpperCase();
                            let c = 0;
                            if (aa > ab) {
                                c = 1;
                            } else if (aa < ab) {
                                c = -1;
                            }
                            return c;
                        } else {
                            const aa = (a[sortAttribute] + '').toUpperCase();
                            const ab = (b[sortAttribute] + '').toUpperCase();
                            let c = 0;
                            if (aa > ab) {
                                c = 1;
                            } else if (aa < ab) {
                                c = -1;
                            }
                            return c;
                        }
                    });
                } else {
                    array().sort(function (a, b) {
                        if (sortAttribute.indexOf(".") > -1) {
                            let at = sortAttribute.split(".");
                            const aa = (a[at[0]][at[1]] + '').toUpperCase();
                            const ab = (b[at[0]][at[1]] + '').toUpperCase();
                            let c = 0;
                            if (aa > ab) {
                                c = 1;
                            } else if (aa < ab) {
                                c = -1;
                            }
                            return c * -1;
                        } else {
                            const aa = (a[sortAttribute] + '').toUpperCase();
                            const ab = (b[sortAttribute] + '').toUpperCase();
                            let c = 0;
                            if (aa > ab) {
                                c = 1;
                            } else if (aa < ab) {
                                c = -1;
                            }
                            return c * -1;
                        }

                    });
                };
                array.valueHasMutated();
            },
            openPopup: function (id) {
                let popup = document.querySelector("#".concat(id) + "> oj-popup");
                (popup == null) ? document.querySelector("#".concat(id)).open() : popup.open();
            },
            closePopup: function (id) {
                document.getElementById(id).close();
            },
            createText: function (translationString) {
                let observable = ko.observable(oj.Translations.getTranslatedString(translationString));
                
                // get translations after we import those
                // $('#homepageLanguagePicker').on('translateEvent', function () {
                //     observable(oj.Translations.getTranslatedString(translationString));
                // });
                return observable;
            },
            createInput: function (value) {
                return ko.observable(value);
            },
            createArray: function (array) {
                return ko.observableArray(array);
            },
            /**
             * Returns an array data provider
             * @param {*} observableArray data supported by the components
             * @param {*} keyAttributes String with field name which stores the key in the data. If multiple, use array: ["attrid", "attrversion"]
             * @param {*} sortAttrString sort attribute upon which the data should be sorted
             * @param {*} directionString sort direction, either "ascending" or "descending"
             */
            createADP: function (observableArray, keyAttrString, sortAttrString, directionString) {
                if (!sortAttrString) {
                    return new oj.ArrayDataProvider(observableArray, {
                        keyAttributes: keyAttrString
                    });
                } else {
                    return new oj.ArrayDataProvider(observableArray, {
                        keyAttributes: keyAttrString,
                        implicitSort: [{
                            attribute: sortAttrString,
                            direction: directionString
                        }]
                    });
                };
            },
            /**
             * Creates a new object representing data that supports paging functionality
             * @param {*} array dataSource array
             * @param {*} idAttribute sort attribute ()
             */
            createPTDS: function (array) {
                return new oj.PagingTableDataSource(new oj.ArrayTableDataSource(array));
            },
            /**
             * Sort paging table data source based on a key id and the desired direction
             * @param {*} ptds Paging table data source
             * @param {*} sortKey sort key string
             * @param {*} sortDirection direction string. can be "ascending" or "descending"
             */
            sortPTDS: function (ptds, sortKey, sortDirection) {
                let criteria = {
                    key: sortKey,
                    direction: sortDirection
                }
                return ptds.sort(criteria);
            },
            /**
             * Returns new ArrayPagingDataSource - Implementation of PagingModel backed by an array of data
             * @param {*} array data array
             */
            createAPDS: function (array) {
                return new oj.ArrayPagingDataSource(array);
            },
            /**
             * TreeDataSource implementation that represents hierarchical data available from an array of JSON objects
             * @param {*} json
             */
            createJSONTreeDataSource: function (json) {
                return new oj.JsonTreeDataSource(json);
            },
            // FUNCÇAO NUNCA USADA
            renderer: function (t) {
                return oj.KnockoutTemplateUtils.getRenderer(t, true);
            },

            /**
             * Service call method
             * @param {*} domain Service Domain
             * @param {*} serviceName service name from in \resources\dataControls\domain
             * @param {*} payload URI/query parameters
             * @param {*} params json for message.data
             */
            callService: function (domain, serviceName, payload, params, responseStructure) {
                let myDC = domain.toLowerCase();
                return (ojDC[myDC])()[serviceName](responseStructure, payload, params);
            },
            /**
             * Returns translated strings
             * @param {*} array
             */
            translateTexts: function (array) {
                $('#homepageLanguagePicker').on('translateEvent', function () {
                    $(array).each(function (i) {
                        array[i].value(oj.Translations.getTranslatedString(array[i].translation));
                    })
                });
            },
            /**
             * Returns date string in 'DD MMM YYYY' format
             * @param {*} dateText date string to be converted
             */
            formatDate: function (dateText) {
                if (dateText === null || dateText === '' || dateText === undefined) {
                    return '';
                } else {
                    return ojTime(dateText, "YYYY-MM-DD").format('DD MMM YYYY');
                }
            },
            /**
             * Returns date-time string in 'DD MMM YYYY hh:mm' format
             * @param {*} timeText date-time string to be converted
             */
            formatTime: function (timeText) {
                if (timeText === null || timeText === '' || timeText === undefined) {
                    return '';
                } else {
                    return ojTime(timeText, "YYYY-MM-DD HH:mm:ss").format('DD MMM YYYY HH:mm').toUpperCase();
                }
            },
            /**
             * Replaces previous context with new one
             * @param {*} json session context structure
             */
            setSessionContext: function (json) {
                sessionStorage.removeItem("atradius-context");
                sessionStorage.setItem("atradius-context", JSON.stringify(json));
            },
            putSessionContext: function (json, mergePropertiesDeeply) {
                this.setSessionContext($.extend(mergePropertiesDeeply || true, this.getSessionContext(), json));
            },
            setUserContext: function (json) {
                sessionStorage.removeItem("atradius-user");
                sessionStorage.setItem("atradius-user", JSON.stringify(json));
            },
            /**
             * Returns parsed atradius-context as an object
             */
            getSessionContext: function () {
                const sessionStorageAux = sessionStorage.getItem("atradius-context");
                if (sessionStorageAux !== "undefined") {
                    return JSON.parse(sessionStorage.getItem("atradius-context"));
                } else {
                    return {};
                }
            },
            getSessionContextParameter: function (paramKey) {
                let ctx = this.getSessionContext();
                for (key in ctx) {
                    let currKey = key.toUpperCase().replace(/[\W]/gi, "");
                    let searchingKey = paramKey.replace(/[\W]/gi, "");
                    if (currKey === searchingKey) {
                        return ctx[key];
                    }
                }
            },
            /**
             * Returns parsed atradius-context as an object and removes that to avoid "unexcepted behaviors"
             */
            popSessionContext: function () {
                const sessionStorageAux = sessionStorage.getItem("atradius-context");
                if (sessionStorageAux !== "undefined") {
                    return JSON.parse(sessionStorage.getItem("atradius-context"));
                } else {
                    return;
                }
            },
            getUserContext: function () {
                const userSessionStorageAux = sessionStorage.getItem("atradius-user");
                if (userSessionStorageAux !== "undefined") {
                    return JSON.parse(sessionStorage.getItem("atradius-user"));
                } else {
                    return {};
                }
            },
            /**
             *
             * @param {*} id
             */
            subRouterGoTo: function (id) {
                this.getSubRouter().stateId(id);
            },
            /**
             *
             * @param {*} page
             * @param {*} isRoot
             */
            goTo: function (page, isRoot) {
                $('#elemAtradiusAlerts').hide();
                let session = sessionStorage.getItem('atradius-nav-context');
                session = session ? JSON.parse(session) : {
                    'navigated-from': this.RouterCurrentPage()
                };
                session['navigated-from'] = this.RouterCurrentPage(); // adds navigated-from
                sessionStorage.setItem('atradius-nav-context', JSON.stringify(session));
                if (isRoot != undefined) {
                    if (isRoot == true) {
                        oj.Router.rootInstance.go(page, {
                            historyUpdate: 'skip'
                        });
                    } else {
                        oj.Router.rootInstance.go(page);
                    }
                } else {
                    oj.Router.rootInstance.go(page);
                }

            },

            //Disable browser scrolling
            disableScrolling: function () {
                var x = window.scrollX;
                var y = window.scrollY;
                window.onscroll = function () {
                    window.scrollTo(x, y);
                };
            },
            //Disable browser scrolling
            enableScrolling: function () {
                window.onscroll = function () { };
            },
            // scroll to top of page and enable scrolling
            releaseScroll: function () {
                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });
                window.onscroll = function () { };
            },
            /**
             *
             * @param {*} id page div id
             */
            initializeStart: function (id, flag) {
                $("#loadingScreen").show();
                if (!flag) {
                    window.onscroll = function () {
                        window.scrollTo(0, 0);
                    };
                    window.scrollTo({
                        top: 0,
                        behavior: "instant"
                    });
                }

            },
            initializeFinish: function (id, viewPageFlag, loadingFlag) {
                if (loadingFlag || loadingFlag === undefined) {
                    $("#loadingScreen").hide();
                    $("#loadingScreen").removeClass("ojetloading-stagger");
                }
                if (viewPageFlag || viewPageFlag === undefined) {
                    document.getElementById(id).style.display = "block";
                    $('#' + id).fadeIn('slow');
                }
                window.onscroll = function () { };
            },
            initializeNavigation: function (id) {
                $("#" + id).fadeOut("slow");
                $("#loadingScreen").addClass("ojetloading-stagger");
                $("#loadingScreen").show();
                window.onscroll = function () {
                    window.scrollTo(0, 0);
                };
                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });
            },
            getProperty: function (propertyName, object) {
                var parts = propertyName ? propertyName.split(".") : "",
                    length = parts.length,
                    i,
                    property = object || this;

                for (i = 0; i < length; i++) {
                    if (parts[i].endsWith(']') && (parts[i].indexOf('[') > -1)) {
                        let atributes = parts[i].split("[");
                        property = property[atributes[0]];
                        property = property[atributes[1].split("]")[0]];
                    } else {
                        property = property[parts[i]];
                    }
                }
                return property;
            },
            moduleUtils: function () {
                return moduleUtils;
            },
            ko: function () {
                return ko;
            },
            core: function () {
                return oj;
            },
            ojFetch: function () {
                return ojFetch;
            },
            ojTime: function (a1, a2) {
                return ojTime(a1, a2);
            },
            init: function (app) {
                oj.Router.sync().then(
                    function () {
                        app.loadModule();
                        ko.applyBindings(app, document.getElementById('atradius'));
                    },
                    function (error) {
                        oj.Logger.error('Error in root start: ' + error.message);
                    }
                );
            },
            // sigh
            createComputed: function (func, self) {
                return ko.computed(func, self);
            },
            // Router functions
            configureRouter: function (routerConfig) {
                (oj.Router.rootInstance).configure(routerConfig.MainRouter());
                oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
            },
            generateAndConfigureSubRouter: function (routerConfig) {
                let subRouter = oj.Router.rootInstance.createChildRouter('subNavRouter');
                subRouter.configure(routerConfig.SubNavRouter());
                return subRouter;
            },
            getMainRouter: function () {
                return oj.Router.rootInstance;
            },
            getSubRouter: function () {
                return oj.Router.rootInstance.getChildRouter('subNavRouter');
            },
            ojConfig: function () {
                return oj.Config;
            },
            ojTranslations: function () {
                return oj.Translations;
            },
            ojRouter: function () {
                return oj.Router;
            },
            getRouterInstance: function () {
                return oj.Router.rootInstance;
            },
            /**
             * Generates a new SHA1 key
             */
            generateSHA1: function () {
                const userContext = this.getUserContext();
                const username = userContext.loggedInUserName;
                const timestamp = (new Date).toISOString().toString();
                return CryptoJS.SHA1(username + timestamp).toString();
            },
            generatePageTechnicalError: function (error) {
                const userContext = this.getUserContext();
                const username = userContext.loggedInUserName;
                const timestamp = (new Date).toISOString().toString();
                document.getElementById('elemTechnicalError').technicalErrorHandling(CryptoJS.SHA1(username + timestamp).toString());
                this.errorLogServlet('page', error);
            },
            errorLogServlet: function (type, responseStructure) {
                // const userContext = this.getUserContext();
                // const username = userContext.loggedInUserName;
                // const timestamp = (new Date).toISOString().toString();
                // let errorCode, errorDescription;
                // if (type === 'service') {
                //     switch (responseStructure.message.response.status) {
                //         case 404:
                //             errorCode = 'OSB404';
                //             errorDescription = 'Request failed with status code 404';
                //             break;
                //         case 500:
                //             errorCode = responseStructure.message.response.data.message.header.from.application +
                //                 responseStructure.message.response.data.message.header.communication.result.code;
                //             errorDescription = responseStructure.message.response.data.message.header.communication.result.description;
                //             break;
                //         default:
                //             errorCode = 'OSB' + responseStructure.message.response.status;
                //             errorDescription = responseStructure.message.response.data;
                //             break;
                //     }
                // } else {
                //     errorCode = 'OJET503';
                //     errorDescription = responseStructure;
                // }

                // const payload = {
                //     "traceId": type === 'service' ? responseStructure.traceID : CryptoJS.SHA1(username + timestamp).toString(),
                //     "frontendPage": "P-DPP-CNA",
                //     "errorCode": errorCode,
                //     "errorDescription": errorDescription,
                //     "username": username,
                //     "timestamp": timestamp
                // }
                // const varconfig = JSON.parse(vars);
                // const urlString = varconfig['logger_servlet']+'UTIL-BBT-OJET-JavaUILogging/loggingServlet';
                // ojFetch.post(urlString, payload);
            },
            getNameInitials: function (name) {
                if (name) {
                    const numOfNames = name.split(' ').length;
                    if (numOfNames === 1) {
                        return name.split(' ')[0].charAt(0).toUpperCase();
                    } else {
                        return name.split(' ')[0].charAt(0).toUpperCase() + name.split(' ')[numOfNames - 1].charAt(0).toUpperCase();
                    }
                } else {
                    return ''
                }
            },
            //Check if a Date is within a Date range
            checkDateWithinRange: function (minDate, maxDate) {
                let isDateWithinRange = false;
                let today = new Date();
                let time = today.getHours() + ":" + today.getMinutes('mm') + ":" + today.getSeconds();
                time = ojTime(time, "H:m:s").format('HH:mm:ss');
                const currentDate = ojTime(new Date(), "").format('YYYY-MM-DD') + 'T' + time + 'Z';
                if (currentDate > minDate && currentDate < maxDate) {
                    isDateWithinRange = true
                }
                return isDateWithinRange
            },
            removeObjectFields: function (object, parent, parentKey) {
                for (key in object) {
                    if (!object[key]) {
                        delete object[key];
                    } else {
                        if ((typeof object[key]) === 'object') {
                            if (Array.isArray(object[key])) {
                                ojet.removeArrayFields(object[key], object, key);
                            } else {
                                ojet.removeObjectFields(object[key], object, key);
                            }
                        }
                    }
                }
                if (Object.keys(object).length === 0 && parent) {
                    Array.isArray(parent) ? parent.splice(parentKey, 1) : delete parent[parentKey];
                }
            },
            removeArrayFields: function (array, parent, parentKey) {
                array.forEach(function (elem, index) {
                    if (!elem) {
                        array.splice(index, 1);
                    } else {
                        if ((typeof elem) === 'object') {
                            if (Array.isArray(elem)) {
                                ojet.removeArrayFields(elem, array, index);
                            } else {
                                ojet.removeObjectFields(elem, array, index);
                            }
                        }
                    }
                })
                if (array.length === 0 && parent) {
                    Array.isArray(parent) ? parent.splice(parentKey, 1) : delete parent[parentKey];
                }
            },
            /**
             * Returns the specified date plus or minus specified number or days, months or years
             * @param {*} date 
             * @param {*} value number for type
             * @param {*} type 'YEAR', 'MONTH' or 'DAY', optional parameter - default is 'DAY'
             * @param {*} operation 'ADD' or 'SUBTRACT' - optional parameter, default is 'ADD'
             */
            changeDateValue: function (date, value, type, operation) {
                const newDate = new Date(date);
                switch (type) {
                    case 'YEAR':
                        return operation === 'SUBTRACT' ? new Date(newDate.getFullYear() - value, newDate.getMonth(), newDate.getDate()) :
                            new Date(newDate.getFullYear() + value, newDate.getMonth(), newDate.getDate());
                    case 'MONTH':
                        return operation === 'SUBTRACT' ? new Date(newDate.getFullYear(), newDate.getMonth() - value, newDate.getDate()) :
                            new Date(newDate.getFullYear(), newDate.getMonth() + value, newDate.getDate());
                    default:
                        return operation === 'SUBTRACT' ? new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - value) :
                            new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + value);
                }
            }
        };
    });