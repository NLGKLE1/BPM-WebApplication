define([],
    function () {

        let negativeEventDetails = [];
        function processNegativeEventDetails(negativeEventDetailsResp) {
            negativeEventDetails = [];
            let commonJson = {
                'negative_event_identifier': negativeEventDetailsResp[0].negative_event_identifier,
                'receive_date': negativeEventDetailsResp[0].receive_date,
                'review_date': negativeEventDetailsResp[0].review_date,
                'notes': negativeEventDetailsResp[0].notes,
                'event_type': negativeEventDetailsResp[0].event_type,
                'status': negativeEventDetailsResp[0].status,
                'status_code': negativeEventDetailsResp[0].status_code,
                'customer_case_id': negativeEventDetailsResp[0].customer_case_id,
                'organization_id': negativeEventDetailsResp[0].organization_id
            };
            let negativeEventJson = {};
            switch (negativeEventDetailsResp[0].event_type) {
                case 'AdverseNotice':
                    negativeEventJson = {
                        'priority_code': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].priority_code,
                        'priority': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].priority,
                        'content_code': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].content_code,
                        'content': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].content,
                        'source_code': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].source_code,
                        'source': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].source,
                        'source_detail': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].source_detail,
                        'third_parties_involved': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].third_parties_involved,
                        'occurrence_date': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].occurrence_date,
                        'publication_date': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].publication_date,
                        'judgement_date': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].judgement_date,
                        'end_of_payment_date': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].end_of_payment_date,
                        'type_of_legal_announcement': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].type_of_legal_announcement,
                        'fuw_alert_flag': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].fuw_alert_flag,
                        'pad_alert_flag': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].pad_alert_flag,
                        'tuw_alert_flag': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].tuw_alert_flag,
                        'recovery_team_alert_flag': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].recovery_team_alert_flag,
                        'service_fee_alert_flag': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].service_fee_alert_flag,
                        'review_limit_block_alert_flag': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].review_limit_block_alert_flag,
                        'new_sub_policy_block_flag': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].new_bond_policy_flag,
                        'new_bond_policy_flag': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].new_bond_policy_flag,
                        'bond_release_block_flag': negativeEventDetailsResp[0].negative_event[0].adverse_notice[0].bond_release_block_flag
                    };
                    break;
                case 'Notification':
                    negativeEventJson = {
                        'occurrence_date': negativeEventDetailsResp[0].negativeevents[0].notification[0].occurrence_date,
                        'notification_date': negativeEventDetailsResp[0].negativeevents[0].notification[0].notification_date,
                        'source_code': negativeEventDetailsResp[0].negativeevents[0].notification[0].source_code,
                        'source_detail': negativeEventDetailsResp[0].negativeevents[0].notification[0].source_detail,
                        'source': negativeEventDetailsResp[0].negativeevents[0].notification[0].source,
                        'int_notification_protocol_letter': negativeEventDetailsResp[0].negativeevents[0].notification[0].int_not_prot_letter,
                        'ext_notification_protocol_letter': negativeEventDetailsResp[0].negativeevents[0].notification[0].ext_not_prot_letter,
                        'currency_code': negativeEventDetailsResp[0].negativeevents[0].notification[0].currency_code,
                        'notification_amount': negativeEventDetailsResp[0].negativeevents[0].notification[0].notification_amount,
                        'notification_type': negativeEventDetailsResp[0].negativeevents[0].notification[0].notification_type,
                        'maximum_rejection_date': negativeEventDetailsResp[0].negativeevents[0].notification[0].maximum_rejection_date,
                        'beneficiary': negativeEventDetailsResp[0].negativeevents[0].notification[0].beneficiary,
                        'linkedBonds': negativeEventDetailsResp[0].negativeevents[0].notification[0].linkedbonds
                    };
                    break;
                case 'CallInPayment':
                    negativeEventJson = {
                        'occurrence_date': negativeEventDetailsResp.negative_event.call_in_payment.occurrence_date,
                        'call_in_payment_date': negativeEventDetailsResp.negative_event.call_in_payment.call_in_payment_date,
                        'call_in_payment_protocol_letter': negativeEventDetailsResp.negative_event.call_in_payment.call_in_payment_protocol_letter,
                        'source_code': negativeEventDetailsResp.negative_event.call_in_payment.source_code,
                        'source': negativeEventDetailsResp.negative_event.call_in_payment.source,
                        'currency_code': negativeEventDetailsResp.negative_event.call_in_payment.currency_code,
                        'call_in_payment_amount': negativeEventDetailsResp.negative_event.call_in_payment.call_in_payment_amount,
                        'call_in_payment_type': negativeEventDetailsResp.negative_event.call_in_payment.call_in_payment_type,
                        'maximum_payment_date': negativeEventDetailsResp.negative_event.call_in_payment.maximum_payment_date,
                        'beneficiary': negativeEventDetailsResp.negative_event.call_in_payment.beneficiary,
                        'linkedBonds': negativeEventDetailsResp.negative_event.call_in_payment.linkedBonds
                    };
                    break;
                default:
                    break;
            };
            let getResult = $.extend(commonJson, negativeEventJson);
            negativeEventDetails.push(getResult);
        };

        let allNegativeEvents = [];
        function processAllNegativeEvents(allNegativeEventsResp) {
            allNegativeEvents = [];
            let commonJson = {};
            let negativeEventJson = {};
            let getResult = {};
            if (allNegativeEventsResp.adverse_notice) {
                allNegativeEventsResp.adverse_notice.forEach(function (adverseNotice) {
                    commonJson = {};
                    commonJson = {
                        'negative_event_identifier': adverseNotice.negative_event_identifier,
                        'receive_date': adverseNotice.receive_date,
                        'review_date': adverseNotice.review_date,
                        'notes': adverseNotice.notes,
                        'event_type': adverseNotice.event_type,
                        'status': adverseNotice.status,
                        'status_code': adverseNotice.status_code,
                        'customer_case_id': adverseNotice.customer_case_id,
                        'organization_id': adverseNotice.organization_id
                    };
                    negativeEventJson = {};
                    negativeEventJson = {
                        'priority_code': adverseNotice.negative_event[0].adverse_notice[0].priority_code,
                        'priority': adverseNotice.negative_event[0].adverse_notice[0].priority,
                        'content_code': adverseNotice.negative_event[0].adverse_notice[0].content_code,
                        'content': adverseNotice.negative_event[0].adverse_notice[0].content,
                        'source_code': adverseNotice.negative_event[0].adverse_notice[0].source_code,
                        'source': adverseNotice.negative_event[0].adverse_notice[0].source,
                        'source_detail': adverseNotice.negative_event[0].adverse_notice[0].source_detail,
                        'third_parties_involved': adverseNotice.negative_event[0].adverse_notice[0].third_parties_involved,
                        'occurrence_date': adverseNotice.negative_event[0].adverse_notice[0].occurrence_date,
                        'publication_date': adverseNotice.negative_event[0].adverse_notice[0].publication_date,
                        'judgement_date': adverseNotice.negative_event[0].adverse_notice[0].judgement_date,
                        'end_of_payment_date': adverseNotice.negative_event[0].adverse_notice[0].end_of_payment_date,
                        'type_of_legal_announcement': adverseNotice.negative_event[0].adverse_notice[0].type_of_legal_announcement,
                        'fuw_alert_flag': adverseNotice.negative_event[0].adverse_notice[0].fuw_alert_flag,
                        'pad_alert_flag': adverseNotice.negative_event[0].adverse_notice[0].pad_alert_flag,
                        'tuw_alert_flag': adverseNotice.negative_event[0].adverse_notice[0].tuw_alert_flag,
                        'recovery_team_alert_flag': adverseNotice.negative_event[0].adverse_notice[0].recovery_team_alert_flag,
                        'service_fee_alert_flag': adverseNotice.negative_event[0].adverse_notice[0].service_fee_alert_flag,
                        'review_limit_block_alert_flag': adverseNotice.negative_event[0].adverse_notice[0].review_limit_block_alert_flag,
                        'new_sub_policy_block_flag': adverseNotice.negative_event[0].adverse_notice[0].new_bond_policy_flag,
                        'new_bond_policy_flag': adverseNotice.negative_event[0].adverse_notice[0].new_bond_policy_flag,
                        'bond_release_block_flag': adverseNotice.negative_event[0].adverse_notice[0].bond_release_block_flag
                    };
                    getResult = {};
                    getResult = $.extend(commonJson, negativeEventJson);
                    allNegativeEvents.unshift(getResult);
                });
            };
            if (allNegativeEventsResp.notification) {
                allNegativeEventsResp.notification.forEach(function (notification) {
                    commonJson = {};
                    commonJson = {
                        'negative_event_identifier': notification.negative_event_identifier,
                        'receive_date': notification.receive_date,
                        'review_date': notification.review_date,
                        'notes': notification.notes,
                        'event_type': notification.event_type,
                        'status': notification.status,
                        'status_code': notification.status_code,
                        'customer_case_id': notification.customer_case_id,
                        'organization_id': notification.organization_id
                    };
                    negativeEventJson = {};
                    negativeEventJson = {
                        'occurrence_date': notification.negativeevents[0].notification[0].occurrence_date,
                        'notification_date': notification.negativeevents[0].notification[0].notification_date,
                        'source_code': notification.negativeevents[0].notification[0].source_code,
                        'source_detail': notification.negativeevents[0].notification[0].source_detail,
                        'source': notification.negativeevents[0].notification[0].source,
                        'int_notification_protocol_letter': notification.negativeevents[0].notification[0].int_not_prot_letter,
                        'ext_notification_protocol_letter': notification.negativeevents[0].notification[0].ext_not_prot_letter,
                        'currency_code': notification.negativeevents[0].notification[0].currency_code,
                        'notification_amount': notification.negativeevents[0].notification[0].notification_amount,
                        'notification_type': notification.negativeevents[0].notification[0].notification_type,
                        'maximum_rejection_date': notification.negativeevents[0].notification[0].maximum_rejection_date,
                        'beneficiary': notification.negativeevents[0].notification[0].beneficiary,
                        'linkedBonds': notification.negativeevents[0].notification[0].linkedbonds
                    };
                    getResult = {};
                    getResult = $.extend(commonJson, negativeEventJson);
                    allNegativeEvents.unshift(getResult);
                });
            };
            /* if (allNegativeEventsResp.call_in_payment) { //Commented temporarily as Call In Payment is still not implemented
                allNegativeEventsResp.call_in_payment.forEach(function (callInPayment) {
                    commonJson = {};
                    commonJson = {
                        'negative_event_identifier': callInPayment.negative_event_identifier,
                        'receive_date': callInPayment.receive_date,
                        'review_date': callInPayment.review_date,
                        'notes': callInPayment.notes,
                        'event_type': callInPayment.event_type,
                        'status': callInPayment.status,
                        'status_code': callInPayment.status_code,
                        'customer_case_id': callInPayment.customer_case_id,
                        'organization_id': callInPayment.organization_id
                    };
                    negativeEventJson = {};
                    negativeEventJson = {
                        'occurrence_date': callInPayment.negative_event.call_in_payment.occurrence_date,
                        'call_in_payment_date': callInPayment.negative_event.call_in_payment.call_in_payment_date,
                        'call_in_payment_protocol_letter': callInPayment.negative_event.call_in_payment.call_in_payment_protocol_letter,
                        'source_code': callInPayment.negative_event.call_in_payment.source_code,
                        'source': callInPayment.negative_event.call_in_payment.source,
                        'currency_code': callInPayment.negative_event.call_in_payment.currency_code,
                        'call_in_payment_amount': callInPayment.negative_event.call_in_payment.call_in_payment_amount,
                        'call_in_payment_type': callInPayment.negative_event.call_in_payment.call_in_payment_type,
                        'maximum_payment_date': callInPayment.negative_event.call_in_payment.maximum_payment_date,
                        'beneficiary': callInPayment.negative_event.call_in_payment.beneficiary,
                        'linkedBonds': callInPayment.negative_event.call_in_payment.linkedBonds
                    };
                    getResult = {};
                    getResult = $.extend(commonJson, negativeEventJson);
                    allNegativeEvents.unshift(getResult);
                });
            }; */
        };

        return {
            prepareBPMServiceURI: function (pageURIParams) {
                return {
                    'negative_event_identifier': pageURIParams.negative_event_identifier,
                    'action': pageURIParams.action,
                    'event_type': pageURIParams.event_type,
                    'task_id': pageURIParams.task_id
                };
            },
            prepareBPMJson: function (pageDataParams, authResponse) {
                let taskContextJSON = {
                    'taskContext': {
                        'workflowContext': {
                            'token': authResponse.token,
                            'locale': authResponse.locale
                        }
                    }
                };
                let payloadJSON = {};
                if (pageDataParams) {
                    payloadJSON = {
                        'receive_date': pageDataParams.receive_date,
                        'review_date': pageDataParams.review_date,
                        'organization_id': pageDataParams.organization_id,
                        'notes': pageDataParams.notes,
                        'event_type': pageDataParams.event_type,
                        'negative_event': pageDataParams.negative_event,
                        'negative_effects': pageDataParams.negative_effects
                    };
                };
                let bpmJSON = $.extend(taskContextJSON, payloadJSON);
                return bpmJSON;        
            },

            createNegativeEvent: function (pageDataParams) {
                let serviceDataParams = {
                    'receive_date': pageDataParams.receive_date,
                    'review_date': pageDataParams.review_date,
                    'notes': pageDataParams.notes,
                    'organization_id': pageDataParams.organization_id,
                    'event_type': pageDataParams.event_type,
                    'negative_event': pageDataParams.negative_event
                };
                return evt.getServiceData(
                    'CB', 'createNegativeEvent', {},
                    serviceDataParams, 'results', true
                );
            },
            // pageURIParams: 'request_identifier', 'action', 'event_type', 'task_id'
            takeActionOnNegativeEvent: function (pageURIParams, pageDataParams, authResponse) {
                return evt.getServiceData(
                    'CB', 'takeActionOnNegativeEvent',
                    this.prepareBPMServiceURI(pageURIParams),
                    this.prepareBPMJson(pageDataParams, authResponse),
                    '', true
                );
            },
            // pageURIParams: 'request_identifier', 'action', 'event_type', 'task_id'
            takeActionOnNegativeEventProcess: function (pageURIParams, pageDataParams, authResponse) {
                return evt.getServiceData(
                    'CB', 'takeActionOnNegativeEventProcess',
                    this.prepareBPMServiceURI(pageURIParams),
                    this.prepareBPMJson(pageDataParams, authResponse),
                    '', true
                );
            },
            // pageURIParams: 'organization_id', 'negative_event_id', 'event_type', 'language'
            getNegativeEventDetails: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'organization_id': pageURIParams.organization_id,
                    'negative_event_id': pageURIParams.negative_event_id,
                    'event_type': pageURIParams.event_type,
                    'language': pageURIParams.language
                };
                return evt.getServiceData(
                    'CB', 'getNegativeEventDetails',
                    serviceURIParams, {},
                    'results.negativeevents', processNegativeEventDetails).then(function () {
                        func ? func(negativeEventDetails) : negativeEventDetails;
                        observable(negativeEventDetails);
                    }
                );
            },
            // pageURIParams: 'organization_id', 'language'
            getAllNegativeEvents: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'organization_id': pageURIParams.organization_id,
                    'language': pageURIParams.language
                };
                return evt.getServiceData(
                    'CB', 'getAllNegativeEvents',
                    serviceURIParams, {},
                    'results', processAllNegativeEvents).then(function () {
                        func ? func(allNegativeEvents) : allNegativeEvents;
                        observable(allNegativeEvents);
                    }
                );
            }
        };
    }
);