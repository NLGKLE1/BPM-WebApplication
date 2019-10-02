define(['ojFetch'], function (ojfetch) {
    const baseUrl =
        "http://localhost:3000";
    //  "https://private-13996-prapi2.apiary-mock.com";
    // "http://vbbtd01osb2.nbv.t2.dev.bbt.atradiusnet.com:8011"; // NODE 2";  
    /********** DISABLE AND ENABLE SCROLL ********************/
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    const keys = {
        37: 1,
        38: 1,
        39: 1,
        40: 1
    };

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    };

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    };
    self.getURLParameters = function (searchByHash, url) {
        var search = searchByHash ? window.location.hash : window.location.search;

        search = search.trim().substring(1);

        if (search.length <= 0) {
            return [];
        }

        return search
            .split("&")
            .map(function (i) {
                var values = i.split("=");
                return { name: values[0], value: values[1] }
            });
    };

    String.prototype.isMatching = function(strSearch) {
        "use strict";
        let strMatching = this;
        
        let anyWildcardChar = "%";
        let expStr = strSearch.split(anyWildcardChar).join("(.*?)");
        if(strSearch.indexOf(anyWildcardChar) !== -1) { //If it's using wildcard
            expStr = "^" + expStr + "$";
        }
        let expression = new RegExp(expStr, "gi");
        return expression.test(strMatching);
    }

    /********************************* */
    return {        /**
        *Check if the label existes on the nls files, other wise will return a default label to warn that
        *there is a lack of translation
        * @param {String} label the label to check
        */
        getLabel: function (label) {
            if (oj.Translations.getResource(label)) {
                return label
            }
            else {
                return 'no-label'
            }
        },
        /**
       * Produces a data url encoded based on object passed
       * @param {object} data 
       */
        getURLParametersIndexed: function (searchByHash, url) {
            var params = {};

            self.getURLParameters(searchByHash).forEach(function (item) {
                params[item.name] = item.value;
            });

            return params;
        },
        disableScroll: function () {
            // older FF
            if (window.addEventListener) {
                window.addEventListener('DOMMouseScroll', preventDefault, false);
            }
            // modern standard
            window.onwheel = preventDefault;
            // older browsers, IE
            window.onmousewheel = document.onmousewheel = preventDefault;
            // mobile
            window.ontouchmove = preventDefault;
            document.onkeydown = preventDefaultForScrollKeys;
        },

        enableScroll: function () {
            if (window.removeEventListener) {
                window.removeEventListener('DOMMouseScroll', preventDefault, false);
            }
            window.onmousewheel = document.onmousewheel = null;
            window.onwheel = null;
            window.ontouchmove = null;
            document.onkeydown = null;
        }
    };
});
