define([],
    function () {
        let refdataList = [];
        let cudObservable = {};

        function processGet(list) {
            refdataList = [];
            if (!$.isEmptyObject(list)) {
                list.forEach(function (elem) {
                    refdataList.push({
                        'refdata_id': elem.id,
                        'refdata_code': elem.code,
                        'refdata_desc': elem.ref_data_value,
                        'end_date': elem.end_date
                    });
                });
            }
        }

        function processCUD(obj) {
            cudObservable = {
                'reference_data_id': obj.data.reference_data_id
            };
        }
        return {
            getReferenceData: function (observable, pageUriParams, func) {
                let serviceUriParams = {
                    'refdata_list_id': pageUriParams.refdata_list_id,
                    'refdata_code': pageUriParams.refdata_code,
                    'language_code': pageUriParams.language_code,
                    'start_date': pageUriParams.start_date,
                    'end_date': pageUriParams.end_date,
                    'show_non_active': pageUriParams.show_non_active
                }
                return evt.getServiceData('RD', 'getReferenceData', serviceUriParams, {}, 'message.data.listreferencedata',
                    processGet).then(function () {
                    func ? func(refdataList) : refdataList;
                    observable(refdataList);
                });
            },
            getReferenceDataDropdown: function (observable, pageUriParams, noresStr, allStr) {
                let serviceUriParams = {
                    'refdata_list_id': pageUriParams.refdata_list_id,
                    'show_non_active': pageUriParams.show_non_active,
                    'language_code': pageUriParams.language_code
                }
                return ojCombo.loadCombo('RD', 'getReferenceData', {
                        value: 'id',
                        label: 'ref_data_value'
                    }, serviceUriParams, {}, 'message.data.listreferencedata',
                    'refdataNames', observable, [], noresStr, allStr);
            },
            createReferenceData: function (observable, pageUriParams, dataParams) {
                let serviceUriParams = {
                    'refdata_list_id': pageUriParams.refdata_list_id
                }
                let service_admin_regions = [];
                let service_translations = [];
                dataParams.listadminregions.forEach(function (elem) {
                    service_admin_regions.push({
                        'id': elem.country_id
                    });
                });
                dataParams.translations.forEach(function (elem) {
                    service_translations.push({
                        'language_code': elem.language_code,
                        'ref_data_value': elem.translation_desc
                    });
                });
                return evt.getServiceData('RD', 'createReferenceData', serviceUriParams, {
                        'refdata': {
                            "code": dataParams.refdata.code
                        },
                        'countries': service_admin_regions,
                        'translations': service_translations
                    },
                    'message', processCUD).then(function () {
                        observable(cudObservable.reference_data_id);
                    });
            },
            updateCountriesReferenceData: function (pageUriParams, dataParams) {
                let serviceUriParams = {
                    refdata_id: pageUriParams.refdata_id
                }
                let service_admin_regions = [];
                dataParams.admin_regions.forEach(function (elem) {
                    service_admin_regions.push({
                        'id': elem.country_id,
                        'change_operation': elem.change_operation
                    });
                });
                return evt.getServiceData('RD', 'updateCountriesReferenceData', serviceUriParams, {
                        'countries': service_admin_regions
                    },
                    'message', true);
            },
            updateTranslationsReferenceData: function (pageUriParams, dataParams) {
                let serviceUriParams = {
                    refdata_id: pageUriParams.refdata_id
                }
                let service_translations = [];
                dataParams.translations.forEach(function (elem) {
                    service_translations.push({
                        'language_code': elem.language_code,
                        'ref_data_value': elem.translation_desc,
                        'change_operation': elem.change_operation
                    });
                });
                return evt.getServiceData('RD', 'updateTranslationsReferenceData', serviceUriParams, {
                        'translations': service_translations
                    },
                    'message', true);
            },
            deleteReferenceData: function (pageUriParams, dataParams) {
                let serviceUriParams = {
                    'refdata_list_id': pageUriParams.refdata_list_id
                }
                let delete_list = [];
                dataParams.refdata_id_list.forEach(function (elem) {
                    delete_list.push({
                        'refdata_id': elem.refdata_id
                    });
                });

                return evt.getServiceData('RD', 'deleteReferenceData', serviceUriParams, {
                    'refdata_id_list': delete_list
                }, 'message', true);
            }
        }
    });
