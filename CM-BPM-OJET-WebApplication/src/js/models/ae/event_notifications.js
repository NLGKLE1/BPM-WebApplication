define([],
    function () {

        let translationList = [];
        function processTranslationsList(resp) {
        }

        let alertTranslation = {};
        function processAlertTranslation(resp) {
            alertTranslation = {
            }
        }
        
        return {
            // serviceURIParams: 'languages', 'title', 'text', 'operation'
            getTranslations: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'languages': pageURIParams.languages,
                    'title': pageURIParams.title,
                    'text': pageURIParams.text,
                    'operation': pageURIParams.operation
                };
                return evt.getServiceData(
                    'AE',
                    'getTranslations', serviceURIParams, {},
                    'results.translations', processTranslationsList).then(function () {
                        func ? func(translationList) : observable(translationList);
                    });
            },
            getAlertConfigTranslations: function (observable, pageURIParams, func) {
                // pageURIParams: 'alert_configuration_id', 'languages'
                let serviceURIParams = {
                    'alert_configuration_id': pageURIParams.alert_configuration_id,
                    'languages': pageURIParams.languages
                };
                return evt.getServiceData(
                    'AE',
                    'getAlertConfigTranslations', serviceURIParams, {},
                    'results', processAlertTranslation).then(function () {
                        func ? func(alertTranslation) : alertTranslation;
                        observable(alertTranslation);
                    });
            },
            updateAlertConfigTranslations: function (pageURIParams, payload) {
                let serviceURIParams = {
                    'alert_configuration_id': pageURIParams.alert_configuration_id
                }
                let payloadTranslations = [];
                payload.forEach(function (translation) {
                    payloadTranslations.push({
                        'operation': translation.operation,
                        'language_code': translation.language_code,
                        'title': translation.translation_title,
                        'body_text': translation.translation_body_
                    })
                })
                let serviceDataParams = {
                    'translations': payloadTranslations
                }
                ojet.removeObjectFields(serviceDataParams);
                return evt.getServiceData(
                    'AE',
                    'updateAlertConfigTranslations', serviceURIParams, serviceDataParams,
                    '', true);
            }
        }
    }
);
