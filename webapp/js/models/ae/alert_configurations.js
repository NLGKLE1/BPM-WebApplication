define([],
    function () {

        let alertConfigList = [];
        function processAlertConfig(resp) {
            alertConfigList = [];
            resp.forEach(function (alertConfig) {
                alertConfigList.push({
                    'alert_configuration_id': alertConfig.id,
                    'event_notification_description_id': alertConfig.event_notif_desc_id,
                    'event_notification_description': alertConfig.event_notification_description,
                    'event_notification_configuration_version': alertConfig.event_notif_config_version,
                    'origin_id': alertConfig.origin_id,
                    'origin': alertConfig.origin,
                    'recipient_type_id': alertConfig.recipient_type_id,
                    'recipient_type': alertConfig.recipient_type,
                    'channel_id': alertConfig.channel_id,
                    'channel': alertConfig.channel,
                    'category_id': alertConfig.category_id,
                    'category': alertConfig.category,
                    'subject_id': alertConfig.subject_id,
                    'subject': alertConfig.subject,
                    'alert_link_id': alertConfig.alert_link_id,
                    'alert_link': alertConfig.alert_link,
                    'mandatory': alertConfig.mandatory,
                    'translations': alertConfig.translations,
                    'valid_date': alertConfig.valid_date,
                    'valid_date_format': alertConfig.valid_date ? ojet.createInput(ojet.formatDate(alertConfig.valid_date)) : ojet.createInput(null),
                    'valid_date_format_str': alertConfig.valid_date ? ojet.formatDate(alertConfig.valid_date) : null,
                    'text_title': alertConfig.title,
                    'text_body': alertConfig.body,
                    'status_name': alertConfig.valid_date ? ojet.createInput('Inactive') : ojet.createInput('Active'),
                    'status_name_str': alertConfig.valid_date ? 'Inactive' : 'Active'
                });
            });
        }

        let newAlertConfig = {};
        function processNewAlertConfig(resp) {
            newAlertConfig = {
                'alert_configuration_id': resp.alert_configuration_id
            }
        }
        return {
            // pageURIParams: 'alert_configuration_id', 'event_notification_description_id', 'event_notification_configuration_version', 
            // 'origin', 'recipient_type', 'channel', 'category', 'subject', 'mandatory', 'active'
            getAlertConfig: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'alert_configuration_id': pageURIParams.alert_configuration_id,
                    'event_notif_desc_id': pageURIParams.event_notification_description_id,
                    'event_notif_config_version': pageURIParams.event_notification_configuration_version,
                    'origin': pageURIParams.origin,
                    'recipient_type': pageURIParams.recipient_type,
                    'channel': pageURIParams.channel,
                    'category': pageURIParams.category,
                    'subject': pageURIParams.subject,
                    'mandatory': pageURIParams.mandatory,
                    'active': pageURIParams.active
                };
                return evt.getServiceData(
                    'AE',
                    'getAlertConfig', serviceURIParams, {},
                    'results.alert_configurations', processAlertConfig).then(function () {
                        func ? func(alertConfigList) : alertConfigList;
                        observable(alertConfigList);
                    });
            },
            getAlertConfigFilters: function (observable, pageURIParams, comboName, alternatePair) {
                // pageURIParams: 'origin', 'recipient_type', 'channel', 'category', 'title', 'body'
                let serviceURIParams = {
                    'origin': pageURIParams.origin,
                    'recipient_type': pageURIParams.recipient_type,
                    'channel': pageURIParams.channel,
                    'category': pageURIParams.category,
                    'title': pageURIParams.title,
                    'body_text': pageURIParams.body_text,
                    'description_id': pageURIParams.description_id,
                    'description_version': pageURIParams.description_version
                };
                const servicePair = alternatePair ? alternatePair : {value: 'id', label: 'value'};                
                return ojCombo.loadCombo(
                    'AE',
                    'getAlertConfigFilters', servicePair, serviceURIParams, {},
                    'results.configuration_filters', comboName, observable, [], undefined, undefined);
            },
            getEventNotificationConfigVersions: function (observable, pageURIParams) {
                // pageURIParams: 'origin', 'recipient_type', 'channel', 'category', 'title', 'body'
                let serviceURIParams = {
                    'event_not_description_id': pageURIParams.event_not_description_id
                };
                return ojCombo.loadCombo(
                    'AE',
                    'getEventNotificationConfigVersions', {
                        value: 'event_not_version',
                        label: 'event_not_version'
                    }, serviceURIParams, {},
                    'results.event_config_notifications', 'eventNotConfigVersions', observable, [], undefined, undefined);
            },
            getReferenceData: function (observable, key, comboName, comboPair) {
                // pageURIParams: 'origin', 'recipient_type', 'channel', 'category', 'title', 'body'
                let serviceURIParams = {
                    'refdata_list_id': key,
                    'show_non_active': 'Y'
                };
                return ojCombo.loadCombo(
                    'RD',
                    'getReferenceData', comboPair ? comboPair : {
                        value: 'id',
                        label: 'ref_data_value'
                    }, serviceURIParams, {},
                    'message.data.listreferencedata', comboName, observable, [], undefined, undefined);
            },
            createAlertConfig: function (observable, payload, func) {
                let serviceDataParams = {
                    'event_notification_description_id': payload.event_notification_description_id,
                    'event_notification_version_id': payload.event_notification_version_id,
                    'origin': payload.origin,
                    'recipient_type': payload.recipient_type,
                    'channel': payload.channel,
                    'category': payload.category,
                    'subject': payload.subject,
                    'alert_link': payload.alert_link,
                    'mandatory': payload.mandatory,
                    'title': payload.title,
                    'body_text': payload.body_text,
                    'duplicate_id': payload.duplicate_id
                }
                ojet.removeObjectFields(serviceDataParams);
                return evt.getServiceData(
                    'AE',
                    'createAlertConfig', {}, serviceDataParams,
                    'results', processNewAlertConfig).then(function () {
                        func ? func(newAlertConfig) : newAlertConfig;
                        observable(newAlertConfig);
                    });
            },
            takeActionAlertConfig: function (pageURIParams) {
                let serviceURIParams = {
                    'alert_configuration_id': pageURIParams.alert_configuration_id,
                    'status': pageURIParams.status
                }
                return evt.getServiceData(
                    'AE',
                    'takeActionAlertConfig', serviceURIParams, {},
                    '', true);
            },
            updateAlertConfig: function (pageURIParams, pageDataParams) {
                let serviceURIParams = {
                    'alert_configuration_id': pageURIParams.alert_configuration_id
                }
                let serviceDataParams = {
                    'event_notification_description_id': pageDataParams.event_notification_description_id,
                    'event_notification_version_id': pageDataParams.event_notification_version_id,
                    'origin': pageDataParams.origin,
                    'recipient_type': pageDataParams.recipient_type,
                    'channel': pageDataParams.channel,
                    'category': pageDataParams.category,
                    'subject': pageDataParams.subject,
                    'alert_link': pageDataParams.alert_link,
                    'mandatory': pageDataParams.mandatory,
                    'title': pageDataParams.title,
                    'body_text': pageDataParams.body_text,
                    'valid_date': pageDataParams.valid_date
                }
                ojet.removeObjectFields(serviceDataParams);
                return evt.getServiceData(
                    'AE',
                    'updateAlertConfig', serviceURIParams, serviceDataParams,
                    '', true);
            },
        }
    }
);
