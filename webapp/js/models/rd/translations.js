define([],
    function () {
        let translations = [];

        function processRefdataTranslations(list) {
            translations = [];
            list.forEach(function (elem) {
                translations.push({
                    'translation_id': elem.id,
                    'translation_desc': elem.description,
                    'language_code': elem.language_code
                });
            });
        };
        return {
            getRefdataTranslations: function (observable, pageUriParams, func) {
                let serviceUriParams = {
                    'refdata_id': pageUriParams.refdata_id,
                    'language_code': pageUriParams.language_code,
                    'start_date': pageUriParams.start_date,
                    'end_date': pageUriParams.end_date
                };
                return evt.getServiceData('RD', 'getReferenceDataTranslations', serviceUriParams, {}, 'message.data.translations',
                    processRefdataTranslations).then(function () {
                        func ? func(translations) : translations;
                        observable(translations);
                    });
            }
        }
    });