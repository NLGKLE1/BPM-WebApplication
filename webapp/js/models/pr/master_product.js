define([],
    function () {
        let masterProdList = [];

        function processSearchMasterProducts(resp) {
            masterProdList = [];
            resp.forEach(function (masterprod) {
                masterProdList.push({
                    "masterprodid": masterprod.id,
                    "masterprodversion": masterprod.version,
                    "masterprodcode": masterprod.code,
                    "masterprodname": masterprod.name,

                    "prodclassid": masterprod.product_class_id,
                    "prodclassversion": masterprod.product_class_version,
                    "prodclassname": masterprod.product_class_name,

                    "statusid": masterprod.status_id,
                    "statuscode": masterprod.status_code,
                    "statusvalue": masterprod.status_value,

                    "name_translation_id": masterprod.name_translation_id,
                    "language_code": masterprod.language_code,
                    "translation_id": masterprod.translation_id
                });
            });
        }

        let comboList = [];
        function processMasterProductCombo(resp, labelField, idOnly) {
            comboList = [];
            resp.forEach(function (masterprod) {
                if (masterprod.value === 0) {
                    comboList.push(masterprod);
                } else {
                    comboList.push({
                        'value': idOnly ? masterprod.additional.id : masterprod.additional.id + '_' + masterprod.additional.version,
                        'label': (masterprod.additional[labelField]),
                        'prodclasspair': masterprod.additional.product_class_id + '_' + masterprod.additional.product_class_version,
                        'masterprodpair': masterprod.additional.id + '_' + masterprod.additional.version,
                        "masterprodid": masterprod.additional.id,
                        "masterprodversion": masterprod.additional.version,
                        "masterprodcode": masterprod.additional.code,
                        "masterprodname": masterprod.additional.name,
                        "prodclassid": masterprod.additional.product_class_id,
                        "prodclassversion": masterprod.additional.product_class_version,
                        "prodclassname": masterprod.additional.product_class_name,
                        "statusid": masterprod.additional.status_id,
                        "statuscode": masterprod.additional.status_code,
                        "statusvalue": masterprod.additional.status_value,
                        "name_translation_id": masterprod.additional.name_translation_id,
                        "language_code": masterprod.additional.language_code,
                        "translation_id": masterprod.additional.translation_id
                    })
                }
            });
        }

        let masterprod = {};

        function processMasterProduct(response) {
            let resp = response[0];
            masterprod = {
                "masterprodid": resp.id,
                "masterprodversion": resp.version,
                "masterprodcode": resp.code,
                "name_translation_id": resp.name_translation_id,
                "masterprodname": resp.name,
                "description_translation_id": resp.description_translation_id,
                "masterproddescription": resp.description,
                "commentslistid": resp.comment_list_id,


                "prodclassid": resp.product_class_id,
                "prodclassversion": resp.product_class_version,
                "prodclasscode": resp.product_class_code,
                "prodclassname": resp.product_class_name,

                "statusid": resp.status_id,
                "statuscode": resp.status_code,
                "statusvalue": resp.status_value,

                "creationdate": resp.creation_date,
                "creationusername": resp.creation_user,
                "activationdate": resp.activation_date,
                "migrationdate": resp.migration_date,
                "suspensiondate": resp.suspension_date,
                "enddate": resp.close_date,
                "changedate": resp.change_date,
                "changeusername": resp.change_user,
                "legacysystem": resp.legacysystem,
                "language_code": resp.language_code
            }
        }

        let newmasterprod = {};

        function processMasterProdProcess(resp) {
            newmasterprod = {
                'masterprodid': resp.id,
                'masterprodversion': resp.version,
                'commentlistid': resp.comment_list_id
            }
        }

        return {
            // pageURIParams: masterprodid, masterprodname, prodclassid, prodclassversion, statuscodelist, languagecode
            searchMasterProducts: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    id: pageURIParams.masterprodid,
                    name: pageURIParams.masterprodname,
                    product_class_id: pageURIParams.prodclassid,
                    product_class_version: pageURIParams.prodclassversion,
                    status: pageURIParams.statusvalue,
                    language_code: pageURIParams.language_code
                };
                return evt.getServiceData(
                    'PR',
                    'getSearchMasterProducts', serviceURIParams, {}, 'message.data.master_product_list', processSearchMasterProducts).then(function () {
                        func ? func(masterProdList) : masterProdList;
                        observable(masterProdList);
                    });
            },
            getMasterProductsDropdown: function (observable, label, noresStr, allStr, filter, idOnly) {
                const labelField = label === 'code' ? 'code' : 'name';
                const ojComboName = label === 'code' ? 'masterProductCode' : 'masterProductName';
                const dropdownFilter = filter ? filter : [];
                const pair = idOnly ? 'id' : ['id', 'version'];
                return ojCombo.loadCombo('PR', 'getSearchMasterProducts', {
                    value: pair,
                    label: labelField
                }, {}, {},
                    'message.data.master_product_list', ojComboName,
                    observable, dropdownFilter,
                    noresStr, allStr
                ).then(function () {
                    processMasterProductCombo(observable(), labelField, idOnly);
                    observable(comboList);
                    ojCombo.updateComboFromModel(observable(), ojComboName)
                });
            },
            // pageURIParams: 'masterprodid', 'masterprodversion', 'languagecode'
            getMasterProductsById: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    id: pageURIParams.masterprodid,
                    version: pageURIParams.masterprodversion,
                    language_code: pageURIParams.language_code
                };
                return evt.getServiceData(
                    'PR',
                    'getMasterProductsById', serviceURIParams, {},
                    'message.data.master_product_list', processMasterProduct).then(function () {
                        func ? func(masterprod) : masterprod;
                        observable(masterprod);
                    });
            },
            /**
             * BPM PROCESSES
             */
            prepareBPMJson: function (pageDataParams, type, authResponse) {
                let bpmJson = {
                    "region": "PT",
                    "taskContext": {
                        "workflowContext": {
                            "token": authResponse.token,
                            "locale": authResponse.locale
                        }
                    },
                    "masterProduct": {
                        "code": pageDataParams.code ? pageDataParams.code : '',
                        "name": pageDataParams.name ? pageDataParams.name : '',
                        "description": pageDataParams.description ? pageDataParams.description : '',
                        "product_class_id": pageDataParams.product_class_id ? pageDataParams.product_class_id + '' : '',
                        "product_class_version": pageDataParams.product_class_version ? pageDataParams.product_class_version + '' : '',
                        "date": pageDataParams.date ? pageDataParams.date : new Date().toISOString()
                    }
                }
                if (type === 'update') {
                    bpmJson.taskContext.outcome = pageDataParams.outcome;
                }
                if (pageDataParams.outcomecomment) {
                    bpmJson.masterProduct.comment = pageDataParams.outcomecomment;
                }
                return bpmJson;
            },
            prepareBPMServiceURI: function (pageURIParams) {
                return {
                    'id': pageURIParams.masterprodid,
                    'version': pageURIParams.masterprodversion,
                    'task_id': pageURIParams.taskid
                }
            },
            // pageURIParams: 'id', 'version', taskid'
            createNewMasterProductProcess: function (observable, pageURIParams, pageDataParams, authResponse, func) {
                return evt.getServiceData(
                    'PR',
                    'createNewMasterProductProcess', this.prepareBPMServiceURI(pageURIParams), this.prepareBPMJson(pageDataParams, 'create', authResponse),
                    'message.data', processMasterProdProcess).then(function () {
                        func ? func(newmasterprod) : newmasterprod;
                        observable(newmasterprod);
                    });
            },
            // pageURIParams: 'id', 'version', taskid'
            updateNewMasterProductProcess: function (observable, pageURIParams, pageDataParams, authResponse, func) {
                return evt.getServiceData(
                    'PR',
                    'updateNewMasterProductProcess', this.prepareBPMServiceURI(pageURIParams), this.prepareBPMJson(pageDataParams, 'update', authResponse),
                    'message.data', processMasterProdProcess).then(function () {
                        func ? func(newmasterprod) : newmasterprod;
                        observable(newmasterprod);
                    });
            },
            // pageURIParams: 'id', 'version', taskid'
            createModifyMasterProductProcess: function (observable, pageURIParams, pageDataParams, authResponse, func) {
                return evt.getServiceData(
                    'PR',
                    'createModifyMasterProductProcess', this.prepareBPMServiceURI(pageURIParams), this.prepareBPMJson(pageDataParams, 'create', authResponse),
                    'message.data', processMasterProdProcess).then(function () {
                        func ? func(newmasterprod) : newmasterprod;
                        observable(newmasterprod);
                    });
            },
            // pageURIParams: 'id', 'version', taskid'
            updateModifyMasterProductProcess: function (observable, pageURIParams, pageDataParams, authResponse, func) {
                return evt.getServiceData(
                    'PR',
                    'updateModifyMasterProductProcess', this.prepareBPMServiceURI(pageURIParams), this.prepareBPMJson(pageDataParams, 'update', authResponse),
                    'message.data', processMasterProdProcess).then(function () {
                        func ? func(newmasterprod) : newmasterprod;
                        observable(newmasterprod);
                    });
            }
        }
    }
);
