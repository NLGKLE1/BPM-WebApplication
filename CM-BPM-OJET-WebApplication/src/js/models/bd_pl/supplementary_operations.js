define([],
    function () {

        let participantSharesList = [];
        function processParticipantShares(resp) {
            participantSharesList = [];
            resp.forEach(function (partnShare) {
                participantSharesList.push({
                    "bond_participant_id": partnShare.bond_participant_id,
                    'party_id':partnShare.party_id,
                    'party_role':partnShare.party_role,
                    "share": partnShare.share
                });
            });
        }

        let relatedPartiesList = [];
        function processRelatedParties(resp) {
            relatedPartiesList = [];
            resp.forEach(function (party) {
                relatedPartiesList.push({
                    'party_role_id': party.party_role_id,
                    'party_role': party.party_role,
                    'party_id':party.party_id,
                    'commission_rate': party.comission_rate
                });
            });
        }

        let prodPricingList = [];
        function processProductPricing(resp) {
            prodPricingList = [];
            resp.forEach(function (prodPrice) {
                prodPricingList.push({
                    "subpolicy_id":prodPrice.subpolicy_id,
                    "subpolicy_version":prodPrice.subpolicy_version,
                    "product_id": prodPrice.product_id,
                    "product_version": prodPrice.product_version,
                    "applied_annual_minimum_premium": prodPrice.app_annual_min_prem,
                    "applied_lifetime_minimum_premium": prodPrice.app_lifetime_min_prem,
                    "applied_annual_premium_rate": prodPrice.app_annual_prem_rate,
                    "calculated_annual_minimum_premium": prodPrice.calc_annual_min_prem,
                    "calculated_annual_premium_rate": prodPrice.calc_annual_prem_rate,
                    "calculated_lifetime_minimum_premium": prodPrice.calc_lifetime_min_prem,
                    "currency_code": prodPrice.currency_code,
                    "sub_limit_currency": prodPrice.sub_limit_currency,
                    "sub_limit_request_amount": prodPrice.sub_limit_request_amount,
                    "tax_applicable_rate": prodPrice.tax_applicable_rate,
                    "modification_rate": prodPrice.modification_rate
                });
            });
        }

        return {
            /**
             * REQUEST
             */
            // pageURIParams: 'policy_id', 'organization_id'
            getParticipantShares: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'id': pageURIParams.id,
                    'version': pageURIParams.version,
                    'entity_type': pageURIParams.entity_type,
                    'party_id':pageURIParams.party_id,
                    'party_role':pageURIParams.party_role
                };
                return evt.getServiceData(
                    'BD_PL',
                    'getParticipantShares', serviceURIParams, {},
                    'results.participant_shares', processParticipantShares).then(function () {
                        func ? func(participantSharesList) : participantSharesList;
                        observable(participantSharesList);
                    });
            },
            getRelatedParties: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'id': pageURIParams.id,
                    'entity_type': pageURIParams.entity_type,
                    'version': pageURIParams.version
                };
                return evt.getServiceData(
                    'BD_PL',
                    'getRelatedParties', serviceURIParams, {},
                    'results.related_parties', processRelatedParties).then(function (data) {
                        func ? func(relatedPartiesList) : relatedPartiesList;
                        if(observable) observable(relatedPartiesList);
                        return data;
                    });
            },
            getProductPricings: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'id': pageURIParams.id,
                    'version': pageURIParams.version
                };
                return evt.getServiceData(
                    'BD_PL',
                    'getProductPricings', serviceURIParams, {},
                    'results.product_pricings', processProductPricing).then(function () {
                        func ? func(prodPricingList) : prodPricingList;
                        observable(prodPricingList);
                    });
            }
        }
    }
);
