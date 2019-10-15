define([],
    function () {

        let bondCase = [];
        function processBondCase(getBondCaseResp) {
            bondCase = [];
            bondCase.push({
                'bond_case_identifier': getBondCaseResp.bond_case_identifier,
                'bond_version': getBondCaseResp.bond_version,
                'bond_id': getBondCaseResp.bond_id,
                'capital': getBondCaseResp.capital,
                'interest': getBondCaseResp.interest,
                'legal_cost_for_beneficiary': getBondCaseResp.legal_cost_for_beneficiary,
                'legal_opposition_expense': getBondCaseResp.legal_opposition_expense,
                'expected_recovery_expense': getBondCaseResp.expected_recovery_expense,
                'expected_recovery': getBondCaseResp.expected_recovery,
                'expected_payment_date': getBondCaseResp.expected_payment_date,
                'expected_recovery_date': getBondCaseResp.expected_recovery_date,
                'expected_payment': getBondCaseResp.expected_payment,
                'organizationid_sc': getBondCaseResp.organizationid_sc,
                'claims_uwy': getBondCaseResp.claims_uwy,
                'status_code': getBondCaseResp.status_code,
                'status': getBondCaseResp.status,
                'proposed_provision_details': getBondCaseResp.proposed_provision_details
            });
        };

        return {
            prepareBPMServiceURI: function (pageURIParams) {
                return {
                    'bond_case_identifier': pageURIParams.bond_case_identifier,
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
                    'bond_version': pageDataParams.bond_version,
                    'bond_id': pageDataParams.bond_id,
                    'capital': pageDataParams.capital,
                    'interest': pageDataParams.interest,
                    'legal_cost_for_beneficiary': pageDataParams.legal_cost_for_beneficiary,
                    'legal_opposition_expense': pageDataParams.legal_opposition_expense,
                    'expected_recovery_expense': pageDataParams.expected_recovery_expense,
                    'expected_recovery': pageDataParams.expected_recovery,
                    'expected_payment_date': pageDataParams.expected_payment_date,
                    'expected_recovery_date': pageDataParams.expected_recovery_date,
                    'expected_payment': pageDataParams.expected_payment,
                    'organizationid_sc': pageDataParams.organizationid_sc,
                    'claims_uwy': pageDataParams.claims_uwy,
                    'status_code': pageDataParams.status_code,
                    'proposed_provision_details': pageDataParams.proposed_provision_details
                };
            },

            createBondCase: function (pageDataParams) {
                let serviceDataParams = {
                    'bond_version': pageDataParams.bond_version,
                    'bond_id': pageDataParams.bond_id,
                    'capital': pageDataParams.capital,
                    'interest': pageDataParams.interest,
                    'legal_cost_for_beneficiary': pageDataParams.legal_cost_for_beneficiary,
                    'legal_opposition_expense': pageDataParams.legal_opposition_expense,
                    'expected_recovery_expense': pageDataParams.expected_recovery_expense,
                    'expected_recovery': pageDataParams.expected_recovery,
                    'expected_payment_date': pageDataParams.expected_payment_date,
                    'expected_recovery_date': pageDataParams.expected_recovery_date,
                    'expected_payment': pageDataParams.expected_payment,
                    'organizationid_sc': pageDataParams.organizationid_sc,
                    'claims_uwy': pageDataParams.claims_uwy,
                    'proposed_provision_details': pageDataParams.proposed_provision_details
                };
                return evt.getServiceData(
                    'CB', 'createBondCase', {},
                    serviceDataParams, 'results', true
                );
            },
            // pageURIParams: 'bond_case_identifier', 'action', 'task_id'
            takeActionOnBondCase: function (pageURIParams, pageDataParams, authResponse) {
                return evt.getServiceData(
                    'CB', 'takeActionOnBondCase',
                    this.prepareBPMServiceURI(pageURIParams),
                    this.prepareBPMJson(pageDataParams, authResponse),
                    '', true
                );
            },
            // pageURIParams: 'bond_case_identifier', 'action', 'task_id'
            takeActionOnBondCaseV2: function (pageURIParams, pageDataParams, authResponse) {
                return evt.getServiceData(
                    'CB', 'takeActionOnBondCaseV2',
                    this.prepareBPMServiceURI(pageURIParams),
                    this.prepareBPMJson(pageDataParams, authResponse),
                    '', true
                );
            },
            // pageURIParams: 'bond_case_identifier', 'bond_identifier', 'language'
            getBondCase: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'bond_case_identifier': pageURIParams.bond_case_identifier,
                    'bond_identifier': pageURIParams.bond_identifier,
                    'language': pageURIParams.language
                };
                return evt.getServiceData(
                    'CB', 'getBondCase',
                    serviceURIParams, {},
                    'results.bondcase', processBondCase).then(function () {
                        func ? func(bondCase) : bondCase;
                        observable(bondCase);
                    }
                );
            }
        };
    }
);