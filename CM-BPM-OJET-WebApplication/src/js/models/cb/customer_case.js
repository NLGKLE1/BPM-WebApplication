define([],
    function () {

        let customerCase = [];
        function processCustomerCase(getCustomerCaseResp) {
            customerCase = [];
            customerCase.push({
                'cust_case_identifier': getCustomerCaseResp.cust_case_identifier,
                'organizationid_sc': getCustomerCaseResp.organizationid_sc,
                'fuw_alert_flag': getCustomerCaseResp.fuw_alert_flag,
                'pad_alert_flag': getCustomerCaseResp.pad_alert_flag,
                'tuw_alert_flag': getCustomerCaseResp.tuw_alert_flag,
                'recovery_team_alert_flag': getCustomerCaseResp.recovery_team_alert_flag,
                'service_fee_alert_flag': getCustomerCaseResp.service_fee_alert_flag,
                'review_limit_block_alert_flag': getCustomerCaseResp.review_limit_block_alert_flag,
                'new_sub_policy_block_flag': getCustomerCaseResp.new_sub_policy_block_flag,
                'new_bond_policy_flag': getCustomerCaseResp.new_bond_policy_flag,
                'bond_release_block_flag': getCustomerCaseResp.bond_release_block_flag,
                'notified_bonds': getCustomerCaseResp.notified_bonds,
                'internally_prov_bonds': getCustomerCaseResp.internally_prov_bonds,
                'called_in_bonds': getCustomerCaseResp.called_in_bonds,
                'not_provisioned_bonds': getCustomerCaseResp.not_provisioned_bonds,
                'stat_prov_bonds': getCustomerCaseResp.stat_prov_bonds,
                'proposed_notified_bonds': getCustomerCaseResp.proposed_notified_bonds,
                'proposed_internally_prov_bonds': getCustomerCaseResp.proposed_internally_prov_bonds,
                'proposed_called_in_bonds': getCustomerCaseResp.proposed_called_in_bonds,
                'proposed_not_provisioned_bonds': getCustomerCaseResp.proposed_not_provisioned_bonds,
                'proposed_stat_prov_bonds': getCustomerCaseResp.proposed_stat_prov_bonds,
                'effective_provision_details': getCustomerCaseResp.effective_provision_details,
                'proposed_provision_details': getCustomerCaseResp.proposed_provision_details,
                'statistical_provision_details': getCustomerCaseResp.statistical_provision_details
            });
        };

        let customerCaseDetails = [];
        function processCustomerCaseDetails(getCustomerCaseDetailsResp) {
            customerCaseDetails = [];
            customerCaseDetails.push({
                'customer_case_id': getCustomerCaseDetailsResp.cust_case_identifier,
                'organizationid_sc': getCustomerCaseDetailsResp.organizationid_sc,
                'bond_list': getCustomerCaseDetailsResp.bond_list
            });
        };

        return {
            prepareBPMServiceURI: function (pageURIParams) {
                return {
                    'cust_case_identifier': pageURIParams.cust_case_identifier,
                    'action': pageURIParams.action,
                    'task_id': pageURIParams.task_id
                };
            },
            prepareBPMJson: function (pageDataParams, authResponse) {
                return {
                    'taskContext': {
                        'workflowContext': {
                            'token': authResponse.token,
                            'locale': authResponse.locale
                        }
                    },
                    'fuw_alert_flag': pageDataParams.fuw_alert_flag,
                    'pad_alert_flag': pageDataParams.pad_alert_flag,
                    'tuw_alert_flag': pageDataParams.tuw_alert_flag,
                    'recovery_team_alert_flag': pageDataParams.recovery_team_alert_flag,
                    'service_fee_alert_flag': pageDataParams.service_fee_alert_flag,
                    'review_limit_block_alert_flag': pageDataParams.review_limit_block_alert_flag,
                    'new_sub_policy_block_flag': pageDataParams.new_sub_policy_block_flag,
                    'new_bond_policy_flag': pageDataParams.new_bond_policy_flag,
                    'bond_release_block_flag': pageDataParams.bond_release_block_flag,
                    'organizationid_sc': pageDataParams.organizationid_sc,
                    'status_code': pageDataParams.status_code,
                    'currency_code': pageDataParams.currency_code,
                    'capital': pageDataParams.capital,
                    'interest': pageDataParams.interest,
                    'legal_cost_for_beneficiary': pageDataParams.legal_cost_for_beneficiary,
                    'legal_opposition_expense': pageDataParams.legal_opposition_expense,
                    'expected_recovery_expense': pageDataParams.expected_recovery_expense,
                    'expected_recovery': pageDataParams.expected_recovery,
                    'expected_payment_date': pageDataParams.expected_payment_date,
                    'expected_payment': pageDataParams.expected_payment
                };
            },

            // pageURIParams: 'cust_case_identifier'
            updateCustomerCase: function (pageURIParams, pageDataParams, func) {
                let serviceDataParams = {
                    'fuw_alert_flag': pageDataParams.fuw_alert_flag,
                    'pad_alert_flag': pageDataParams.pad_alert_flag,
                    'tuw_alert_flag': pageDataParams.tuw_alert_flag,
                    'recovery_team_alert_flag': pageDataParams.recovery_team_alert_flag,
                    'service_fee_alert_flag': pageDataParams.service_fee_alert_flag,
                    'review_limit_block_alert_flag': pageDataParams.review_limit_block_alert_flag,
                    'new_sub_policy_block_flag': pageDataParams.new_sub_policy_block_flag,
                    'new_bond_policy_flag': pageDataParams.new_bond_policy_flag,
                    'bond_release_block_flag': pageDataParams.bond_release_block_flag,
                    'bond_provisions_sets': pageDataParams.bond_provisions_sets
                };
                return evt.getServiceData(
                    'CB', 'updateCustomerCase',
                    pageURIParams,
                    serviceDataParams,
                    '', true
                );
            },
            // pageURIParams: 'cust_case_identifier', 'action', 'task_id'
            takeActionOnCustomerCase: function (pageURIParams, pageDataParams, authResponse) {
                return evt.getServiceData(
                    'CB', 'takeActionOnCustomerCase',
                    this.prepareBPMServiceURI(pageURIParams),
                    this.prepareBPMJson(pageDataParams, authResponse),
                    '', true
                );
            },
            // pageURIParams: 'cust_case_identifier', 'language'
            getCustomerCase: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'cust_case_identifier': pageURIParams.cust_case_identifier,
                    'language': pageURIParams.language
                };
                return evt.getServiceData(
                    'CB', 'getCustomerCase',
                    serviceURIParams, {},
                    'results.listcustomerclaimcases[0]', processCustomerCase).then(function () {
                        func ? func(customerCase) : customerCase;
                        observable(customerCase);
                    }
                );
            },
            // pageURIParams: 'cust_case_identifier', 'bond_provision_status_code', 'language'
            getCustomerCaseDetails: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'cust_case_identifier': pageURIParams.cust_case_identifier,
                    'bond_provision_status_code': pageURIParams.bond_provision_status_code,
                    'language': pageURIParams.language
                };
                return evt.getServiceData(
                    'CB', 'getCustomerCaseDetails',
                    serviceURIParams, {},
                    'results.customer_claim_case_list[0]', processCustomerCaseDetails).then(function () {
                        func ? func(customerCaseDetails) : customerCaseDetails;
                        observable(customerCaseDetails);
                    }
                );
            }
        }
    }
);