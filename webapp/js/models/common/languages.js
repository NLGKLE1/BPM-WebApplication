define([],
    function () {
        const self = this;

        let languages = [];

        function processLanguages(list) {
            languages = [];
            list.forEach(function (elem) {
                languages.push({
                    'language_code': elem.source_lang_code,
                    'language_name': elem.target_lang_name
                });
            });
        }
        return {
            getLanguageList: function (observable, pageUriParams, func) {
                let serviceUriParams = {};
                if (pageUriParams) {
                    serviceUriParams = {
                        'source_lang_code': pageUriParams.source_lang_code,
                        'target_lang_code': pageUriParams.target_lang_code
                    }
                };
                return evt.getServiceData('RD', 'getLanguages', serviceUriParams, {}, 'message.data.languages_and_details',
                    processLanguages).then(function () {
                        func ? func(languages) : languages;
                        observable(languages);
                    });
            }
        }
    });