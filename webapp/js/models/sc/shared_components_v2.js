define([],
    function () {
        let countryList = [];
        function processCountryListResult(result) {
            countryList = [];
            result.forEach(function (elem) {
                countryList.push({
                    'country_id': elem.country_id,
                    'language_code': elem.language_code,
                    'effective_from': elem.effective_from,
                    'effective_to': elem.effective_to,
                    'country_name': elem.country_name,
                    'country_code': elem.country_code,
                    'country_sub_code': elem.country_sub_code,
                    'iso_2char_code': elem.iso_2char_code,
                    'international_dial_from_code': elem.international_dial_from_code,
                    'international_dial_to_code': elem.international_dial_to_code
                });
            });
        }
        let regionList = [];
        function processRegionListResult(result) {
            regionList = [];
            result.forEach(function (elem) {
                regionList.push({
                    'orcoy_id': elem.orcoy_id,
                    'country_name': elem.country_name,
                    'language_code': elem.language_code,
                    'language_name': elem.language_name,
                    'country_code': elem.country_code,
                    'country_sub_code': elem.country_sub_code,
                    'iso_2char_code': elem.iso_2char_code,
                    'region_name': elem.region_name,
                    'region_code': elem.region_code
                });
            });
        }
        let countriesAndCitiesNamesList = [];
        function processCountriesAndCitiesNamesResult(result) {
            countriesAndCitiesNamesList = [];
            result.forEach(function (elem) {
                countriesAndCitiesNamesList.push({
                    'country_id': elem.country_id,
                    'country_name': elem.country_name,
                    'language_code': elem.language_code,
                    'effective_from': elem.effective_from,
                    'effective_to': elem.effective_to,
                    'city_id': elem.city_id,
                    'city_name': elem.city_name,
                    'validity_flag': elem.validity_flag,
                    'city_desc': elem.city_desc,
                    'location_name': elem.location_name,
                });
            });
        }
        let languageList = [];
        function processLanguageListResult(result) {
            languageList = [];
            result.forEach(function (elem) {
                languageList.push({
                    'source_lang_code': elem.source_lang_code,
                    'target_lang_name': elem.target_lang_name,
                    'target_lang_code': elem.target_lang_code,
                    'decimal_ind': elem.decimal_ind,
                    'thousand_separator': elem.thousand_separator,
                    'non_latin_flag': elem.non_latin_flag
                });
            });
        }
        let currencyList = [];
        function processCurrencyListResult(result) {
            currencyList = [];
            result.forEach(function (elem) {
                currencyList.push({
                    'currency_code': elem.currency_code,
                    'validity_flag': elem.validity_flag,
                    'language_code': elem.language_code,
                    'local_currency_name': elem.local_currency_name,
                    'currency_symbol': elem.currency_symbol,
                    'euro_fixed_flag': elem.euro_fixed_flag,
                    'integer_flag': elem.integer_flag,
                    'au_trunc_amt': elem.au_trunc_amt,
                    'stand_ncm_flag': elem.stand_ncm_flag
                });
            });
        }
        let countryLegalStatusList = [];
        function processCountryLegalStatusListResult(result) {
            countryLegalStatusList = [];
            result.forEach(function (elem) {
                countryLegalStatusList.push({
                    'country_id': elem.country_id,
                    'code': elem.code,
                    'sub_area_code': elem.sub_area_code,
                    'effective_to': elem.effective_to,
                    'effective_from': elem.effective_from,
                    'country_name': elem.country_name,
                    'type': elem.type,
                    'validity_flag': elem.validity_flag,
                    'status_desc': elem.status_desc,
                    'language_name': elem.language_name,
                    'desc': elem.desc,
                    'category_code': elem.category_code,
                    'language_code': elem.language_code,
                    'cro_mandatory_ind': elem.cro_mandatory_ind,
                    'dp_letter': elem.dp_letter,
                    'legal_status_refer_flag': elem.legal_status_refer_flag,
                    'postcode_mandatory_ind': elem.postcode_mandatory_ind,
                    'rn_letter': elem.rn_letter,
                    'suspend_buyer_rating_flag': elem.suspend_buyer_rating_flag,
                    'vat_mandatory_ind': elem.vat_mandatory_ind
                });
            })
        }
        let sectorGroupList = [];
        function processSectorGroupListResult(result) {
            sectorGroupList = [];
            result.forEach(function (elem) {
                sectorGroupList.push({
                    'value': elem.trade_sector_code,
                    'label': elem.sector_group_name,
                    'trade_sector_code': elem.trade_sector_code,
                    'sector_name': elem.sector_name,
                    'validity_flag_sector': elem.validity_flag_sector,
                    'sector_group_type': elem.sector_group_type,
                    'sector_seq': elem.sector_seq,
                    'sector_group_name': elem.sector_group_name,
                    'validity_flag_sectorgrp': elem.validity_flag_sectorgrp,
                    'effective_from': elem.effective_from,
                    'effective_to': elem.effective_to
                });
            })
        }
        let cGRefCodeDataList = [];
        function processCGRefCodeDataListResult(result) {
            cGRefCodeDataList = [];
            result.forEach(function (elem) {
                cGRefCodeDataList.push({
                    'value': elem.low_value,
                    'label': elem.meaning,
                    'domain': elem.domain,
                    'low_value': elem.low_value,
                    'high_value': elem.high_value,
                    'abbreviation': elem.abbreviation,
                    'meaning': elem.meaning,
                    'type': elem.type,
                    'language_code': elem.language_code
                });
            })
        }
        let countryDefaultsList = [];
        function processCountryDefaultsListResult(result) {
            countryDefaultsList = [];
            result.forEach(function (elem) {
                countryDefaultsList.push({
                    'countryDefaults': {
                        'currencyCode': elem.currencyCode,
                        'languageCode': elem.languageCode,
                        'usernamePrefix': elem.usernamePrefix,
                        'VATAndCROSameFlag': elem.VATAndCROSameFlag,
                        'prefixCode': elem.prefixCode,
                        'externalLanguageCode': elem.externalLanguageCode,
                        'createUserFlag': elem.createUserFlag,
                        'internalOrganisationIdentifier': elem.internalOrganisationIdentifier,
                        'recordHashValue': elem.recordHashValue
                    },
                    'names': {
                        'country': elem.country,
                        'currency': elem.currency,
                        'language': elem.language
                    }
                });
            })
        }
        let organisationList = [];
        function processOrganisationListResult(result) {
            organisationList = [];
            result.forEach(function (elem) {
                organisationList.push({
                    'match_id': elem.match_id,
                    'score': elem.score,
                    'search_status': elem.search_status,
                    'country_id': elem.country_id,
                    'org_id': elem.org_id,
                    'first_line_name': elem.first_line_name,
                    'second_line_name': elem.second_line_name,
                    'third_line_name': elem.third_line_name,
                    'first_line_street_addr': elem.first_line_street_addr,
                    'second_line_street_addr': elem.second_line_street_addr,
                    'third_line_street_addr': elem.third_line_street_addr,
                    'city_id': elem.city_id,
                    'city_name': elem.city_name,
                    'post_code': elem.post_code,
                    'vat_nr': elem.vat_nr,
                    'co_registered_nr': elem.co_registered_nr,
                    'trade_nace_code': elem.trade_nace_code,
                    'address_type': elem.address_type,
                    'org_name_id': elem.org_name_id,
                    'org_addr_id': elem.org_addr_id,
                    'other_system_code1': elem.other_system_code1,
                    'other_system_ref_nr1': elem.other_system_ref_nr1,
                    'other_system_code2': elem.other_system_code2,
                    'other_system_ref_nr2': elem.other_system_ref_nr2,
                    'address_concat': elem.first_line_street_addr ? elem.first_line_street_addr : '' + ' ' + elem.second_line_street_addr ? elem.second_line_street_addr : '' + ' ' + elem.third_line_street_addr ? elem.third_line_street_addr : ''
                });
            });
        }
        let organisation = [];
        function processOrganisation(result) {
            organisation = [];
            result.forEach(function (elem) {
                organisation.push({
                    'org_id': elem.org_id,
                    'effective_from': elem.effective_from,
                    'effective_to': elem.effective_to,
                    'org_name_addr_id': elem.org_name_addr_id,
                    'first_line_name': elem.first_line_name,
                    'second_line_name': elem.second_line_name,
                    'third_line_name': elem.third_line_name,
                    'first_line_name_uni': elem.first_line_name_uni,
                    'second_line_name_uni': elem.second_line_name_uni,
                    'third_line_name_uni': elem.third_line_name_uni,
                    'first_line_street_addr': elem.first_line_street_addr,
                    'second_line_street_addr': elem.second_line_street_addr,
                    'third_line_street_addr': elem.third_line_street_addr,
                    'first_line_street_addr_uni': elem.first_line_street_addr_uni,
                    'second_line_street_addr_uni': elem.second_line_street_addr_uni,
                    'third_line_street_addr_uni': elem.third_line_street_addr_uni,
                    'short_name': elem.short_name,
                    'local_lang_code': elem.local_lang_code,
                    'address_type': elem.address_type,
                    'rv_meaning': elem.rv_meaning,
                    'region_name': elem.region_name,
                    'city_name_org': elem.city_name_org,
                    'city_id': elem.city_id,
                    'city_name': elem.city_name,
                    'post_code': elem.post_code,
                    'country_id': elem.country_id,
                    'country_name': elem.country_name,
                    'address_lang_code': elem.address_lang_code,
                    'region_name_uni': elem.region_name_uni,
                    'city_name_uni': elem.city_name_uni,
                    'post_code_uni': elem.post_code_uni,
                    'co_registered_nr': elem.co_registered_nr,
                    'vat_nr': elem.vat_nr,
                    'edi_nr': elem.edi_nr,
                    'email_addr': elem.email_addr,
                    'fax_nr': elem.fax_nr,
                    'tel_ind': elem.tel_ind,
                    'tel_nr': elem.tel_nr,
                    'telex_nr': elem.telex_nr,
                    'trade_nace_code': elem.trade_nace_code,
                    'org_addr_id': elem.org_addr_id,
                    'org_name_id': elem.org_name_id,
                    'name_concat': elem.first_line_name ? elem.first_line_name : '' + ' ' + elem.second_line_name ? elem.second_line_name : '' + ' ' + elem.third_line_name ? elem.third_line_name : '',
                    'address_concat': elem.first_line_street_addr ? elem.first_line_street_addr : '' + ' ' + elem.second_line_street_addr ? elem.second_line_street_addr : '' + ' ' + elem.third_line_street_addr ? elem.third_line_street_addr : '',
                    'post_code_concat': elem.post_code ? elem.post_code : '' + ' ' + elem.city_name ? elem.city_name : '',
                    'address_type_aux': elem.address_type === 'REG' ? 'Main' : elem.address_type
                });
            });
        }
        let organisationExtIdList = [];
        function processOrganisationExtIdListResult(result) {
            organisationExtIdList = [];
            result.forEach(function (elem) {
                organisationExtIdList.push({
                    'org_id': elem.org_id,
                    'other_system_ref_nr': elem.other_system_ref_nr,
                    'other_sys_code': elem.other_sys_code,
                    'local_lang_code': elem.local_lang_code,
                    'other_sys_name': elem.other_sys_name,
                    'type': elem.type,
                    'format_text': elem.format_text,
                    'seq': elem.seq,
                    'master_ind': elem.master_ind,
                    'validity_flag': elem.validity_flag,
                    'check_ind': elem.check_ind,
                    'iface_next_run_flag': elem.iface_next_run_flag,
                    'iface_flag': elem.iface_flag,
                    'effective_from': elem.effective_from,
                    'effective_to': elem.effective_to
                });
            });
        }
        let organisationRolesList = [];
        function processOrganisationRolesListResult(result) {
            organisationRolesList = [];
            result.forEach(function (elem) {
                organisationRolesList.push({
                    'org_id': elem.org_id,
                    'role_type': elem.role_type,
                    'role_desc': elem.role_desc,
                    'effective_from': elem.effective_from,
                    'effective_to': elem.effective_to
                });
            });
        }
        let organisationDetailsList = [];
        function processOrganisationDetailsListResult(result) {
            organisationDetailsList = [];
            result.forEach(function (elem) {
                organisationDetailsList.push({
                    'org_id': elem.org_id,
                    'effective_from': elem.effective_from,
                    'effective_to': elem.effective_to,
                    'juridicial_reason_id': elem.juridicial_reason_id,
                    'local_lang_code': elem.local_lang_code,
                    'legal_status_type': elem.legal_status_type,
                    'ndn_org_flag': elem.ndn_org_flag,
                    'currency_code': elem.currency_code,
                    'payment_type': elem.payment_type,
                    'public_code': elem.public_code,
                    'reason_date': elem.reason_date,
                    'remittance_type': elem.remittance_type,
                    'short_name': elem.short_name,
                    'status_code': elem.status_code,
                    'url_name': elem.url_name,
                    'emp_count': elem.emp_count,
                    'foundation_date': elem.foundation_date
                });
            });
        }
        let individualsList = [];
        function processIndividualsListResult(result) {
            individualsList = [];
            result.forEach(function (elem) {
                individualsList.push({
                    'org_id': elem.org_id,
                    'effective_from': elem.effective_from,
                    'effective_to': elem.effective_to,
                    'first_line_name': elem.first_line_name,
                    'individual_id_uni': elem.individual_id_uni,
                    'individual_name_uni': elem.individual_name_uni,
                    'individual_id': elem.individual_id,
                    'local_lang_code': elem.local_lang_code,
                    'system_user_id': elem.system_user_id,
                    'individual_name': elem.individual_name,
                    'last_update_date': elem.last_update_date,
                    'last_update_seq': elem.last_update_seq,
                    'corp_org_all_id': elem.corp_org_all_id,
                    'non_ncm_org_id': elem.non_ncm_org_id,
                    'salutat_name': elem.salutat_name,
                    'fax_nr': elem.fax_nr,
                    'telext_nr': elem.telext_nr,
                    'tel_nr': elem.tel_nr,
                    'edi_nr': elem.edi_nr,
                    'telex_nr': elem.telex_nr,
                    'dept_name': elem.dept_name,
                    'job_title_desc': elem.job_title_desc,
                    'workGroup_Sec_id': elem.workGroup_Sec_id,
                    'ext_ref_nr': elem.ext_ref_nr,
                    'decision_maker_flag': elem.decision_maker_flag,
                    'email_addr': elem.email_addr,
                    'mobile_tel_nr': elem.mobile_tel_nr,
                    'gender_ind': elem.gender_ind,
                    'job_level_code': elem.job_level_code,
                    'available_perc': elem.available_perc,
                    'birth_date': elem.birth_date,
                    'email_output_flag': elem.email_output_flag,
                    'email_status_ind': elem.email_status_ind,
                    'email_status_date': elem.email_status_date,
                    'tel_ind': elem.tel_ind,
                    'first_name': elem.first_name,
                    'last_name': elem.last_name,
                    'number_details_flag': elem.number_details_flag,
                    'number_mail_flag': elem.number_mail_flag,
                    'personal_text': elem.personal_text,
                    'business_text': elem.business_text,
                    'note_text': elem.note_text,
                    'edo_status_date': elem.edo_status_date,
                    'edo_terms_accepted': elem.edo_terms_accepted,
                    'edo_accepted_date': elem.edo_accepted_date,
                    'identity_verified_flag': elem.identity_verified_flag,
                    'salutat_name_concat': elem.salutat_name + ' ' + elem.first_name
                });
            });
        }
        let individualDetailsList = [];
        function processIndividualDetailsListResult(result) {
            individualDetailsList = [];
            result.forEach(function (elem) {
                individualDetailsList.push({
                    'individual_id': elem.individual_id,
                    'country_of_birth_id': elem.country_of_birth_id,
                    'city_of_birth_id': elem.city_of_birth_id
                });
            });
        }
        let financialsList = [];
        function processFinancialsListResult(result) {
            financialsList = [];
            result.forEach(function (elem) {
                financialsList.push({
                    'org_id': elem.org_id,
                    'balance_sheet_date': elem.balance_sheet_date,
                    'balance_sheet_receive_date': elem.alance_sheet_receive_date,
                    'report_type': elem.report_type,
                    'report_type_desc': elem.report_type_desc,
                    'orcuy_code': elem.orcuy_code,
                    'currency_desc': elem.currency_desc,
                    'orfcd_id': elem.orfcd_id,
                    'cd_name': elem.cd_name,
                    'report_purpose_code': elem.report_purpose_code,
                    'report_purpose_desc': elem.report_purpose_desc,
                    'report_source_code': elem.report_source_code,
                    'report_source_code_desc': elem.report_source_code_desc,
                    'report_status_code': elem.report_status_code,
                    'report_status_desc': elem.report_status_desc,
                    'amt_multiply_factor_num': elem.amt_multiply_factor_num,
                    'bal_sheet_error_amt': elem.bal_sheet_error_amt,
                    'ac_cash_oper_amt': elem.ac_cash_oper_amt,
                    'ac_chg_work_inv_amt': elem.ac_chg_work_inv_amt,
                    'ac_curr_por_ltd_amt': elem.ac_curr_por_ltd_amt,
                    'ac_depreciation_amt': elem.ac_depreciation_amt,
                    'ac_div_paid_amt': elem.ac_div_paid_amt,
                    'ac_gross_cash_flow_amt': elem.ac_gross_cash_flow_amt,
                    'ac_inde_oper_ass_amt': elem.ac_inde_oper_ass_amt,
                    'ac_inde_oper_liabs_amt': elem.ac_inde_oper_liabs_amt,
                    'ac_int_paid_amt': elem.ac_int_paid_amt,
                    'ac_int_rec_amt': elem.ac_int_rec_amt,
                    'ac_net_capex_amt': elem.ac_net_capex_amt,
                    'ac_net_cashflow_amt': elem.ac_net_cashflow_amt,
                    'ac_net_op_profit_amt': elem.ac_net_op_profit_amt,
                    'ac_taxation_amt': elem.ac_taxation_amt,
                    'ass_adv_payments_amt': elem.ass_adv_payments_amt,
                    'ass_cash_bank_amt': elem.ass_cash_bank_amt,
                    'ass_current_amt': elem.ass_current_amt,
                    'ass_finished_goods_amt': elem.ass_finished_goods_amt,
                    'ass_goodwill_amt': elem.ass_goodwill_amt,
                    'ass_intang_amt': elem.ass_intang_amt,
                    'ass_invent_amt': elem.ass_invent_amt,
                    'ass_land_builds_amt': elem.ass_land_builds_amt,
                    'ass_liquid_assets_amt': elem.ass_liquid_assets_amt,
                    'ass_loans_to_parts_amt': elem.ass_loans_to_parts_amt,
                    'ass_net_fix_assets_amt': elem.ass_net_fix_assets_amt,
                    'ass_other_curr_amt': elem.ass_other_curr_amt,
                    'ass_other_finan_amt': elem.ass_other_finan_amt,
                    'ass_other_fix_ass_amt': elem.ass_other_fix_ass_amt,
                    'ass_other_invent_amt': elem.ass_other_invent_amt,
                    'ass_other_liq_assets_amt': elem.ass_other_liq_assets_amt,
                    'ass_other_rec_amt': elem.ass_other_rec_amt,
                    'ass_other_tang_amt': elem.ass_other_tang_amt,
                    'ass_part_amt': elem.ass_part_amt,
                    'ass_quick_assets_amt': elem.ass_quick_assets_amt,
                    'ass_receives_amt': elem.ass_receives_amt,
                    'ass_startup_exps_amt': elem.ass_startup_exps_amt,
                    'ass_supplies_amt': elem.ass_supplies_amt,
                    'ass_tot_amt': elem.ass_tot_amt,
                    'ass_tot_fix_ass_amt': elem.ass_tot_fix_ass_amt,
                    'ass_tot_fixed_amt': elem.ass_tot_fixed_amt,
                    'ass_tot_rec_amt': elem.ass_tot_rec_amt,
                    'ass_trade_rec_amt': elem.ass_trade_rec_amt,
                    'ass_work_in_prog_amt': elem.ass_work_in_prog_amt,
                    'comp_calc_result': elem.comp_calc_result,
                    'conf_details_flag': elem.conf_details_flag,
                    'details_final_flag': elem.details_final_flag,
                    'earn_chng_ret_earn_amt': elem.earn_chng_ret_earn_amt,
                    'earn_cost_mat_servs_amt': elem.earn_cost_mat_servs_amt,
                    'earn_cost_of_sales_amt': elem.earn_cost_of_sales_amt,
                    'earn_deprec_amt': elem.earn_deprec_amt,
                    'earn_dividends_amt': elem.earn_dividends_amt,
                    'earn_extra_exps_amt': elem.earn_extra_exps_amt,
                    'earn_extra_inc_amt': elem.earn_extra_inc_amt,
                    'earn_fin_goods_amt': elem.earn_fin_goods_amt,
                    'earn_finan_exps_amt': elem.earn_finan_exps_amt,
                    'earn_finan_inc_amt': elem.earn_finan_inc_amt,
                    'earn_gross_result_amt': elem.earn_gross_result_amt,
                    'earn_net_after_tax_amt': elem.earn_net_after_tax_amt,
                    'earn_net_before_tax_amt': elem.earn_net_before_tax_amt,
                    'earn_net_sales_amt': elem.earn_net_sales_amt,
                    'earn_operate_result_amt': elem.earn_operate_result_amt,
                    'earn_other_amt': elem.earn_other_amt,
                    'earn_other_labour_amt': elem.earn_other_labour_amt,
                    'earn_other_op_exps_amt': elem.earn_other_op_exps_amt,
                    'earn_other_op_inc_amt': elem.earn_other_op_inc_amt,
                    'earn_sga_amt': elem.earn_sga_amt,
                    'earn_staff_costs_amt': elem.earn_staff_costs_amt,
                    'earn_tax_amt': elem.earn_tax_amt,
                    'fin_data_per': elem.fin_data_per,
                    'fin_data_per_typ': elem.fin_data_per_typ,
                    'liab_accrued_amt': elem.liab_accrued_amt,
                    'liab_balance_amt': elem.liab_balance_amt,
                    'liab_curr_por_ltd_amt': elem.liab_curr_por_ltd_amt,
                    'liab_defer_taxes_amt': elem.liab_defer_taxes_amt,
                    'liab_due_to_banks_amt': elem.liab_due_to_banks_amt,
                    'liab_equal_account_amt': elem.liab_equal_account_amt,
                    'liab_equity_capital_amt': elem.liab_equity_capital_amt,
                    'liab_issued_capital_amt': elem.liab_issued_capital_amt,
                    'liab_less_net_worth_amt': elem.liab_less_net_worth_amt,
                    'liab_long_term_amt': elem.liab_long_term_amt,
                    'liab_lt_assoc_co_amt': elem.liab_lt_assoc_co_amt,
                    'liab_lt_loans_amt': elem.liab_lt_loans_amt,
                    'liab_minor_interest_amt': elem.liab_minor_interest_amt,
                    'liab_other_amt': elem.liab_other_amt,
                    'liab_other_curr_amt': elem.liab_other_curr_amt,
                    'liab_other_lt_amt': elem.liab_other_lt_amt,
                    'liab_other_lt_liabs_amt': elem.liab_other_lt_liabs_amt,
                    'liab_other_provs_amt': elem.liab_other_provs_amt,
                    'liab_pay_on_goods_amt': elem.liab_pay_on_goods_amt,
                    'liab_pensions_amt': elem.liab_pensions_amt,
                    'liab_provs_amt': elem.liab_provs_amt,
                    'liab_reserve_amt': elem.liab_reserve_amt,
                    'liab_ret_earn_res_amt': elem.liab_ret_earn_res_amt,
                    'liab_surplus_equity_amt': elem.liab_surplus_equity_amt,
                    'liab_taxes_soc_sec_amt': elem.liab_taxes_soc_sec_amt,
                    'liab_tot_amt': elem.liab_tot_amt,
                    'liab_tot_curr_liab_amt': elem.liab_tot_curr_liab_amt,
                    'liab_tot_net_worth_amt': elem.liab_tot_net_worth_amt,
                    'liab_tot_st_debt_amt': elem.liab_tot_st_debt_amt,
                    'liab_total_liabs_amt': elem.liab_total_liabs_amt,
                    'liab_trade_creds_amt': elem.liab_trade_creds_amt,
                    'mem_cont_liab_amt': elem.mem_cont_liab_amt,
                    'mem_depreciation_amt': elem.mem_depreciation_amt,
                    'mem_net_capex_amt': elem.mem_net_capex_amt,
                    'ratio_credit_cycle_qty': elem.ratio_credit_cycle_qty,
                    'ratio_creditor_days_qty': elem.ratio_creditor_days_qty,
                    'ratio_current_ratio_rate': elem.ratio_current_ratio_rate,
                    'ratio_debtor_days_qty': elem.ratio_debtor_days_qty,
                    'ratio_div_cover_rate': elem.ratio_div_cover_rate,
                    'ratio_gearing_pct': elem.ratio_gearing_pct,
                    'ratio_gross_prof_pct': elem.ratio_gross_prof_pct,
                    'ratio_int_cover_rate': elem.ratio_int_cover_rate,
                    'ratio_net_int_sales_pct': elem.ratio_net_int_sales_pct,
                    'ratio_oper_prof_pct': elem.ratio_oper_prof_pct,
                    'ratio_pre_tax_prof_pct': elem.ratio_pre_tax_prof_pct,
                    'ratio_quick_ratio_rate': elem.ratio_quick_ratio_rate,
                    'ratio_roce_pct': elem.ratio_roce_pct,
                    'ratio_sal_net_fix_ass_rate': elem.ratio_sal_net_fix_ass_rate,
                    'ratio_solvability_pct': elem.ratio_solvability_pct,
                    'ratio_st_gearing_pct': elem.ratio_st_gearing_pct,
                    'ratio_stock_days_qty': elem.ratio_stock_days_qty,
                    'ratio_tang_net_worth_amt': elem.ratio_tang_net_worth_amt,
                    'ratio_turn_net_amt': elem.ratio_turn_net_amt,
                    'ratio_working_capital_amt': elem.ratio_working_capital_amt
                });
            });
        }
        let organisationSectorsList = [];
        function processOrganisationSectorsListResult(result) {
            organisationSectorsList = [];
            result.forEach(function (elem) {
                organisationSectorsList.push({
                    'value': elem.trade_nace_code,
                    'label': elem.trade_nace_code,
                    'org_id': elem.org_id,
                    'first_line_name': elem.first_line_name,
                    'second_line_name': elem.second_line_name,
                    'third_line_name': elem.third_line_name,
                    'first_line_name_uni': elem.first_line_name_uni,
                    'second_line_name_uni': elem.second_line_name_uni,
                    'third_line_name_uni': elem.third_line_name_uni,
                    'trade_nace_code': elem.trade_nace_code,
                    'main_flag': elem.main_flag,
                    'trade_sector_desc': elem.trade_sector_desc,
                    'effective_from': elem.effective_from,
                    'effective_to': elem.effective_to,
                    'validity_flag': elem.validity_flag,
                    'effective_from_fd': ojet.formatDate(elem.effective_from),
                    'effective_to_fd': ojet.formatDate(elem.effective_to),
                    'nace_code_concat': elem.trade_nace_code + ' - ' + elem.trade_sector_desc
                });
            });
        }
        let organisationContactPointsList = [];
        function processOrganisationContactPointsListResult(result) {
            organisationContactPointsList = [];
            result.forEach(function (elem) {
                organisationContactPointsList.push({
                    'ornae_id': elem.ornae_id,
                    'seq': elem.seq,
                    'contact_type': elem.contact_type,
                    'contact_meaning': elem.contact_meaning,
                    'sales_position': elem.sales_position,
                    'sales_role': elem.sales_role,
                    'enbet_typ': elem.enbet_typ,
                    'enorl_id': elem.enorl_id,
                    'mailshot_suppress_flag': elem.mailshot_suppress_flag,
                    'effective_from': elem.effective_from,
                    'effective_to': elem.effective_to,
                    'edi_nr': elem.edi_nr,
                    'fax_nr': elem.fax_nr,
                    'tel_nr_contactpoint': elem.tel_nr_contactpoint,
                    'telex_nr_contactpoint': elem.telex_nr_contactpoint,
                    'individual_name': elem.individual_name,
                    'salutat_name': elem.salutat_name,
                    'individual_lang_code': elem.individual_lang_code,
                    'individual_name_uni': elem.individual_name_uni,
                    'salutat_name_uni': elem.salutat_name_uni,
                    'email_addr': elem.email_addr,
                    'mobile_tel_nr': elem.mobile_tel_nr,
                    'tel_ind': elem.tel_ind,
                    'tel_nr': elem.tel_nr,
                    'telex_nr': elem.telex_nr,
                    'telext_nr': elem.telext_nr,
                    'first_line_name': elem.first_line_name,
                    'second_line_name': elem.second_line_name,
                    'third_line_name': elem.third_line_name,
                    'org_name_lang_code': elem.org_name_lang_code,
                    'first_line_name_uni': elem.first_line_name_uni,
                    'second_line_name_uni': elem.second_line_name_uni,
                    'third_line_name_uni': elem.third_line_name_uni,
                    'org_name_address_type': elem.org_name_address_type,
                    'first_line_street_addr': elem.first_line_street_addr,
                    'second_line_street_addr': elem.second_line_street_addr,
                    'third_line_street_addr': elem.third_line_street_addr,
                    'city_name': elem.city_name,
                    'country_id': elem.country_id,
                    'country_lang_code': elem.country_lang_code,
                    'country_name': elem.country_name,
                    'city_id': elem.city_id,
                    'post_code': elem.post_code,
                    'region_name': elem.region_name,
                    'org_address_lang_code': elem.org_address_lang_code,
                    'first_line_street_addr_uni': elem.first_line_street_addr_uni,
                    'second_line_street_addr_uni': elem.second_line_street_addr_uni,
                    'third_line_street_addr_uni': elem.third_line_street_addr_uni,
                    'city_name_uni': elem.city_name_uni,
                    'country_id_uni': elem.country_id_uni,
                    'post_code_uni': elem.post_code_uni,
                    'region_name_uni': elem.region_name_uni,
                    'edi_nr_address': elem.edi_nr_address,
                    'email_addr_address': elem.email_addr_address,
                    'fax_nr_address': elem.fax_nr_address,
                    'tel_ind_address': elem.tel_ind_address,
                    'tel_nr_address': elem.tel_nr_address,
                    'telex_nr_address': elem.telex_nr_address
                });
            });
        }
        let bankAccountsList = [];
        function processBankAccountsListResult(result) {
            bankAccountsList = [];
            result.forEach(function (elem) {
                bankAccountsList.push({
                    'org_id': elem.org_id,
                    'bank_org_id': elem.bank_org_id,
                    'org_name': elem.org_name,
                    'org_name_lang': elem.org_name_lang,
                    'bank_org_name': elem.bank_org_name,
                    'bank_org_name_lang': elem.bank_org_name_lang,
                    'bank_code': elem.bank_code,
                    'branch_nr': elem.branch_nr,
                    'bic': elem.bic,
                    'desc': elem.desc,
                    'currency_code': elem.currency_code,
                    'account_name': elem.account_name,
                    'account_nr': elem.account_nr,
                    'iban': elem.iban,
                    'ref_name': elem.ref_name,
                    'check_digits_nr': elem.check_digits_nr,
                    'primary_payable_flag': elem.primary_payable_flag,
                    'primary_receivable_flag': elem.primary_receivable_flag,
                    'effective_from': elem.effective_from,
                    'effective_to': elem.effective_to
                });
            });
        }
        let organisationRoleTypesList = [];
        function processOrganisationRoleTypesResult(result) {
            organisationRoleTypesList = [];
            result.forEach(function (elem) {
                organisationRoleTypesList.push({
                    'code': elem.code,
                    'name': elem.name,
                    'restricted': elem.restricted
                });
            })
        }
        let newPartyOverview = {};
        function processCreatePartyOverview(result) {
            newPartyOverview = {
                'party_overview_step': result.party_overview_step,
                'org_id': result.org_id,
                'org_name_addr_id': result.org_name_addr_id
            };
        
            if (result)
                if (result.message)
                    if (result.message.response)
                        if (result.message.response.data)
                            if (result.message.response.data.results) {
                                newPartyOverview = {
                                    'party_overview_step': result.message.response.data.results.party_overview_step,
                                    'org_id': result.message.response.data.results.org_id,
                                    'org_name_addr_id': result.message.response.data.results.org_name_addr_id
                                }
                            } 
                               
        }
        let newPartyAddress = {};
        function processCreatePartyAddress(result) {
            newPartyAddress = {
                'org_names_id': result.org_names_id,
                'org_name_addr_id': result.org_name_addr_id,
                'org_addr_id': result.org_addr_id
            }
        }
        let referenceDataList = [];
        function processReferenceDataListResult(result) {
            referenceDataList = [];
            result.forEach(function (elem) {
                referenceDataList.push({
                    'refdata_id': elem.id,
                    'refdata_code': elem.code,
                    'refdata_desc': elem.ref_data_value,
                    'end_date': elem.end_date
                });
            })
        }
        let newAgreementRequest = {};
        function processCreateAgreementRequest(result) {
            newAgreementRequest = {
                'agreement_request_number': result.agreement_request_number,
                'agreement_number': result.agreement_number,
                'cpdd_number': result.cpdd_number
            }
        }
        let updatedAgreementRequest = {};
        function processUpdateAgreementRequest(result) {
            updatedAgreementRequest = {
                'agreement_number': result.agreement_number,
                'cpdd_number': result.cpdd_number
            }
        }
        let agreementRequestsList = [];
        function processAgreementRequestsListResult(result) {
            agreementRequestsList = [];
            result.forEach(function (elem) {
                agreementRequestsList.push({
                    'org_id': elem.org_id,
                    'party_role_type': elem.party_role_type,
                    'recruitment_phase': elem.recruitment_phase,
                    'desc_of_business_asssessment': elem.desc_of_business_asssessment,
                    'agreement_request_number': elem.agreement_request_number,
                    'request_type': elem.request_type,
                    'request_status': elem.request_status,
                    'decisions': [
                        {
                            'decision_id': elem.decision_id,
                            'decision_type': elem.decision_type,
                            'decision_reason': elem.decision_reason,
                            'decision_comments': elem.decision_comments,
                            'decision_user_name': elem.decision_user_name,
                            'descision_user_role': elem.descision_user_role,
                            'descision_user_level': elem.descision_user_level,
                            'decision_date_time': elem.decision_date_time
                        }
                    ]
                });
            })
        }
        let intermediaryAgreementsList = [];
        function processIntermediaryAgreementsListResult(result) {
            intermediaryAgreementsList = [];
            result.forEach(function (elem) {
                intermediaryAgreementsList.push({
                    'agreement_number': elem.agreement_number,
                    'agreement_status': elem.agreement_status,
                    'agreement_version': elem.agreement_version,
                    'decision': {
                        'decision_id': elem.decision_id,
                        'decision_type': elem.decision_type,
                        'decision_reason': elem.decision_reason,
                        'decision_comments': elem.decision_comments,
                        'decision_user_name': elem.decision_user_name,
                        'descision_user_role': elem.descision_user_role,
                        'descision_user_level': elem.descision_user_level,
                        'decision_date_time': elem.decision_date_time
                    },
                    'agent_name': elem.agent_name,
                    'signature_of_agreement': elem.signature_of_agreement,
                    'effective_date_of_agreement': elem.effective_date_of_agreement,
                    'end_date_of_agreement': elem.end_date_of_agreement,
                    'next_review_date': elem.next_review_date,
                    'commission': {
                        'flat_fee_commission': {
                            'fee_with_amount': {
                                'amount': elem.amount,
                                'cur_code': elem.cur_code
                            },
                            'percentage': elem.percentage,
                            'flat_fee_start_date': elem.flat_fee_start_date,
                            'flat_fee_end_date': elem.flat_fee_end_date
                        },
                        'regular_commission': {
                            'basic_comsn_struc_id': elem.basic_comsn_struc_id,
                            'basic_effective_date': elem.basic_effective_date,
                            'basic_end_date': elem.basic_end_date,
                            'plus_comsn_struc_details': {
                                'plus_comsn_percentage': elem.plus_comsn_percentage,
                                'plus_effective_date': elem.plus_effective_date,
                                'plus_end_date': elem.plus_end_date
                            },
                            'product_comsn_struc_id': elem.product_comsn_struc_id,
                            'prod_effective_date': elem.prod_effective_date,
                            'prod_end_date': elem.prod_end_date
                        },
                    },
                    'comsn_option': {
                        'abatement_percentage': elem.abatement_percentage,
                        'end_date': elem.end_date
                    },
                    'payment_methodology': elem.payment_methodology,
                    'invoicing_type': elem.invoicing_type,
                    'automatic_comsn_payment': elem.automatic_comsn_payment
                });
            })
        }
        let counterpartyAgreementsList = [];
        function processCounterpartyAgreementsListResult(result) {
            counterpartyAgreementsList = [];
            result.forEach(function (elem) {
                counterpartyAgreementsList.push({
                    'agreement_number': elem.agreement_number,
                    'agreement_status': elem.agreement_status,
                    'agreement_version': elem.agreement_version,
                    'decision': {
                        'decision_id': elem.decision_id,
                        'decision_type': elem.decision_type,
                        'decision_reason': elem.decision_reason,
                        'decision_comments': elem.decision_comments,
                        'decision_user_name': elem.decision_user_name,
                        'descision_user_role': elem.descision_user_role,
                        'descision_user_level': elem.descision_user_level,
                        'decision_date_time': elem.decision_date_time
                    },
                    'counterparty_limit': {
                        'fee_with_amount': {
                            'amount': elem.cp_limit_amount,
                            'cur_code': elem.cp_limit_cur_code
                        },
                        'percentage': elem.cp_limit_percentage,
                        'cp_limit_effective_date': elem.cp_limit_effective_date,
                        'cp_limit_end_date': elem.cp_limit_end_date
                    },
                    'signature_of_agreement': elem.signature_of_agreement,
                    'effective_date_of_agreement': elem.effective_date_of_agreement,
                    'end_date_of_agreement': elem.end_date_of_agreement,
                    'next_review_date': elem.next_review_date,
                    'counterparty_fee': {
                        'fee_with_amount': {
                            'amount': elem.cp_fee_amount,
                            'cur_code': elem.cp_fee_cur_code
                        },
                        'percentage': elem.cp_fee_percentage
                    }
                });
            })
        }
        return {
            getCountryList: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'country_id': pageURIParams.country_id,
                    'code': pageURIParams.code,
                    'sub_code': pageURIParams.sub_code,
                    'language_code': pageURIParams.language_code,
                    'effective_from': pageURIParams.effective_from,
                    'effective_to': pageURIParams.effective_to
                }
                return evt.getServiceData(
                    'SCV2',
                    'getCountryList', serviceURIParams, {},
                    'results.countries', processCountryListResult).then(function () {
                        func ? func(countryList) : countryList;
                        observable(countryList);
                    });
            },
            getCountriesDropdown: function (observable, pageURIParams, noresStr, allStr, filter) {
                let serviceURIParams = {
                    'country_id': pageURIParams.country_id,
                    'code': pageURIParams.code,
                    'sub_code': pageURIParams.sub_code,
                    'language_code': pageURIParams.language_code,
                    'effective_from': pageURIParams.effective_from,
                    'effective_to': pageURIParams.effective_to
                }
                const dropdownFilter = filter ? filter : [];
                return ojCombo.loadCombo('SCV2', 'getCountryList',
                    {
                        value: 'country_id',
                        label: 'country_name'
                    },
                    serviceURIParams, {},
                    'results.countries', 'countries',
                    observable, dropdownFilter,
                    noresStr, allStr
                );
            },
            getRegionList: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'country_id': pageURIParams.country_id,
                    'country_code': pageURIParams.country_code,
                    'country_sub_code': pageURIParams.country_sub_code,
                    'language_code': pageURIParams.language_code,
                    'region_code': pageURIParams.region_code
                }
                return evt.getServiceData(
                    'SCV2',
                    'getRegionList', serviceURIParams, {},
                    'results.regions', processRegionListResult).then(function () {
                        func ? func(regionList) : regionList;
                        observable(regionList);
                    });
            },
            getRegionsDropdown: function (observable, pageURIParams, noresStr, allStr, filter) {
                let serviceURIParams = {
                    'country_id': pageURIParams.country_id,
                    'country_code': pageURIParams.country_code,
                    'country_sub_code': pageURIParams.country_sub_code,
                    'language_code': pageURIParams.language_code,
                    'region_code': pageURIParams.region_code
                }
                const dropdownFilter = filter ? filter : [];
                return ojCombo.loadCombo('SCV2', 'getRegionList',
                    {
                        value: 'region_code',
                        label: 'region_name'
                    },
                    serviceURIParams, {},
                    'results.regions', 'regions',
                    observable, dropdownFilter,
                    noresStr, allStr
                );
            },
            getCountriesAndCitiesNamesList: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'country_id': pageURIParams.country_id,
                    'language_code': pageURIParams.language_code,
                    'city_id': pageURIParams.city_id,
                    'validity_flag': pageURIParams.validity_flag
                }
                return evt.getServiceData(
                    'SCV2',
                    'getCountriesAndCitiesNamesList', serviceURIParams, {},
                    'results.countries_and_cities_names', processCountriesAndCitiesNamesResult).then(function () {
                        func ? func(countriesAndCitiesNamesList) : countriesAndCitiesNamesList;
                        observable(countriesAndCitiesNamesList);
                    });
            },
            getCountriesAndCitiesNamesDropdown: function (observable, pageURIParams, noresStr, allStr, filter) {
                let serviceURIParams = {
                    'country_id': pageURIParams.country_id,
                    'language_code': pageURIParams.language_code,
                    'city_id': pageURIParams.city_id,
                    'validity_flag': pageURIParams.validity_flag
                }
                const dropdownFilter = filter ? filter : [];
                return ojCombo.loadCombo('SCV2', 'getCountriesAndCitiesNamesList',
                    {
                        value: 'city_id',
                        label: 'city_name'
                    },
                    serviceURIParams, {},
                    'results.countries_and_cities_names', 'cities',
                    observable, dropdownFilter,
                    noresStr, allStr
                );
            },
            getLanguageList: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'source_lang_code': pageURIParams.source_lang_code,
                    'target_lang_code': pageURIParams.target_lang_code
                }
                return evt.getServiceData(
                    'SCV2',
                    'getLanguageList', serviceURIParams, {},
                    'results.languages_and_details', processLanguageListResult).then(function () {
                        func ? func(languageList) : languageList;
                        observable(languageList);
                    });
            },
            getCurrencyList: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'currency_code': pageURIParams.currency_code,
                    'language_code': pageURIParams.language_code,
                    'validity_flag': pageURIParams.validity_flag
                }
                return evt.getServiceData(
                    'SCV2',
                    'getCurrencyList', serviceURIParams, {},
                    'results.currencies', processCurrencyListResult).then(function () {
                        func ? func(currencyList) : currencyList;
                        observable(currencyList);
                    });
            },
            getCurrencyDropdown: function (observable, pageURIParams, noresStr, allStr, filter) {
                let serviceURIParams = {
                    'currency_code': pageURIParams.currency_code,
                    'language_code': pageURIParams.language_code,
                    'validity_flag': pageURIParams.validity_flag
                }
                const dropdownFilter = filter ? filter : [];
                return ojCombo.loadCombo('SCV2', 'getCurrencyList',
                    {
                        value: 'currency_code',
                        label: 'currency_code'
                    },
                    serviceURIParams, {},
                    'results.currencies', 'currencies',
                    observable, dropdownFilter,
                    noresStr, allStr
                );
            },
            getCountryLegalStatusList: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'country_id': pageURIParams.country_id,
                    'legal_status_code': pageURIParams.legal_status_code,
                    'local_lang_code': pageURIParams.local_lang_code,
                    'validity_flag': pageURIParams.validity_flag,
                    'effective_from': pageURIParams.effective_from,
                    'effective_to': pageURIParams.effective_to
                }
                return evt.getServiceData(
                    'SCV2',
                    'getCountryLegalStatusList', serviceURIParams, {},
                    'results.country_legal_status_list', processCountryLegalStatusListResult).then(function () {
                        func ? func(countryLegalStatusList) : countryLegalStatusList;
                        observable(countryLegalStatusList);
                    });
            },
            getSectorGroupList: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'sector_group_type': pageURIParams.sector_group_type,
                    'trade_sector_code': pageURIParams.trade_sector_code,
                    'sector_group': pageURIParams.sector_group,
                    'validity_flag': pageURIParams.validity_flag,
                    'effective_from': pageURIParams.effective_from,
                    'effective_to': pageURIParams.effective_to
                }
                return evt.getServiceData(
                    'SCV2',
                    'getSectorGroupList', serviceURIParams, {},
                    'results.sector_group_list', processSectorGroupListResult).then(function () {
                        func ? func(sectorGroupList) : sectorGroupList;
                        observable(sectorGroupList);
                    });
            },
            getSectorGroupDropdown: function (observable, pageURIParams, noresStr, allStr, filter) {
                let serviceURIParams = {
                    'sector_group_type': pageURIParams.sector_group_type,
                    'trade_sector_code': pageURIParams.trade_sector_code,
                    'sector_group': pageURIParams.sector_group,
                    'validity_flag': pageURIParams.validity_flag,
                    'effective_from': pageURIParams.effective_from,
                    'effective_to': pageURIParams.effective_to
                }
                const dropdownFilter = filter ? filter : [];
                return ojCombo.loadCombo('SCV2', 'getSectorGroupList',
                    {
                        value: 'trade_sector_code',
                        label: 'sector_group_name'
                    },
                    serviceURIParams, {},
                    'results.sector_group_list', 'partyDropdowns',
                    observable, dropdownFilter,
                    noresStr, allStr
                );
            },
            getCGRefCodeDataList: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'domain': pageURIParams.domain,
                    'low_value': pageURIParams.low_value,
                    'high_value': pageURIParams.high_value,
                    'language_code': pageURIParams.language_code
                }
                return evt.getServiceData(
                    'SCV2',
                    'getCGRefCodeDataList', serviceURIParams, {},
                    'results.cg_ref_codes', processCGRefCodeDataListResult).then(function () {
                        func ? func(cGRefCodeDataList) : cGRefCodeDataList;
                        observable(cGRefCodeDataList);
                    });
            },
            getCGRefCodeDataDropdown: function (observable, pageURIParams, noresStr, allStr, filter) {
                let serviceURIParams = {
                    'domain': pageURIParams.domain,
                    'low_value': pageURIParams.low_value,
                    'high_value': pageURIParams.high_value,
                    'language_code': pageURIParams.language_code
                }
                const dropdownFilter = filter ? filter : [];
                return ojCombo.loadCombo('SCV2', 'getCGRefCodeDataList',
                    {
                        value: 'low_value',
                        label: 'meaning'
                    },
                    serviceURIParams, {},
                    'results.cg_ref_codes', 'partyDropdowns',
                    observable, dropdownFilter,
                    noresStr, allStr
                );
            },
            getCountryDefaultsList: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'identifier': pageURIParams.identifier,
                    'languageCode': pageURIParams.languageCode
                }
                return evt.getServiceData(
                    'SCV2',
                    'getCountryDefaultsList', serviceURIParams, {},
                    'results', processCountryDefaultsListResult).then(function () {
                        func ? func(countryDefaultsList) : countryDefaultsList;
                        observable(countryDefaultsList);
                    });
            },
            searchOrganisation: function (pageURIParams, observable, func) {
                let serviceURIParams = {
                    country_id: pageURIParams.country_id,
                    'org_name': pageURIParams.org_name,
                    'address': pageURIParams.address,
                    'city_id': pageURIParams.city_id,
                    'city_name': pageURIParams.city_name,
                    'region_name': pageURIParams.region_name,
                    'post_code': pageURIParams.post_code,
                    'co_registered_nr': pageURIParams.co_registered_nr,
                    'vat_nr': pageURIParams.vat_nr,
                    'org_id': pageURIParams.org_id,
                    'org_role_type': pageURIParams.org_role_type,
                    'other_system_ref_nr': pageURIParams.other_system_ref_nr,
                    'other_system_ref_type': pageURIParams.other_system_ref_type,
                    'interface_type': pageURIParams.interface_type,
                    'include_historic': pageURIParams.include_historic,
                    'include_bip_search': pageURIParams.include_bip_search,
                    'exclude_inactive': pageURIParams.exclude_inactive,
                    'tel_nr': pageURIParams.tel_nr,
                    'complete_search_flag': pageURIParams.complete_search_flag
                }
                return evt.getServiceData(
                    'SCV2',
                    'searchOrganisation', serviceURIParams, {},
                    'results.organisations', processOrganisationListResult).then(function (data) {
                        func ? func(organisationList) : organisationList;
                        observable(organisationList);

                        return data;
                    });
            },
            getOrganisation: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'org_id': pageURIParams.org_id,
                    'local_lang_code': pageURIParams.local_lang_code,
                    'address_type': pageURIParams.address_type,
                    'effective_from': pageURIParams.effective_from,
                    'effective_to': pageURIParams.effective_to
                }
                return evt.getServiceData(
                    'SCV2',
                    'getOrganisation', serviceURIParams, {},
                    'results.organisation', processOrganisation).then(function () {
                        func ? func(organisation) : organisation;
                        observable(organisation);
                    });
            },
            getOrganisationExternalIdentifiers: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'org_id': pageURIParams.org_id,
                    'system_code': pageURIParams.system_code,
                    'master_ind': pageURIParams.master_ind,
                    'language_code': pageURIParams.language_code,
                    'effective_from': pageURIParams.effective_from,
                    'effective_to': pageURIParams.effective_to
                }
                return evt.getServiceData(
                    'SCV2',
                    'getOrganisationExternalIdentifiers', serviceURIParams, {},
                    'results.organisation_ext_identifiers', processOrganisationExtIdListResult).then(function () {
                        func ? func(organisationExtIdList) : organisationExtIdList;
                        observable(organisationExtIdList);
                    });
            },
            getOrganisationRoles: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'org_id': pageURIParams.org_id,
                    'role_type': pageURIParams.role_type,
                    'effective_from': pageURIParams.effective_from,
                    'effective_to': pageURIParams.effective_to
                }
                return evt.getServiceData(
                    'SCV2',
                    'getOrganisationRoles', serviceURIParams, {},
                    'results.organisation_roles', processOrganisationRolesListResult).then(function () {
                        func ? func(organisationRolesList) : organisationRolesList;
                        observable(organisationRolesList);
                    });
            },
            getOrganisationDetails: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'org_id': pageURIParams.org_id,
                    'effective_from': pageURIParams.effective_from,
                    'effective_to': pageURIParams.effective_to
                }
                return evt.getServiceData(
                    'SCV2',
                    'getOrganisationDetails', serviceURIParams, {},
                    'results.organisation_details', processOrganisationDetailsListResult).then(function () {
                        func ? func(organisationDetailsList) : organisationDetailsList;
                        observable(organisationDetailsList);
                    });
            },
            getIndividuals: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'org_id': pageURIParams.org_id,
                    'individualType': pageURIParams.individual_type_flag,
                    'individual_id': pageURIParams.individual_id,
                    'local_lang_code': pageURIParams.local_lang_code,
                    'effective_from': pageURIParams.effective_from,
                    'effective_to': pageURIParams.effective_to
                }
                return evt.getServiceData(
                    'SCV2',
                    'getIndividuals', serviceURIParams, {},
                    'results.individuals', processIndividualsListResult).then(function () {
                        func ? func(individualsList) : individualsList;
                        observable(individualsList);
                    });
            },
            getIndividualDetails: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'individual_id': pageURIParams.individual_id
                }
                return evt.getServiceData(
                    'SCV2',
                    'getIndividualDetails', serviceURIParams, {},
                    'individual_details', processIndividualDetailsListResult).then(function () {
                        func ? func(individualDetailsList) : individualDetailsList;
                        observable(individualDetailsList);
                    });
            },
            getFinancials: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'org_id': pageURIParams.org_id,
                    'language_code': pageURIParams.language_code,
                    'balance_sheet_date': pageURIParams.balance_sheet_date,
                    'report_status': pageURIParams.report_status,
                    'report_type': pageURIParams.report_type
                }
                return evt.getServiceData(
                    'SCV2',
                    'getFinancials', serviceURIParams, {},
                    'results.financials', processFinancialsListResult).then(function () {
                        func ? func(financialsList) : financialsList;
                        observable(financialsList);
                    });
            },
            getOrganisationSectors: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'org_id': pageURIParams.org_id,
                    'language_code': pageURIParams.language_code,
                    'main_flag': pageURIParams.main_flag,
                    'effective_from': pageURIParams.effective_from,
                    'effective_to': pageURIParams.effective_to
                }
                return evt.getServiceData(
                    'SCV2',
                    'getOrganisationSectors', serviceURIParams, {},
                    'results.organisation_sectors', processOrganisationSectorsListResult).then(function () {
                        func ? func(organisationSectorsList) : organisationSectorsList;
                        observable(organisationSectorsList);
                    });
            },
            getOrganisationContactPoints: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'org_id': pageURIParams.org_id,
                    'individual_type_flag': pageURIParams.individual_type_flag,
                    'contact_type': pageURIParams.contact_type,
                    'local_lang_code': pageURIParams.local_lang_code,
                    'effective_from': pageURIParams.effective_from,
                    'effective_to': pageURIParams.effective_to
                }
                return evt.getServiceData(
                    'SCV2',
                    'getOrganisationContactPoints', serviceURIParams, {},
                    'results.organisation_contact_points', processOrganisationContactPointsListResult).then(function () {
                        func ? func(organisationContactPointsList) : organisationContactPointsList;
                        observable(organisationContactPointsList);
                    });
            },
            getBankAccounts: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'org_id': pageURIParams.org_id,
                    'language_code': pageURIParams.language_code,
                    'effective_from': pageURIParams.effective_from,
                    'effective_to': pageURIParams.effective_to,
                    'primary_payable_flag': pageURIParams.primary_payable_flag,
                    'primary_receivable_flag': pageURIParams.primary_receivable_flag
                }
                //results.organisation_bank_accounts
                return evt.getServiceData(
                    'SCV2',
                    'getBankAccounts', serviceURIParams, {},
                    'results.bank_accounts', processBankAccountsListResult).then(function () {
                        func ? func(bankAccountsList) : bankAccountsList;
                        observable(bankAccountsList);
                        return bankAccountsList;
                    });
            },
            getOrganisationRoleTypes: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'role_type': pageURIParams.role_type
                }
                return evt.getServiceData(
                    'SCV2',
                    'getOrganisationRoleTypes', serviceURIParams, {},
                    'results.organisation_role_types', processOrganisationRoleTypesResult).then(function () {
                        func ? func(organisationRoleTypesList) : organisationRoleTypesList;
                        observable(organisationRoleTypesList);
                    });
            },
            getOrganisationRoleTypesDropdown: function (observable, pageURIParams, noresStr, allStr, filter) {
                let serviceURIParams = {
                    'role_type': pageURIParams.role_type
                }
                const dropdownFilter = filter ? filter : [];
                return ojCombo.loadCombo('SCV2', 'getOrganisationRoleTypes',
                    {
                        value: 'code',
                        label: 'name'
                    },
                    serviceURIParams, {},
                    'results.organisation_role_types', 'partyDropdowns',
                    observable, dropdownFilter,
                    noresStr, allStr
                );
            },
            createPartyOverview: function (observable, pageDataParams, func) {
                function processTradeSector() {
                    let array = [];
                    pageDataParams.trade_sector_details.forEach(function (elem) {
                        array.push({
                            'main_flag': elem.main_flag,
                            'nace_code': elem.nace_code
                        });
                    });
                    return array;
                }
                let serviceDataParams = {
                    'party_overview_step': pageDataParams.party_overview_step,
                    'org_id': pageDataParams.org_id,
                    'org_name_addr_id': pageDataParams.org_name_addr_id,
                    'org_details': {
                        'country_of_origin_name': pageDataParams.org_details.country_of_origin_name,
                        'country_of_origin_id': pageDataParams.org_details.country_of_origin_id,
                        'currency_code': pageDataParams.org_details.currency_code,
                        'language_code': pageDataParams.org_details.language_code,
                        'party_type': pageDataParams.org_details.party_type,
                        'legal_form_type': pageDataParams.org_details.legal_form_type,
                        'legal_form_description': pageDataParams.org_details.legal_form_description,
                        'public_organization': pageDataParams.org_details.public_organization,
                        'company_name': pageDataParams.org_details.company_name,
                        'vat': pageDataParams.org_details.vat,
                        'company_registration_number': pageDataParams.org_details.company_registration_number,
                        'address': pageDataParams.org_details.address,
                        'post_code': pageDataParams.org_details.post_code,
                        'address_city_name': pageDataParams.org_details.address_city_name,
                        'address_city_id': pageDataParams.org_details.address_city_id,
                        'foundation_date': pageDataParams.org_details.foundation_date,
                        'employee_count': pageDataParams.org_details.employee_count
                    },
                    'physical_person_details': {
                        // THOR
                        // 'personal_title': 'Mr',
                        // 'gender': 'M',
                        'personal_title': pageDataParams.physical_person_details.personal_title,
                        'gender': pageDataParams.physical_person_details.gender,
                        'name': pageDataParams.physical_person_details.name,
                        'surname': pageDataParams.physical_person_details.surname,
                        'date_of_birth': pageDataParams.physical_person_details.date_of_birth,
                        'country_of_birth_name': pageDataParams.physical_person_details.country_of_birth_name,
                        'country_of_birth_id': pageDataParams.physical_person_details.country_of_birth_id,
                        'city_of_birth_name': pageDataParams.physical_person_details.city_of_birth_name,
                        'city_of_birth_id': pageDataParams.physical_person_details.city_of_birth_id,
                        'contact_type': 'PRIP'
                    },
                    'fiscal_code': pageDataParams.fiscal_code,
                    'trade_sector_details': processTradeSector()
                }
                ojet.removeObjectFields(serviceDataParams);
                if (pageDataParams.org_details.party_type === 'Legal Person') {
                    delete serviceDataParams.physical_person_details;
                }
                if (pageDataParams.org_details.party_type === 'Physical Person') {
                    delete serviceDataParams.trade_sector_details;
                }
                return evt.getServiceData(
                    'SCV2',
                    'createPartyOverview', {}, serviceDataParams,
                    'results', processCreatePartyOverview).then(function () {
                        func ? func(newPartyOverview) : newPartyOverview;
                        observable(newPartyOverview);
                    }).catch(function (message) {
                        processCreatePartyOverview(message);
                        func ? func(newPartyOverview) : newPartyOverview;
                        observable(newPartyOverview)
                    });
            },
            createPartyAddress: function (observable, pageDataParams, func) {
                let serviceDataParams = {
                    'org_id': pageDataParams.org_id,
                    'first_line_name': pageDataParams.first_line_name,
                    'second_line_name': null,
                    'third_line_name': null,
                    'org_name_id': 0,
                    'org_addr_id': 0,
                    'address_type': pageDataParams.address_type,
                    'first_line_street_addr': pageDataParams.first_line_street_addr,
                    'city_id': pageDataParams.city_id,
                    'city_name': pageDataParams.city_name,
                    'third_line_street_addr': null,
                    'fax_nr': null,
                    'edi_nr': null,
                    'region_name': null,
                    'post_code': pageDataParams.post_code,
                    'second_line_street_addr': null,
                    'telex_nr': null,
                    'tel_nr': null,
                    'email_addr': null,
                    'tel_ind': null
                }
                return evt.getServiceData(
                    'SCV2',
                    'createPartyAddress', {}, serviceDataParams,
                    '', processCreatePartyAddress).then(function () {
                        func ? func(newPartyAddress) : newPartyAddress;
                        observable(newPartyAddress);
                    });
            },
            createPartyContact: function (pageDataParams) {
                let serviceDataParams = {
                    'org_id': pageDataParams.org_id,
                    'name': pageDataParams.name,
                    'surname': pageDataParams.surname,
                    'individual_type_flag': pageDataParams.individual_type_flag,
                    'org_name_addr_id': pageDataParams.org_name_addr_id,
                    'role_covered': pageDataParams.role_covered,
                    'contact_type': pageDataParams.contact_type,
                    'phone': pageDataParams.phone,
                    'fax': pageDataParams.fax
                }
                return evt.getServiceData(
                    'SCV2',
                    'createPartyContact', {}, serviceDataParams,
                    '', true);
            },
            createPartyPayment: function (pageDataParams) {
                let serviceDataParams = {
                    'org_id': pageDataParams.org_id,
                    'payment_type': pageDataParams.payment_type,
                    'main': pageDataParams.main,
                    'bank_org_id': pageDataParams.bank_org_id,
                    'bank_account_name': pageDataParams.bank_account_name,
                    'bank_account_number': pageDataParams.bank_account_number,
                    'iban': pageDataParams.iban,
                    'check_digit': pageDataParams.check_digit,
                    'bank_account_owner': pageDataParams.bank_account_owner,
                    'currency_code': pageDataParams.currency_code
                }
                return evt.getServiceData(
                    'SCV2',
                    'createPartyPayment', {}, serviceDataParams,
                    '', true);
            },
            getReferenceData: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'refdata_list_code': pageURIParams.refdata_list_code
                }
                return evt.getServiceData(
                    'SCV2',
                    'getReferenceData', serviceURIParams, {},
                    'referencedatalist', processReferenceDataListResult).then(function () {
                        func ? func(referenceDataList) : referenceDataList;
                        observable(referenceDataList);
                    });
            },
            getReferenceDataDropdown: function (observable, pageURIParams, noresStr, allStr, filter) {
                let serviceURIParams = {
                    'refdata_list_code': pageURIParams.refdata_list_code
                }
                const dropdownFilter = filter ? filter : [];
                return ojCombo.loadCombo('SCV2', 'getReferenceData',
                    {
                        value: 'refdata_code',
                        label: 'refdata_desc'
                    },
                    serviceURIParams, {},
                    'referencedatalist', 'partyDropdowns',
                    observable, dropdownFilter,
                    noresStr, allStr
                );
            },
            /**
             * Functions to support createAgreementRequest and updateAgreementRequest
             */
            // Flat Fee Option
            processflatFeeOptionFunc: function processflatFeeOption(pageDataParams) {
                let flatFeeOptionObj = {};
                if (pageDataParams.flatFeeOptionFlag)
                    flatFeeOptionObj = {
                        'fee_with_amount': {
                            'amount': pageDataParams.flat_fee_amount,
                            'cur_code': pageDataParams.flat_fee_cur_code
                        },
                        'flat_fee_start_date': pageDataParams.flat_fee_start_date,
                        'flat_fee_end_date': pageDataParams.flat_fee_end_date
                    }
                else
                    flatFeeOptionObj = {
                        'percentage': pageDataParams.flat_fee_percentage,
                        'flat_fee_start_date': pageDataParams.flat_fee_start_date,
                        'flat_fee_end_date': pageDataParams.flat_fee_end_date
                    }
                return flatFeeOptionObj;
            },
            // Counterparty Limit Option
            processCpLimitOptionFunc: function processCpLimitOption(pageDataParams) {
                let cpLimitOptionObj = {};
                if (pageDataParams.cpLimitOptionFlag)
                    cpLimitOptionObj = {
                        'fee_with_amount': {
                            'amount': pageDataParams.cp_limit_amount,
                            'cur_code': pageDataParams.cp_limit_cur_code
                        },
                        'cp_limit_effective_date': pageDataParams.cp_limit_effective_date,
                        'cp_limit_end_date': pageDataParams.cp_limit_end_date
                    }
                else
                    cpLimitOptionObj = {
                        'percentage': pageDataParams.cp_limit_percentage,
                        'cp_limit_effective_date': pageDataParams.cp_limit_effective_date,
                        'cp_limit_end_date': pageDataParams.cp_limit_end_date
                    }
                return cpLimitOptionObj;
            },
            // Counterparty Fee Option
            processCpFeeOptionFunc: function processCpFeeOption(pageDataParams) {
                let cpFeeOptionObj = {};
                if (pageDataParams.cpFeeOptionFlag)
                    cpFeeOptionObj = {
                        'fee_with_amount': {
                            'amount': pageDataParams.cp_fee_amount,
                            'cur_code': pageDataParams.cp_fee_cur_code
                        }
                    }
                else
                    cpFeeOptionObj = {
                        'percentage': pageDataParams.cp_fee_percentage
                    }
                return cpFeeOptionObj;
            },
            // Commission Option
            processCommissionOptionFunc: function processCommissionOption(pageDataParams) {
                let commissionOptionObj = {};
                if (pageDataParams.commissionOptionFlag)
                    commissionOptionObj = {
                        'flat_fee_commission': processflatFeeOptionFunc(pageDataParams)
                    }
                else
                    commissionOptionObj = {
                        'regular_commission': {
                            'basic_comsn_struc_id': pageDataParams.basic_comsn_struc_id,
                            'basic_effective_date': pageDataParams.basic_effective_date,
                            'basic_end_date': pageDataParams.basic_end_date,
                            'plus_comsn_struc_details': {
                                'plus_comsn_percentage': pageDataParams.plus_comsn_percentage,
                                'plus_effective_date': pageDataParams.plus_effective_date,
                                'plus_end_date': pageDataParams.plus_end_date
                            },
                            'product_comsn_struc_id': pageDataParams.product_comsn_struc_id,
                            'prod_effective_date': pageDataParams.prod_effective_date,
                            'prod_end_date': pageDataParams.prod_end_date
                        }
                    }
                return commissionOptionObj;
            },
            // Agreement Option
            processAgreementOptionFunc: function processAgreementOption(pageDataParams) {
                let agreementOptionObj = {};
                if (pageDataParams.agreementOptionFlag)
                    agreementOptionObj = {
                        'intermediary_agreement': {
                            'action_on_agreement': pageDataParams.action_on_agreement,
                            'int_agreement_details': {
                                'agent_name': pageDataParams.agent_name,
                                'signature_of_agreement': pageDataParams.signature_of_agreement,
                                'effective_date_of_agreement': pageDataParams.effective_date_of_agreement,
                                'end_date_of_agreement': pageDataParams.end_date_of_agreement,
                                'next_review_date': pageDataParams.next_review_date,
                                'commission': processCommissionOptionFunc(pageDataParams),
                                'comsn_option': {
                                    'abatement_percentage': pageDataParams.abatement_percentage,
                                    'end_date': pageDataParams.end_date
                                },
                                'payment_methodology': pageDataParams.payment_methodology,
                                'invoicing_type': pageDataParams.invoicing_type,
                                'automatic_comsn_payment': pageDataParams.automatic_comsn_payment
                            }
                        }
                    }
                else
                    agreementOptionObj = {
                        'counter_party_agreement': {
                            'action_on_agreement': pageDataParams.action_on_agreement,
                            'cp_agreement_details': {
                                'counterparty_limit': processCpLimitOptionFunc(pageDataParams),
                                'signature_of_agreement': pageDataParams.signature_of_agreement,
                                'effective_date_of_agreement': pageDataParams.effective_date_of_agreement,
                                'end_date_of_agreement': pageDataParams.end_date_of_agreement,
                                'next_review_date': pageDataParams.next_review_date,
                                'counterparty_fee': processCpFeeOptionFunc(pageDataParams)
                            }
                        }
                    }
                return agreementOptionObj;
            },
            //
            processCreateAgreementActionDecisionOptionFunc: function processCreateAgreementActionDecisionOption(pageDataParams, authResponse) {
                if (pageDataParams.createAgreementActDecOptionFlag)
                    self.serviceDataParamsCreateAgreement.action = {
                        'action_type': pageDataParams.action_type,
                        'task_context': {
                            'task_id': authResponse.task_id,
                            'token': authResponse.token,
                            'locale': authResponse.locale
                        }
                    }
                else
                    self.serviceDataParamsCreateAgreement.decision = {
                        'decision_type': pageDataParams.decision_type,
                        'decision_reason': pageDataParams.decision_reason,
                        'decision_comments': pageDataParams.decision_comments,
                        'decision_user_name': pageDataParams.decision_user_name,
                        'descision_user_role': pageDataParams.descision_user_role,
                        'descision_user_level': pageDataParams.descision_user_level,
                        'decision_date_time': pageDataParams.decision_date_time
                    }
            },
            //
            processUpdateAgreementActionDecisionOptionFunc: function processUpdateAgreementActionDecisionOption(pageDataParams, authResponse) {
                if (pageDataParams.updateAgreementActDecOptionFlag)
                    self.serviceDataParamsUpdateAgreement.action = {
                        'action_type': pageDataParams.action_type,
                        'task_context': {
                            'task_id': authResponse.task_id,
                            'token': authResponse.token,
                            'locale': authResponse.locale
                        }
                    }
                else
                    self.serviceDataParamsUpdateAgreement.decision = {
                        'decision_details': {
                            'decision_type': pageDataParams.decision_type,
                            'decision_reason': pageDataParams.decision_reason,
                            'decision_comments': pageDataParams.decision_comments,
                            'decision_user_name': pageDataParams.decision_user_name,
                            'descision_user_role': pageDataParams.descision_user_role,
                            'descision_user_level': pageDataParams.descision_user_level,
                            'decision_date_time': pageDataParams.decision_date_time
                        },
                        'task_context': {
                            'task_id': authResponse.task_id,
                            'token': authResponse.token,
                            'locale': authResponse.locale
                        }
                    }
            },
            /**
             *
             */
            createAgreementRequest: function (observable, pageDataParams, authResponse, func) {
                self.serviceDataParamsCreateAgreement = {
                    'request': {
                        'org_id': pageDataParams.org_id,
                        'party_role_type': pageDataParams.party_role_type,
                        'recruitment_phase': pageDataParams.recruitment_phase,
                        'desc_of_business_assessment': pageDataParams.desc_of_business_asssessment
                    },
                    'agreement': processAgreementOptionFunc(pageDataParams, authResponse),
                    'cpdd': {
                        'cpdd_number': pageDataParams.cpdd_number,
                        'cpdd_performed_on_date': pageDataParams.cpdd_performed_on_date,
                        'cpdd_next_review_date': pageDataParams.cpdd_next_review_date,
                        'cpdd_outcome': pageDataParams.cpdd_outcome,
                        'cpdd_remarks': pageDataParams.cpdd_remarks
                    }
                }
                return evt.getServiceData(
                    'SCV2',
                    'createAgreementRequest', {}, self.serviceDataParamsCreateAgreement,
                    '', processCreateAgreementRequest).then(function () {
                        processCreateAgreementActionDecisionOptionFunc(pageDataParams, authResponse);
                        func ? func(newAgreementRequest) : newAgreementRequest;
                        observable(newAgreementRequest);
                    });
            },
            updateAgreementRequest: function (observable, pageDataParams, authResponse, func) {
                self.serviceDataParamsUpdateAgreement = {
                    'task_context': {
                        'task_id': authResponse.task_id,
                        'token': authResponse.token,
                        'locale': authResponse.locale
                    },
                    'request': {
                        'org_id': pageDataParams.org_id,
                        'party_role_type': pageDataParams.party_role_type,
                        'recruitment_phase': pageDataParams.recruitment_phase,
                        'desc_of_business_assessment': pageDataParams.desc_of_business_asssessment
                    },
                    'agreement': processAgreementOptionFunc(),
                    'cpdd': {
                        'cpdd_number': pageDataParams.cpdd_number,
                        'cpdd_performed_on_date': pageDataParams.cpdd_performed_on_date,
                        'cpdd_next_review_date': pageDataParams.cpdd_next_review_date,
                        'cpdd_outcome': pageDataParams.cpdd_outcome,
                        'cpdd_remarks': pageDataParams.cpdd_remarks
                    }
                }
                return evt.getServiceData(
                    'SCV2',
                    'updateAgreementRequest', {}, serviceDataParamsUpdateAgreement,
                    '', processUpdateAgreementRequest).then(function () {
                        processUpdateAgreementActionDecisionOptionFunc();
                        func ? func(updatedAgreementRequest) : updatedAgreementRequest;
                        observable(updatedAgreementRequest);
                    });
            },
            getAgreementRequests: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'org_id': pageURIParams.org_id,
                    'agreement_request_number': pageURIParams.agreement_request_number,
                    'request_status': pageURIParams.request_status,
                    'request_type': pageURIParams.request_type,
                    'party_role_type': pageURIParams.party_role_type
                }
                return evt.getServiceData(
                    'SCV2',
                    'getAgreementRequests', serviceURIParams, {},
                    'results.agreement_requests', processAgreementRequestsListResult).then(function () {
                        func ? func(agreementRequestsList) : agreementRequestsList;
                        observable(agreementRequestsList);
                    });
            },
            getIntermediaryAgreements: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'org_id': pageURIParams.org_id,
                    'agreement_request_number': pageURIParams.agreement_request_number,
                    'intermediary_agreement_number': pageURIParams.intermediary_agreement_number,
                    'party_role_type': pageURIParams.party_role_type,
                    'agreement_status': pageURIParams.agreement_status,
                    'effective_date_of_agreement': pageURIParams.effective_date_of_agreement,
                    'end_date_of_agreement': pageURIParams.end_date_of_agreement
                }
                return evt.getServiceData(
                    'SCV2',
                    'getIntermediaryAgreements', serviceURIParams, {},
                    'results.intermediary_agreements', processIntermediaryAgreementsListResult).then(function () {
                        func ? func(intermediaryAgreementsList) : intermediaryAgreementsList;
                        observable(intermediaryAgreementsList);
                    });
            },
            getCounterpartyAgreements: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'org_id': pageURIParams.org_id,
                    'agreement_request_number': pageURIParams.agreement_request_number,
                    'counterparty_agreement_id': pageURIParams.intermediary_agreement_number,
                    'party_role_type': pageURIParams.party_role_type,
                    'agreement_status': pageURIParams.agreement_status,
                    'effective_date_of_agreement': pageURIParams.effective_date_of_agreement,
                    'end_date_of_agreement': pageURIParams.end_date_of_agreement
                }
                return evt.getServiceData(
                    'SCV2',
                    'getCounterpartyAgreements', serviceURIParams, {},
                    'results.counter_party_agreements', processCounterpartyAgreementsListResult).then(function () {
                        func ? func(counterpartyAgreementsList) : counterpartyAgreementsList;
                        observable(counterpartyAgreementsList);
                    });
            }
        }
    }
);
