define([],
    function () {
        let prodClassList = [];

        function processSearchProductClass(resp) {
            prodClassList = [];
            resp.forEach(function (prodclass) {
                prodClassList.push({
                    'prodclasspair': prodclass.id + '_' + prodclass.version,
                    'prodclassid': prodclass.id,
                    'prodclassversion': prodclass.version,
                    'prodclassname': prodclass.name,
                    'prodclasscode': prodclass.code,
                    'statusid': prodclass.status_id,
                    'statuscode': prodclass.status_code,
                    'statusvalue': prodclass.status_value,
                    'name_translation_id': prodclass.name_translation_id,
                    'language_code': prodclass.language_code
                })
            });
        }
        let comboList = [];
        function processProductClassCombo(resp, labelField, idOnly) {
            comboList = [];
            resp.forEach(function (prodclass) {
                if (prodclass.value === 0) {
                    comboList.push(prodclass);
                } else {
                    comboList.push({
                        'value': idOnly ? prodclass.additional.id : prodclass.additional.id + '_' + prodclass.additional.version,
                        'label': (prodclass.additional[labelField]),
                        'prodclasspair': prodclass.additional.id + '_' + prodclass.additional.version,
                        'prodclassid': prodclass.additional.id,
                        'prodclassversion': prodclass.additional.version,
                        'prodclassname': prodclass.additional.name,
                        'prodclasscode': prodclass.additional.code,
                        'statusid': prodclass.additional.status_id,
                        'statuscode': prodclass.additional.status_code,
                        'statusvalue': prodclass.additional.status_value,
                        'name_translation_id': prodclass.additional.name_translation_id,
                        'language_code': prodclass.additional.language_code
                    })
                }
            });
        }

        let prodclass = {};

        function processProductClass(resp) {
            prodclass = {
                'prodclassid': resp.id,
                'prodclassversion': resp.version,
                'prodclasscode': resp.code,
                'prodclassname': resp.name,
                'prodclassdescription': resp.description,
                'prodclassdescription_translation_id': resp.description_translation_id,
                'statusid': resp.status_id,
                'statuscode': resp.status_code,
                'statusvalue': resp.status_value,
                'name_translation_id': resp.name_translation_id,
                'language_code': resp.language_code,
                'commentslistid': resp.comment_list_id,
                'creationdate': resp.creation_date,
                'activationdate': resp.activation_date,
                'suspensiondate': resp.suspension_date,
                'closedate': resp.close_date,
                'migrationdate': resp.migration_date,
                'changedate': resp.change_date,
                'creationusername': resp.creation_user,
                'changeuser': resp.change_user,
                'legacysystem': resp.legacysystem
            }
        }

        let newprodclass = {};

        function processProdClassProcess(resp) {
            newprodclass = {
                'prodclassid': resp.id,
                'prodclassversion': resp.version,
                'commentlistid': resp.comment_list_id
            }
        }

        /**
         * BPM PROCESSES
         */
        function prepareBPMJson(pageDataParams, type, authResponse) {
            let bpmJson = {
                'region': 'PT',
                "taskContext": {
                    "workflowContext": {
                        "token": authResponse.token,
                        "locale": authResponse.locale
                    }
                },
                "productClass": {
                    'code': pageDataParams.code ? pageDataParams.code : '',
                    'name': pageDataParams.name ? pageDataParams.name : '',
                    'description': pageDataParams.description ? pageDataParams.description : '',
                    "date": pageDataParams.date ? pageDataParams.date : new Date().toISOString()
                }
            }
            if (type === 'update') {
                bpmJson.taskContext.outcome = pageDataParams.outcome;
            }
            if (pageDataParams.outcomecomment) {
                bpmJson.productClass.comment = pageDataParams.outcomecomment;
            }
            return bpmJson;
        };

        function prepareBPMServiceURI(pageURIParams) {
            return {
                'id': pageURIParams.prodclassid,
                'version': pageURIParams.prodclassversion,
                'task_id': pageURIParams.taskid
            }
        };

        return {
            // pageURIParams: id, name, status, language_code
            searchProductClasses: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'id': pageURIParams.prodclassid,
                    'name': pageURIParams.prodclassname,
                    'status': pageURIParams.statuscodelist,
                    'language_code': pageURIParams.languagecode
                }
                return evt.getServiceData(
                    'PR',
                    'getSearchProductClasses', serviceURIParams, {}, 'message.data.product_class_list', processSearchProductClass).then(function () {
                        func ? func(prodClassList) : prodClassList;
                        observable(prodClassList);
                    });
            },
            getProductClassesDropdown: function (observable, label, noresStr, allStr, filter, idOnly) {
                const labelField = label === 'code' ? 'code' : 'name';
                const ojComboName = label === 'code' ? 'productClassCode' : 'productClassName';
                const dropdownFilter = filter ? filter : [];
                const pair = idOnly ? 'id' : ['id', 'version'];
                return ojCombo.loadCombo('PR', 'getSearchProductClasses', {
                    value: pair,
                    label: labelField
                }, {}, {},
                    'message.data.product_class_list', ojComboName,
                    observable, dropdownFilter,
                    noresStr, allStr
                )
                    .then(function () {
                        processProductClassCombo(observable(), labelField, idOnly);
                        observable(comboList);
                        ojCombo.updateComboFromModel(observable(), ojComboName)
                    });
            },
            // pageURIParams: 'id', 'version', 'language_code'
            getProductClassesById: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'id': pageURIParams.prodclassid,
                    'version': pageURIParams.prodclassversion,
                    'language_code': pageURIParams.languagecode
                }
                return evt.getServiceData(
                    'PR',
                    'getProductClassesById', serviceURIParams, {},
                    'message.data.product_class_list[0]', processProductClass).then(function () {
                        func ? func(prodclass) : prodclass;
                        observable(prodclass);
                    });
            },
            // pageURIParams: 'id', 'version', taskid'
            createNewProductClassProcess: function (observable, pageURIParams, pageDataParams, authResponse, func) {
                return evt.getServiceData(
                    'PR',
                    'createNewProductClassProcess', prepareBPMServiceURI(pageURIParams), prepareBPMJson(pageDataParams, 'create', authResponse),
                    'message.data', processProdClassProcess).then(function () {
                        func ? func(newprodclass) : newprodclass;
                        observable(newprodclass);
                    });
            },
            // pageURIParams: 'id', 'version', taskid'
            updateNewProductClassProcess: function (observable, pageURIParams, pageDataParams, authResponse, func) {
                return evt.getServiceData(
                    'PR',
                    'updateNewProductClassProcess', prepareBPMServiceURI(pageURIParams), prepareBPMJson(pageDataParams, 'update', authResponse),
                    'message.data', processProdClassProcess).then(function () {
                        func ? func(newprodclass) : newprodclass;
                        observable(newprodclass);
                    });
            },

            // pageURIParams: 'id', 'version', taskid'
            createModifyProductClassProcess: function (observable, pageURIParams, pageDataParams, authResponse, func) {
                return evt.getServiceData(
                    'PR',
                    'createModifyProductClassProcess', prepareBPMServiceURI(pageURIParams), prepareBPMJson(pageDataParams, 'create', authResponse),
                    'message.data', processProdClassProcess).then(function () {
                        func ? func(newprodclass) : newprodclass;
                        observable(newprodclass);
                    });
            },
            // pageURIParams: 'id', 'version', taskid'
            updateModifyProductClassProcess: function (observable, pageURIParams, pageDataParams, authResponse, func) {
                return evt.getServiceData(
                    'PR',
                    'updateModifyProductClassProcess', prepareBPMServiceURI(pageURIParams), prepareBPMJson(pageDataParams, 'update', authResponse),
                    'message.data', processProdClassProcess).then(function () {
                        func ? func(newprodclass) : newprodclass;
                        observable(newprodclass);
                    });
            }
        }
    });
