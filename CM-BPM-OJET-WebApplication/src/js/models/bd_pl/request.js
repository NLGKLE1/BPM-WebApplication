define([],
    function () {

        let requestList = [];

        function processRequests(resp) {
            requestList = [];
            resp.forEach(function (request) {
                requestList.push({
                    "request_id": request.request_id,
                    "sales_person_id": request.sales_person_id,
                    "requested_by_id": request.requested_by_id,
                    "description": request.description,
                    "expiry_date": request.expiry_date,
                    "currency_code": request.currency_code,
                    "amount": request.amount,
                    "sales_channel": request.sales_channel,
                    "request_type": request.request_type,
                    "request_type_id": request.request_type_id,
                    "request_status": request.request_status,
                    "request_status_id": request.request_status_code,
                    "issue_date": request.issue_date,
                    "sales_channel_code": request.sales_channel_code
                });
            });
        }

        let newRequest = {};

        function processNewRequest(resp) {
            newRequest = {
                "request_id": resp.request_id
            }
        }

        let offersList = [];

        function processOffers(resp) {
            offersList = [];
            resp.forEach(function (offer) {
                offersList.push({
                    "offer_id": offer.offer_id,
                    "offer_version": offer.offer_version,
                    "request_id": offer.request_id,
                    "offer_status_id": offer.offer_status_code,
                    "offer_status_value": offer.offer_status,
                    "expiry_date": offer.expiry_date,
                    "offer_type_id": offer.offer_type_code,
                    "offer_type": offer.offer_type,
                    "issue_date": offer.issue_date,
                    "signed_date": offer.signed_date,
                    "signed_indicator": offer.signed_indicator,
                    "signature_type_id": offer.signature_type_code,
                    "signature_type": offer.signature_type
                });
            });
        }
        let newOffer = {};

        function processNewOffer(resp) {
            newOffer = {
                "offer_id": resp.offer_id,
                "offer_version": resp.version
            }
        }

        return {
            /**
             * REQUEST
             */
            // pageURIParams: 'policy_id', 'organization_id'
            getRequests: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'entity_type': pageURIParams.entity_type,
                    'request_id': pageURIParams.request_id,
                    'party_id': pageURIParams.party_id
                };
                return evt.getServiceData(
                    'BD_PL',
                    'getRequests', serviceURIParams, {},
                    'results.requests', processRequests).then(function (resp) {
                    func ? func(requestList) : requestList;
                    observable(requestList);
                });
            },


            createRequest: function (observable, pageDataParams, func) {
                function prepareParticipants(participantSharesArray) {
                    let array = [];
                    if (participantSharesArray != null && (participantSharesArray).length > 0) {
                        (participantSharesArray).forEach(function (participantSharesArrayElem) {
                            array.push({
                                "party_id": participantSharesArrayElem.party_id,
                                "party_role": participantSharesArrayElem.party_role,
                                "share": participantSharesArrayElem.share,
                                'commission_rate' : participantSharesArrayElem.commission_rate
                            });
                        });
                    }
                    return array;
                }

                function prepareRelatedParties(relatedPartiesArray) {
                    let array = [];
                    if (relatedPartiesArray != null && (relatedPartiesArray).length > 0) {
                        (relatedPartiesArray).forEach(function (relatedPartiesArrayElement) {
                            array.push({
                                "party_id": relatedPartiesArrayElement.party_id,
                                "party_role": relatedPartiesArrayElement.party_role,
                                "commission_rate": relatedPartiesArrayElement.commission_rate
                            });
                        });
                    }
                    return array;
                }

                function prepareProductPricings(productPricingsArray) {
                    let array = [];
                    if ((productPricingsArray).length > 0) {
                        (productPricingsArray).forEach(function (productPricingsArrayElement) {
                            array.push({
                                "product_id": productPricingsArrayElement.product_id,
                                "product_version": productPricingsArrayElement.product_version,
                                "applied_annual_minimum_premium": productPricingsArrayElement.applied_annual_minimum_premium,
                                "applied_lifetime_minimum_premium": productPricingsArrayElement.applied_lifetime_minimum_premium,
                                "applied_annual_premium_rate": productPricingsArrayElement.applied_annual_premium_rate,
                                "calculated_annual_minimum_premium": productPricingsArrayElement.calculated_annual_minimum_premium,
                                "calculated_annual_premium_rate": productPricingsArrayElement.calculated_annual_premium_rate,
                                "calculated_lifetime_minimum_premium": productPricingsArrayElement.calculated_lifetime_minimum_premium,
                                "currency_code": productPricingsArrayElement.currency_code,
                                "modification_rate": productPricingsArrayElement.modification_rate,
                                "tax_applicable_rate": productPricingsArrayElement.tax_applicable_rate
                            });
                        });
                    }
                    return array;
                }

                function prepareSubPolicies() {
                    let array = [];
                    if ((pageDataParams.sub_policies).length > 0) {
                        (pageDataParams.sub_policies).forEach(function (subPoliciesElem) {
                            array.push({
                                "subpolicy_type_id": subPoliciesElem.subpolicy_type_id,
                                "subpolicy_status_id": subPoliciesElem.subpolicy_status_id,
                                "issue_date": subPoliciesElem.issue_date,
                                "expiry_date": subPoliciesElem.expiry_date,
                                "effective_date": subPoliciesElem.effective_date,
                                "renewal_date": subPoliciesElem.renewal_date,
                                "automatic_renewal_indicator": subPoliciesElem.automatic_renewal_indicator,
                                "notice_period": subPoliciesElem.notice_period,
                                "name": subPoliciesElem.name,
                                "participant_share": prepareParticipants(subPoliciesElem.participant_share),
                                "related_parties": prepareRelatedParties(subPoliciesElem.related_parties),
                                "product_pricings": prepareProductPricings(subPoliciesElem.product_pricings)
                            });
                        });
                    }
                    return array;
                }

                function prepareBonds() {
                    let array = [];
                    if ((pageDataParams.bonds).length > 0) {
                        (pageDataParams.bonds).forEach(function (bondsElem) {
                            array.push({
                                "description": bondsElem.description,
                                "effective_date": bondsElem.effective_date,
                                "currency_code": bondsElem.currency_code,
                                "amount": bondsElem.amount,
                                "underlying_obligation_id": bondsElem.underlying_obligation_id,
                                "bond_annual_premium_rate": bondsElem.bond_annual_premium_rate,
                                "bond_annual_minimum_premium": bondsElem.bond_annual_minimum_premium,
                                "bond_modification_rate": bondsElem.bond_modification_rate,
                                "bond_tax_applicable_rate": bondsElem.bond_tax_applicable_rate,
                                "bond_premium_charging_rate": bondsElem.bond_premium_charging_rate,
                                "local_product_id": bondsElem.local_product_id,
                                "local_product_version": bondsElem.local_product_version,
                                "sub_policy_id": bondsElem.sub_policy_id,
                                "sub_policy_version": bondsElem.sub_policy_version,
                                "delivery_method": bondsElem.delivery_method,
                                "digital_bond": bondsElem.digital_bond,
                                "notary_attestation": bondsElem.notary_attestation,
                                "bond_type": bondsElem.bond_type,
                                "participant_shares": prepareParticipants(bondsElem.participant_share),
                                "related_parties": prepareRelatedParties(bondsElem.related_parties)
                            });
                        });
                    }
                    return array;
                }
                let serviceDataParams = {
                    "organization_id": pageDataParams.organization_id,
                    "sales_person_id": pageDataParams.sales_person_id,
                    "requested_by_id": pageDataParams.requested_by_id,
                    "description": pageDataParams.description,
                    "issue_date": pageDataParams.issue_date ? pageDataParams.issue_date : new Date().toISOString(),
                    "expiry_date": pageDataParams.expiry_date,
                    "currency_code": pageDataParams.currency_code,
                    "amount": pageDataParams.amount,
                    "bonds": prepareBonds(),
                    "sales_channel": "AGE",
                    "request_type": pageDataParams.request_type
                    /* 
                    
                     "sub_policies": prepareSubPolicies(),
                    "bonds": prepareBonds() */
                };
                ojet.removeObjectFields(serviceDataParams);
                return evt.getServiceData(
                    'BD_PL',
                    'createRequest', serviceDataParams, {},
                    'results', processNewRequest).then(function () {
                    func ? func(newRequest) : newRequest;
                    observable(newRequest);
                });
            },
            // pageURIParams: 'policy_id', 'organization_id'
            takeActionOverRequest: function (pageURIParams, pageDataParams, authResponse) {
                let serviceURIParams = {
                    'entity_type': pageURIParams.entity_type,
                    'request_id': pageURIParams.request_id,
                    'task_id': pageURIParams.task_id
                };
                let serviceDataParams = {
                    'action': pageDataParams.action,
                    'taskContext': {
                        'workflowContext': {
                            'token': authResponse.token,
                            'locale': authResponse.locale
                        }
                    }
                }
                return evt.getServiceData(
                    'BD_PL', 'takeActionOverRequest', serviceURIParams, serviceDataParams,
                    undefined, true);
            },
            /**
             * OFFERS
             */
            getOffers: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'request_id': pageURIParams.request_id,
                    'offer_id': pageURIParams.offer_id,
                    'entity_type': pageURIParams.entity_type
                };
                return evt.getServiceData(
                    'BD_PL', 'getOffers', serviceURIParams, {},
                    'results.offers', processOffers).then(function () {
                    func ? func(offersList) : offersList;
                    observable(offersList);
                });
            },
            createOffer: function (observable, pageURIParams, pageDataParams, func) {
                let serviceURIParams = {
                    'entity_type': pageURIParams.entity_type,
                    'request_id': pageURIParams.request_id
                };
                let serviceDataParams = {
                    "expiry_date": pageDataParams.expiry_date,
                    "offer_type": pageDataParams.offer_type,
                    "issue_date": pageDataParams.issue_date,
                    "signed_date": pageDataParams.signed_date,
                    "signed_indicator": pageDataParams.signed_indicator,
                    "signature_type": pageDataParams.signature_type
                }
                return evt.getServiceData(
                    'BD_PL', 'createOffer', serviceURIParams, serviceDataParams,
                    'results', processNewOffer).then(function () {
                    func ? func(newOffer) : newOffer;
                    observable(newOffer);
                });

            },
            takeActionOverOffer: function (pageURIParams, pageDataParams, authResponse) {
                let serviceURIParams = {
                    'entity_type': pageURIParams.entity_type,
                    'request_id': pageURIParams.request_id,
                    'task_id': pageURIParams.task_id,
                    'offer_id': pageURIParams.offer_id
                };
                let serviceDataParams = {
                    'action': pageDataParams.action,
                    "taskContext": {
                        "workflowContext": {
                            "token": authResponse.token,
                            "locale": authResponse.locale
                        }
                    }
                }
                return evt.getServiceData(
                    'BD_PL', 'takeActionOverOffer', serviceURIParams, serviceDataParams,
                    undefined, true);
            }
        }
    }
);