define(['jquery'],
    function ($) {

        let bondList = [];
        function processBonds(resp) {
            bondList = [];
            resp.forEach(function (bond) {
                bondList.push({
                    "bond_id": bond.bond_id,
                    "bond_version": bond.version,
                    "polizza_offer_id": bond.polizza_offer_id,
                    "polizza_offer_version": bond.polizza_offer_version,
                    "bond_request_id": bond.bond_request_id,
                    "sub_policy_id": bond.sub_policy_id,
                    "sub_policy_version": bond.sub_policy_version,
                    "local_product_id": bond.local_product_id,
                    "local_product_version": bond.local_product_version,
                    "bond_description": bond.bond_description,
                    "bond_status_id": bond.bond_status_id,
                    "bond_status": bond.bond_status,
                    "bond_status_code": bond.bond_status_code,
                    "issue_date": bond.issue_date,
                    "effective_date": bond.effective_date,
                    "expiry_date": bond.expiry_date,
                    "closure_date": bond.closure_date,
                    "currency_code": bond.currency_code,
                    "amount": bond.amount,
                    "underlying_obligation_id": bond.underlying_obligation_id,
                    "run_off_period": bond.run_off_period,
                    "renewal_date": bond.renewal_date,
                    "legacy_code": bond.legacy_code,
                    "bond_annual_premium_rate": bond.bond_annual_premium_rate,
                    "bond_annual_minimum_premium": bond.bond_annual_minimum_premium,
                    "bond_lifetime_minimum_premium": bond.bond_lifetime_minimum_premium,
                    "bond_modification_rate": bond.bond_modification_rate,
                    "bond_tax_applicable_rate": bond.bond_tax_applicable_rate,
                    "bond_premium_charging_rate": bond.bond_premium_charging_rate,
                    "delivery_method": bond.delivery_method,
                    "digital_bond_id": bond.digital_bond_id,
                    "notary_attestation_id": bond.notary_attestation_id
                });
            });
        }
        return {
            // pageURIParams: 'policy_id', 'organization_id'
            getBonds: function (observable, pageURIParams, func) {
                let serviceURIParamsV2 = {
                    bond_id: pageURIParams.bondID,
                    party_id: pageURIParams.partyID,
                    request_id: pageURIParams.requestID
                };
                return evt.getServiceData(
                    'BD_PL',
                    'getBonds', serviceURIParamsV2, {},
                    'results.bonds', processBonds).then(function () {
                    func ? func(bondList) : bondList;
                    observable(bondList);
                });
            },
            updateBonds: function (observable, pageDataParams, pageURIParams) {
                // path must be "participantsShare.add", "participantsShare.update" or "participantsShare.delete"
                function prepareParticipants(path) {
                    let array = [];
                    if ((ojet.getProperty(path, pageDataParams)).length > 0) {
                        if (path !== 'participants_share.delete') {
                            (ojet.getProperty(path, pageDataParams)).forEach(function (elem) {
                                array.push({
                                    "participant_id": elem.participant_id,
                                    "amount": elem.amount,
                                    "exposure": elem.exposure,
                                    "share": elem.share
                                });
                            });
                        } else {
                            (ojet.getProperty(path, pageDataParams)).forEach(function (elem) {
                                array.push({
                                    "participant_id": elem.participant_id
                                });
                            });
                        }
                    }
                    return array;
                }
                // path must be "relatedParties.add", "relatedParties.update" or "relatedParties.delete"
                function prepareRelatedParties(path) {
                    let array = [];
                    if ((ojet.getProperty(path, pageDataParams)).length > 0) {
                        if (path === 'related_parties.add') {
                            (ojet.getProperty(path, pageDataParams)).forEach(function (elem) {
                                if (elem.commission_rate) {
                                    array.push({
                                        "party_id": String(elem.party_id),
                                        "party_role": elem.party_role,
                                        "commission_rate": elem.commission_rate
                                    });
                                } else {
                                    array.push({
                                        "party_id": String(elem.party_id),
                                        "party_role": elem.party_role
                                    });
                                }
                            });
                        } else if(path === 'related_parties.update') {
                            (ojet.getProperty(path, pageDataParams)).forEach(function (elem) {
                                if (elem.commission_rate) {
                                    array.push({
                                        "party_role_id": elem.party_role_id,
                                        "party_id": String(elem.party_id),
                                        "party_role": elem.party_role,
                                        "commission_rate": elem.commission_rate
                                    });
                                } else {
                                    array.push({
                                        "party_role_id": elem.party_role_id,
                                        "party_id": String(elem.party_id),
                                        "party_role": elem.party_role
                                    });
                                }
                            });
                        } else {
                            (ojet.getProperty(path, pageDataParams)).forEach(function (elem) {
                                array.push(elem.party_role_id);
                            });
                        }
                    }
                    return array;
                }

                function prepareProductPricings(path) {
                    let array = [];
                    if ((ojet.getProperty(path, pageDataParams)).length > 0) {
                        if (path === 'product_pricings.add') {
                            (ojet.getProperty(path, pageDataParams)).forEach(function (elem) {
                                array.push({
                                    "product_id": elem.product_id,
                                    "product_version": elem.product_version,
                                    "applied_annual_min_premium": elem.app_annual_min_prem,
                                    "applied_lifetime_min_premium": elem.app_lifetime_min_prem,
                                    "applied_annual_premium_rate": elem.app_annual_prem_rate,
                                    "calculated_annual_min_premium": elem.calc_annual_min_prem,
                                    "calculated_annual_premium_rate": elem.calc_annual_prem_rate,
                                    "calculated_lifetime_min_premium": elem.calc_lifetime_min_prem,
                                    "currency_code": elem.currency_code,
                                    "modification_rate": elem.modification_rate,
                                    "tax_applicable_rate": elem.tax_applicable_rate
                                });
                            });
                        } else if (path === 'product_pricings.update') {
                            (ojet.getProperty(path, pageDataParams)).forEach(function (elem) {
                                array.push({
                                    "subpolicy_id": elem.subpolicy_id,
                                    "subpolicy_version": elem.subpolicy_version,
                                    "product_id": elem.product_id,
                                    "product_version": elem.product_version,
                                    "app_annual_min_prem": elem.app_annual_min_prem,
                                    "app_lifetime_min_prem": elem.app_lifetime_min_prem,
                                    "app_annual_prem_rate": elem.app_annual_prem_rate,
                                    "calc_annual_min_prem": elem.calc_annual_min_prem,
                                    "calc_annual_prem_rate": elem.calc_annual_prem_rate,
                                    "calc_lifetime_min_prem": elem.calc_lifetime_min_prem,
                                    "currency_code": elem.currency_code,
                                    "modification_rate": elem.modification_rate,
                                    "tax_applicable_rate": elem.tax_applicable_rate
                                });
                            });
                        } else {
                            (ojet.getProperty(path, pageDataParams)).forEach(function (elem) {
                                // TBD
                                array.push({
                                    "related_party_id": elem.participant_id,
                                    "party_id": elem.party_id
                                });
                            });
                        }
                    }
                    return array;
                }

                let serviceDataParams = {
                    "subpolicy_id": pageDataParams.subpolicy_id,
                    "subpolicy_version": pageDataParams.subpolicy_version,
                    "local_product_id": pageDataParams.local_product_id,
                    "local_product_version": pageDataParams.local_product_version,
                    "bond_description": pageDataParams.bond_description,
                    "effective_date": pageDataParams.effective_date,
                    "expiry_date": pageDataParams.expiry_date,
                    "closure_date": pageDataParams.closure_date,
                    "currency_code": pageDataParams.currency_code,
                    "amount": pageDataParams.amount,
                    "underlying_obligation_id": pageDataParams.underlying_obligation_id,
                    "runoff_period": pageDataParams.runoff_period,
                    "renewal_date": pageDataParams.renewal_date,
                    "legacy_code": pageDataParams.legacy_code,
                    "bond_annual_premium_rate": pageDataParams.bond_annual_premium_rate,
                    "bond_annual_minimum_premium": pageDataParams.bond_annual_minimum_premium,
                    "bond_lifetime_minimum_premium": pageDataParams.bond_lifetime_minimum_premium,
                    "bond_modification_rate": pageDataParams.bond_modification_rate,
                    "bond_tax_applicable_rate": pageDataParams.bond_tax_applicable_rate,
                    "bond_premium_charging_rate": pageDataParams.bond_premium_charging_rate,
                    "delivery_method": pageDataParams.delivery_method,
                    "digital_bond_id": pageDataParams.digital_bond_id,
                    "notary_attestation_id": pageDataParams.notary_attestation_id,
                    "participants_share": {},
                    "related_parties": {},
                    "product_pricings": {}
                };

                let typesArray = ['participants_share', 'related_parties', 'product_pricings'];
                let opsArray = ['add', 'update', 'delete'];

                typesArray.forEach(function (type) {
                    opsArray.forEach(function (op) {
                        let currArr;
                        switch(type) {
                            case 'participants_share':
                                currArr = prepareParticipants(type + '.' + op);
                                break;
                            case 'related_parties':
                                currArr = prepareRelatedParties(type + '.' + op);
                                break;
                            case 'product_pricings':
                                currArr = prepareProductPricings(type + '.' + op);
                                break;
                            default:
                        }
                        if (!$.isEmptyObject(currArr))
                            serviceDataParams[type][op] = currArr;
                    });
                    if ($.isEmptyObject(serviceDataParams[type]))
                        delete serviceDataParams[type];
                });

                return evt.getServiceData(
                    'BD_PL',
                    'updateBond', serviceDataParams, {
                        bond_id: pageURIParams.bond_id,
                        version: pageURIParams.version
                    },
                    'message', true);
            }
        }
    }
);
