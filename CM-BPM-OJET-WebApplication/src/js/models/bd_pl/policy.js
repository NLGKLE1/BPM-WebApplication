define(['knockout'],
    function (ko) {
        function ProductClass() {
            var self = this;
            self.name = ojet.createInput(String());
        }

        function MasterProduct() {
            var self = this;
            self.name = ojet.createInput(String());
        }

        function LocalProduct() {
            var self = this;
            self.id = ojet.createInput(Number());
            self.version = ojet.createInput(Number());
            self.name = ojet.createInput(String());
            self.masterProduct = ojet.createInput(new MasterProduct());
            self.productClass = ojet.createInput(new ProductClass());
            self.countryId = ojet.createInput(Number());
        }

        function ProductPricing() {
            var self = this;
            self.subPolicyId = ojet.createInput(Number());
            self.subPolicyVersion = ojet.createInput(Number());
            self.productId = ojet.createInput(Number());
            self.productVersion = ojet.createInput(Number());
            self.appliedAnnualMinimumPremium = ojet.createInput(Number());
            self.appliedLifetimeMinimumPremium = ojet.createInput(Number());
            self.appliedAnnualPremiumRate = ojet.createInput(Number());
            self.calculatedAnnualMinimumPremium = ojet.createInput(Number());
            self.calculatedAnnualPremiumRate = ojet.createInput(Number());
            self.calculatedLifetimeMinimumPremium = ojet.createInput(Number());
            self.currencyCode = ojet.createInput(String());
            self.modificationRate = ojet.createInput(Number());
            self.taxApplicableRate = ojet.createInput(Number());
            self.maximumIndividualBondAmount = ojet.createInput(Number());
            self.subLimitCurrency = ojet.createInput(String());
            self.subLimitAmount = ojet.createInput(Number());
            self.subLimitProposedAmount = ojet.createInput(Number());
            self.subLimitRequestAmount = ojet.createInput(Number());
            self.localProduct = ojet.createInput(new LocalProduct());
            self.isNew = ojet.createInput(true);
        }

        ProductPricing.prototype.unmap = function () { }

        function SubPolicy() {
            var self = this;

            self.subpolicyId = ojet.createInput(Number());
            self.policyId = ojet.createInput(Number());
            self.subpolicyVersion = ojet.createInput(Number());
            self.statusSubpolicy = ojet.createInput();
            self.subPolicyNameVal = ojet.createInput();
            self.noticePerNameVal = ojet.createInput();
            self.dateValueEffective = ojet.createInput();
            self.dateValueIssuance = ojet.createInput();
            self.dateValueExpiry = ojet.createInput();
            self.dateValueRenewal = ojet.createInput();
            self.subpolicyType = ojet.createInput(String());
            self.automaticRenewal = ojet.createInput(Boolean());

            self.productPricings = ojet.createInput();
            self.relatedParties = ojet.createArray();
            self.participantsShare = ojet.createInput();
            self.subBondline = ojet.createInput();
        }

        function SubBondLine() {
            var self = this;

            self.id = ojet.createInput();
            self.currency = ojet.createInput();
            self.lineAmount = ojet.createInput();
            self.proposedAmount = ojet.createInput();
            self.requestedAmount = ojet.createInput();
            self.subPolicyVersion = ojet.createInput();

            self.isDeleted = ojet.createInput(false);
            self.isNew = ojet.createInput(true);
        }

        SubBondLine.prototype.map = function (data) {
            var self = this;

            self.id(data.subbondline_id);
            self.currency(data.sub_bondline_currency);
            self.lineAmount(data.line_amount);
            self.proposedAmount(data.proposed_amount);
            self.requestedAmount(data.requested_amount);
            self.subPolicyVersion(data.subpolicy_version);
        }

        SubBondLine.prototype.unmap = function (data) {
            console.warn("Model of ", SubBondLine, " not already done");
            return {};
        }

        SubPolicy.prototype.map = function (data) {
            var self = this;

            self.subpolicyId(data.subpolicy_id);
            self.policyId(data.policy_id);
            self.subpolicyVersion(data.subpolicy_version || Number());
            self.statusSubpolicy(data.subpolicy_status);
            self.subPolicyNameVal(data.subpolicy_name);
            self.noticePerNameVal(data.notice_period);
            self.dateValueEffective(data.effective_date);
            self.dateValueIssuance(data.issue_date);
            self.dateValueExpiry(data.expiry_date);
            self.dateValueRenewal(data.renewal_date);
            self.subpolicyType(data.subpolicy_type_code || "REV");
            self.automaticRenewal(String(data.automatic_renewal) === 'Y' ? true : false);

            return this;
        }

        SubPolicy.prototype.unmap = function () {
            var self = this;
            var data = {};

            data.subpolicy_name = self.subPolicyNameVal();
            data.notice_period = Number(self.noticePerNameVal());
            data.effective_date = self.dateValueEffective();
            data.issue_date = self.dateValueIssuance();
            data.expiry_date = self.dateValueExpiry();
            data.renewal_date = self.dateValueRenewal();
            data.subpolicy_type = self.subpolicyType();
            data.automatic_renewal = self.automaticRenewal() ? "Y" : "N";

            let add = [];
            let update = [];

            self.relatedParties().forEach(function (intermediary) {
                if (intermediary.isNew()) { // add
                    add.push(intermediary.unmap());
                } else { // update
                    update.push(intermediary.unmap());
                }
            });

            let relatedParties = {};
            let hasAnyRelatedPartyAction = false;

            if (add.length > 0) {
                relatedParties.add = add;
                hasAnyRelatedPartyAction = true;
            }
            if (update.length > 0) {
                relatedParties.update = update;
                hasAnyRelatedPartyAction = true;
            }

            if (hasAnyRelatedPartyAction) {
                data.related_parties = relatedParties;
            }


            if (self.participantsShare().length > 0) {
                if (self.participantsShare().isNew()) {
                    data.participants_share = {
                        add: self.participantsShare().unmap()
                    }
                } else {
                    data.participants_share = {
                        update: self.participantsShare().unmap()
                    }
                }
            }

            if (self.subBondline()) {
                if (self.subBondline().isNew()) {
                    data.sub_bondline = {
                        add: self.subBondline().unmap()
                    }
                } else {
                    data.sub_bondline = {
                        update: self.subBondline().unmap()
                    }
                }
            }
            return data;
        }

        let policyList = [];
        function processPolicies(resp) {
            policyList = [];
            resp.forEach(function (policy) {
                policyList.push({
                    "policy_id": policy.policy_id,
                    "policy_code": policy.policy_code,
                    "organisation_id": policy.organization_id,
                    "party_role": policy.party_role,
                    "policy_status": policy.policy_status,
                    "policy_status_code": policy.policy_status_code,
                    "invoicing_method_code": policy.invoicing_method_code,
                    "invoicing_method": policy.invoicing_method,
                    "invoicing_currency_code": policy.invoicing_currency_code,
                    "invoicing_frequency_code": policy.invoicing_frequency_code,
                    "invoicing_frequency": policy.invoicing_frequency,
                    "invoicing_agg_level_code": policy.invoicing_agg_level_code,
                    "invoicing_agg_level": policy.invoicing_agg_level,
                    "default_invoicing_period_code": policy.default_invoicing_period_code,
                    "default_invoicing_period": policy.default_invoicing_period,
                    "invoicing_period_code": policy.invoicing_period_code,
                    "invoicing_period": policy.invoicing_period,
                    "payment_terms_code": policy.payment_terms_code,
                    "payment_terms": policy.payment_terms,
                    "invoicing_address_id": policy.invoicing_address_id,
                    "payment_method_code": policy.payment_method_code,
                    "payment_method": policy.payment_method,
                    "first_iss_pay_terms_code": policy.first_iss_pay_terms_code,
                    "first_issuance_payment_terms": policy.first_issuance_payment_terms,
                    "extensions_iss_pay_terms_code": policy.extensions_iss_pay_terms_code,
                    "extensions_iss_pay_terms": policy.extensions_iss_pay_terms,
                    "invoice_at_participant_level": policy.invoice_at_participant_level,
                    "payment_account_code": policy.payment_account_code,
                    "technicaldata": [
                        {
                            "create_date": policy.technicaldata[0].create_date,
                            "create_user": policy.technicaldata[0].create_user,
                            "change_date": policy.technicaldata[0].change_date,
                            "change_user": policy.technicaldata[0].change_user,
                            "migration_date": policy.technicaldata[0].migration_date,
                            "legacy_system": policy.technicaldata[0].legacy_system
                          }
                    ]
                });
            });
        }

        let subBondLinesList = [];
        function processSubBondlines(resp) {
            subBondLinesList = [];
            resp.forEach(function (subBondLine) {
                subBondLinesList.push({
                    "subbondline_id": subBondLine.subbondline_id,
                    "subpolicy_version": subBondLine.subbondline_version,
                    "sub_bondline_currency": subBondLine.sub_bondline_currency,
                    "line_amount": subBondLine.line_amount,
                    "proposed_amount": subBondLine.proposed_amount,
                    "request_amount": subBondLine.request_amount
                });
            });
        }

        let subPolicyList = [];
        function processSubPolicies(resp) {
            subPolicyList = [];
            resp.forEach(function (subPolicy) {
                subPolicyList.push({
                    "subpolicy_id": subPolicy.subpolicy_id,
                    "subpolicy_version": subPolicy.version || subPolicy.subpolicy_version,
                    "policy_offer_id": subPolicy.policy_offer_id,
                    "policy_offer_version": subPolicy.policy_offer_version,
                    "policy_id": subPolicy.policy_id,
                    "subpolicy_code": subPolicy.subpolicy_code,
                    "subpolicy_type_code": subPolicy.subpolicy_type_code,
                    "subpolicy_type": subPolicy.subpolicy_type,
                    "subpolicy_status_code": subPolicy.subpolicy_status_code,
                    "sub_policy_status": subPolicy.sub_policy_status,
                    "subpolicy_substatus_code": subPolicy.subpolicy_substatus_code,
                    "subpolicy_substatus": subPolicy.subpolicy_substatus,
                    "subpolicy_reason_code": subPolicy.subpolicy_reason_code,
                    "subpolicy_reason": subPolicy.subpolicy_reason,
                    "issue_date": subPolicy.issue_date,
                    "effective_date": subPolicy.effective_date,
                    "expiry_date": subPolicy.expiry_date,
                    "subpolicy_legacy_code": subPolicy.subpolicy_legacy_code,
                    "notice_period": subPolicy.notice_period,
                    "subpolicy_cust_ref_name": subPolicy.subpolicy_cust_ref_name,
                    "monitoring_date": subPolicy.monitoring_date,
                    "subpolicy_country_scope_code": subPolicy.subpolicy_country_scope_code,
                    "subpolicy_cap_con_type_code": subPolicy.subpolicy_cap_con_type_code,
                    "subpolicy_cap_con_type": subPolicy.subpolicy_cap_con_type,
                    "subpolicy_capacity_consumption_type_id": subPolicy.subpolicy_capacity_consumption_type_id,
                    "outcome_assessment_id": subPolicy.outcome_assessment_id,
                    "bonus_flag": subPolicy.bonus_flag,
                    "bonus_rate": subPolicy.bonus_rate,
                    "agreed_limit_amount": subPolicy.agreed_limit_amount,
                    "generate_sep_credit_note_flag": subPolicy.generate_sep_credit_note_flag,
                    "policy_service_request_code": subPolicy.policy_service_request_code,
                    "policy_service_request_type": subPolicy.policy_service_request_type,
                    "automatic_renewal": subPolicy.automatic_renewal,



                    "renewal_date": subPolicy.renewal_date,
                    "subpolicy_status": subPolicy.subpolicy_status,
                    "request_id": subPolicy.request_id,
                    "subpolicy_type": subPolicy.subpolicy_type,
                    "subpolicy_status_code": subPolicy.subpolicy_status_code,
                    "subpolicy_type_code": subPolicy.subpolicy_type_code,
                    "subpolicy_name": subPolicy.subpolicy_name
                });
            });
        }
        return {
            getReferenceData: function (observable, code, noresStr, allStr) {
                ojCombo.loadCombo(
                    'BD_PL',
                    'getReferenceDataV2', {
                        value: 'code',
                        label: 'ref_data_value'
                    }, { code: code }, {}, 'results.referencedatalist', 'tempArray',
                    observable, [],
                    noresStr, allStr
                )
            },
            getPolicyTypeDropdown: function (observable, noresStr, allStr) {
                ojCombo.loadCombo(
                    'BD_PL',
                    'getSubPolicies', {
                        value: 'subpolicy_id',
                        label: 'subpolicy_type'
                    }, {}, {}, 'message.data.sub_policies', 'sub_policies',
                    observable, [],
                    noresStr, allStr
                )
            },
            // pageURIParams: 'policy_id', 'organization_id'
            getPolicies: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    "policy_id": pageURIParams.policy_id,
                    "organization_id": pageURIParams.organization_id,
                    "subpolicy_id": pageURIParams.subpolicy_id
                };
                return evt.getServiceData(
                    'BD_PL',
                    'getPolicies', serviceURIParams, {},
                    'results.policies', processPolicies).then(function () {
                        func ? func(policyList) : policyList;
                        observable(policyList);
                        return policyList;
                    });
            },
            // pageURIParams: 'policy_id', 'organization_id', 'request_id'
            getSubPolicies: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    "subpolicy_id": pageURIParams.subpolicy_id,
                    "subpolicy_version": pageURIParams.subpolicy_version,
                    "policy_id": pageURIParams.policy_id,
                    "request_id": pageURIParams.request_id,
                    "subpolicy_type": pageURIParams.subpolicy_type,
                    "country": pageURIParams.country,
                    "intermediary_id": pageURIParams.intermediary_id
                };
                return evt.getServiceData(
                    'BD_PL',
                    'getSubPolicies', serviceURIParams, {},
                    'results.sub_policies', processSubPolicies).then(function (data) {
                        func ? func(subPolicyList) : subPolicyList;
                        observable(subPolicyList);
                        return data;
                    });
            },
            addProductPricing: function (pageDataParams, pageURIParams) {
                let uriParams = {
                    'subpolicy_id': pageURIParams.subpolicy_id,
                    'subpolicy_version': pageURIParams.subpolicy_version
                };
                let serviceDataParams = {
                    "product_pricings": {
                        "add": [{
                            "product_id": pageDataParams.product_id,
                            "product_version": pageDataParams.product_version,
                            "applied_annual_minimum_premium": pageDataParams.applied_annual_minimum_premium,
                            "applied_annual_premium_rate": pageDataParams.applied_annual_premium_rate,
                            "calculated_annual_minimum_premium": pageDataParams.calculated_annual_minimum_premium,
                            "calculated_annual_premium_rate": pageDataParams.calculated_annual_premium_rate,
                            "currency_code": pageDataParams.currency_code,
                            "modification_rate": pageDataParams.modification_rate,
                            "tax_applicable_rate": pageDataParams.tax_applicable_rate,
                            "applied_lifetime_minimum_premium": pageDataParams.applied_lifetime_minimum_premium,
                            "calculated_lifetime_minimum_premium": pageDataParams.calculated_lifetime_minimum_premium,
                            "sub_limit_currency": pageDataParams.sub_limit_currency,
                            "sub_limit_request_amount": pageDataParams.sub_limit_request_amount
                        }]
                    }
                }
                return evt.getServiceData(
                    'BD_PL',
                    'updateSubPolicy', serviceDataParams, uriParams,
                    'message', true);
            },
            getProductPricing: function (pageURIParams) {
                let uriParams = {
                    'subpolicy_id': pageURIParams.subpolicy_id,
                    'subpolicy_version': pageURIParams.subpolicy_version
                };
                return evt.getServiceData(
                    'BD_PL',
                    'getProductPricing', uriParams, {},
                    'message', true);
            },
            deleteProductPricing: function (pageDataParams, pageURIParams) {
                let uriParams = {
                    'subpolicy_id': pageURIParams.subpolicy_id,
                    'subpolicy_version': pageURIParams.subpolicy_version
                };
                let serviceDataParams = {
                    "product_pricings": {
                        "delete": [{
                            "product_id": pageDataParams.product_id,
                            "product_version": pageDataParams.product_version
                        }]
                    }
                }
                return evt.getServiceData(
                    'BD_PL',
                    'updateSubPolicy', serviceDataParams, uriParams,
                    'message', true);
            },
            addRelatedParties: function (pageDataParams, pageURIParams) {
                let uriParams = {
                    'subpolicy_id': pageURIParams.subpolicy_id,
                    'subpolicy_version': pageURIParams.subpolicy_version
                };
                let serviceDataParams = {
                    "related_parties": {
                        "add": [{
                            "party_id": pageDataParams.party_id,
                            "party_role": pageDataParams.party_role,
                            "commission_rate": pageDataParams.commission_rate,
                        }]
                    }
                }
                return evt.getServiceData(
                    'BD_PL',
                    'updateSubPolicy', serviceDataParams, uriParams,
                    'message', true);
            },


            // pageURIParams: 'subpolicy_id', 'subpolicy_version'
            getSubBondLines: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    "subpolicy_id": pageURIParams.subpolicy_id,
                    "subpolicy_version": pageURIParams.subpolicy_version,
                };
                return evt.getServiceData(
                    'BD_PL',
                    'getSubBondLines', serviceURIParams, {},
                    'results.result', processSubBondlines).then(function (data) {
                        func ? func(subBondLinesList) : subBondLinesList;
                        observable(subBondLinesList);
                        return data;
                    });
            },

            updateSubPolicy: function (payloadData, pageURIParams) {
                // path must be "participantsShare.add", "participantsShare.update" or "participantsShare.delete"
                function prepareParticipants(path) {
                    let array = [];
                    var val = null;
                    try { val = ojet.getProperty(path, payloadData); } catch (e) { }
                    if (val && val.length > 0) {
                        if (path !== 'participantsShare.delete') {
                            (ojet.getProperty(path, payloadData)).forEach(function (elem) {
                                array.push({
                                    "party_id": elem.party_id,
                                    "party_role": elem.party_role,
                                    "share": elem.share
                                });
                            });
                        } else {
                            (ojet.getProperty(path, payloadData)).forEach(function (elem) {
                                array.push({
                                    "party_id": elem.party_id
                                });
                            });
                        }
                    }
                    return array;
                }
                // path must be "relatedParties.add", "relatedParties.update" or "relatedParties.delete"
                function prepareRelatedParties(path) {
                    let array = [];
                    var val = null;
                    try { val = ojet.getProperty(path, payloadData); } catch (e) { }
                    if (val && val.length > 0) {
                        if (path !== 'participantsShare.delete') {
                            (ojet.getProperty(path, payloadData)).forEach(function (elem) {
                                array.push({
                                    "party_id": elem.party_id,
                                    "party_role": elem.party_role
                                });
                            });
                        } else {
                            (ojet.getProperty(path, payloadData)).forEach(function (elem) {
                                array.push({
                                    "party_id": elem.party_id
                                });
                            });
                        }
                    }
                    return array;
                }
                // path must be "productPricings.add", "productPricings.update" or "productPricings.delete"
                function prepareProductPricings(path) {
                    let array = [];
                    var val = null;
                    try { val = ojet.getProperty(path, payloadData); } catch (e) { }
                    if (val && val.length > 0) {
                        if (path !== 'productPricings.delete') {
                            (ojet.getProperty(path, payloadData)).forEach(function (elem) {


                                array.push({
                                    "product_id": elem.product_id,
                                    "product_version": elem.product_version,
                                    "applied_annual_minimum_premium": elem.applied_annual_minimum_premium,
                                    "applied_annual_premium_rate": elem.applied_annual_premium_rate,
                                    "calculated_annual_minimum_premium": elem.calculated_annual_minimum_premium,
                                    "calculated_annual_premium_rate": elem.calculated_annual_premium_rate,
                                    "currency_code": elem.currency_code,
                                    "modification_rate": elem.modification_rate,
                                    "tax_applicable_rate": elem.tax_applicable_rate,
                                    "applied_lifetime_minimum_premium": elem.applied_lifetime_minimum_premium,
                                    "calculated_lifetime_minimum_premium": elem.calculated_lifetime_minimum_premium
                                });

                            });
                        }
                        else {
                            (ojet.getProperty(path, payloadData)).forEach(function (elem) {
                                // TBD
                                array.push({
                                    "product_id": elem.product_id
                                });
                            });
                        }
                    }
                    return array;
                }
                // path must be "subBondlines.add", "subBondlines.update" or "subBondlines.delete"
                function prepareSubBondline(path) {
                    let object = {};
                    let val = null;
                    try { val = ojet.getProperty(path, payloadData); } catch (e) { }
                    if (val) {
                        if (path !== 'subBondlines.delete') {
                            object = {
                                "subbondline_id": val.subbondline_id,
                                "subpolicy_version": val.subpolicy_version,
                                "sub_bondline_currency": val.sub_bondline_currency,
                                "line_amount": val.line_amount,
                                "proposed_amount": val.proposed_amount,
                                "request_amount": val.request_amount,
                                "requested_amount": val.requested_amount
                            };
                        } else {
                            object = {
                                "subbondline_id": val.subbondline_id,
                                "subbondline_version": val.subbondline_version
                            };
                        }
                    }
                    return object;
                }
                let serviceDataParams = {
                    "notice_period": payloadData.notice_period,
                    "subpolicy_name": payloadData.subpolicy_name,
                    "automatic_renewal": payloadData.automatic_renewal,
                    "expiry_date": payloadData.expiry_date,
                    "notice_period": payloadData.notice_period,
                    "renewal_date": payloadData.renewal_date,
                    "effective_date": payloadData.effective_date,
                    "issue_date": payloadData.issue_date,
                    "subpolicy_type": payloadData.subpolicy_type,
                    "participants_share": {
                        "add": prepareParticipants('participantsShare.add'),
                        "update": prepareParticipants('participantsShare.update'),
                        "delete": prepareParticipants('participantsShare.delete')
                    },
                    "related_parties": {
                        "add": prepareRelatedParties('relatedParties.add'),
                        "update": prepareRelatedParties('relatedParties.update'),
                        "delete": prepareRelatedParties('relatedParties.delete')
                    },
                    "product_pricings": {
                        "add": prepareProductPricings('productPricings.add'),
                        "update": prepareProductPricings('productPricings.update'),
                        "delete": prepareProductPricings('productPricings.delete')
                    },
                    "sub_bondline": {
                        "add": prepareSubBondline('subBondlines.add'),
                        "update": prepareSubBondline('subBondlines.update'),
                        "delete": prepareSubBondline('subBondlines.delete')
                    }
                };

                let uriParams = {
                    "subpolicy_id": pageURIParams.subpolicy_id,
                    "subpolicy_version": pageURIParams.subpolicy_version
                }
                return evt.getServiceData(
                    'BD_PL',
                    'updateSubPolicy', serviceDataParams, uriParams,
                    'message', true);
            },
            updateSubPolicyV2: function (payloadData, pageURIParams) {
                let uriParams = {
                    "subpolicy_id": pageURIParams.subpolicy_id,
                    "subpolicy_version": pageURIParams.subpolicy_version
                }
                return evt.getServiceData(
                    'BD_PL',
                    'updateSubPolicy', payloadData, uriParams,
                    'message', true);
            },
            models: {
                SubPolicy: SubPolicy,
                SubBondLine: SubBondLine,
                LocalProduct: LocalProduct,
                ProductPricing: ProductPricing,
                MasterProduct: MasterProduct
            }
        }
    }
);