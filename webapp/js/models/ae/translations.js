define([],
    function () {

        let translationList = [];
        function processTranslationsList(resp) {
            translationList = [];
            resp.forEach(function (translation) {
                let langArray = [];
                let langList = {};
                translation.languages_list.forEach(function (languages) {
                    langArray.push({
                        'alert_config_translation_id': languages.alert_config_translation_id,
                        'language_code': languages.language_code
                    });
                    langList[languages.language_code] = true;
                });
                translationList.push({
                    "alert_configuration_id": translation.alert_configuration_id,
                    "text_title": translation.title,
                    "text_body": translation.text,
                    "languages_array": langArray,
                    "languages_list": langList
                });
            });
        }

        let alertTranslation = {};
        function processAlertTranslation(resp) {
            alertTranslation = {
                'en_translation_title': '',
                'en_translation_body': '',
                'en_translation_code': 'EN',
                'event_notification_description': resp.event_notification_description,
                'event_notification_version_id': resp.event_notification_version_id,
                'recipient_type_id': resp.recipient_type_id,
                'recipient_type': resp.recipient_type,
                'channel_id': resp.channel_id,
                'channel': resp.channel,
                'translations': []
            }
            resp.translations.forEach(function (translationElem) {
                const nextTranslation = {
                    'language_code': translationElem.language_code,
                    'translation_title': translationElem.title,
                    'translation_body': translationElem.body_text,
                    'alert_config_translation_id': translationElem.alert_config_translation_id
                }
                alertTranslation.translations.push(nextTranslation);
                if (nextTranslation.language_code === 'EN') {
                    alertTranslation.en_translation_title = nextTranslation.translation_title;
                    alertTranslation.en_translation_body = nextTranslation.translation_body;
                }
            });

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
                    'results.translation[0]', processAlertTranslation).then(function () {
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
                        'body_text': translation.translation_body,
                        'alert_config_translation_id': translation.alert_config_translation_id
                    });
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
