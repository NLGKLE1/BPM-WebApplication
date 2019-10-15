define([],
    function () {

        let localProductsList = [];

        function processSearchLocalProducts(resp) {
            localProductsList = [];
            resp.forEach(function (localproduct) {
                localProductsList.push({
                    "localprodid": localproduct.id,
                    "localprodversion": localproduct.version,
                    "localprodcode": localproduct.code,
                    "localprodname": localproduct.name,
                    "name_translation_id": localproduct.name_translation_id,
                    "bondinggrouplabel": localproduct.group_name,
                    "bondinglocallabel": localproduct.local_name,
                    "legacycode": localproduct.legacy_code != null ? localproduct.legacy_code : "",

                    "prodclassid": localproduct.product_class_id,
                    "prodclassversion": localproduct.product_class_version,
                    "prodclassname": localproduct.product_class_name,
                    "masterprodid": localproduct.master_product_id,
                    "masterprodversion": localproduct.master_product_version,
                    "masterprodname": localproduct.master_product_name,

                    "statusid": localproduct.status_id,
                    "statuscode": localproduct.status_code,
                    "statusvalue": localproduct.status_value,
                    "country_id": localproduct.country_id,
                    "language_code": localproduct.language_code
                });
            });
        }

        let comboList = [];
        function processLocalProductCombo(resp, labelField) {
            comboList = [];
            resp.forEach(function (localproduct) {
                if (localproduct.value === 0) {
                    comboList.push(localproduct);
                } else {
                    comboList.push({
                        'value': localproduct.additional.id + '_' + localproduct.additional.version,
                        'label': (localproduct.additional[labelField]),
                        "localprodpair": localproduct.additional.id + '_' + localproduct.additional.version,
                        "masterprodpair": localproduct.additional.master_product_id + '_' + localproduct.additional.master_product_version,
                        "prodclasspair": localproduct.additional.product_class_id + '_' + localproduct.additional.product_class_version,
                        "localprodid": localproduct.additional.id,
                        "localprodversion": localproduct.additional.version,
                        "localprodcode": localproduct.additional.code,
                        "localprodname": localproduct.additional.name,
                        "name_translation_id": localproduct.additional.name_translation_id,
                        "bondinggrouplabel": localproduct.additional.group_name,
                        "bondinglocallabel": localproduct.additional.local_name,
                        "legacycode": localproduct.additional.legacy_code != null? localproduct.additional.legacy_code : "",
                        "prodclassid": localproduct.additional.product_class_id,
                        "prodclassversion": localproduct.additional.product_class_version,
                        "prodclassname": localproduct.additional.product_class_name,
                        "masterprodid": localproduct.additional.master_product_id,
                        "masterprodversion": localproduct.additional.master_product_version,
                        "masterprodname": localproduct.additional.master_product_name,
                        "statusid": localproduct.additional.status_id,
                        "statuscode": localproduct.additional.status_code,
                        "statusvalue": localproduct.additional.status_value,
                        "country_id": localproduct.additional.country_id,
                        "language_code": localproduct.additional.language_code
                    })
                }
            });
        }

        // TBD
        let localprod = {};

        function processLocalProduct(resp) {
            if (resp === undefined) {
                localprod = {};
            }
            else {
                localprod = {
                    "localprodid": resp.id,
                    "localprodversion": resp.version,
                    "commentslistid": resp.comment_list_id,
                    "keywordslistid": resp.keywords_list_id,
                    "localprodcode": resp.code,
                    "localprodname": resp.name,
                    "name_translation_id": resp.name_translation_id,
                    "bondinglocallabel": resp.local_name,
                    "bondinggrouplabel": resp.group_name,
                    "localproddescription": resp.description,
                    "description_translation_id": resp.description_translation_id,
                    "legacy_code": resp.legacy_code != null ? resp.legacy_code : "",
                    "country_id": resp.country_id,

                    "prodclassid": resp.product_class_id,
                    "prodclassversion": resp.product_class_version,
                    "prodclasscode": resp.product_class_code,
                    "prodclassname": resp.product_class_name,
                    "masterprodid": resp.master_product_id,
                    "masterprodversion": resp.master_product_version,
                    "masterprodcode": resp.master_product_code,
                    "masterprodname": resp.master_product_name,
                    "masterprodpair": resp.master_product_id + '_' + resp.master_product_version,
                    "prodclasspair": resp.product_class_id + '_' + resp.product_class_version,

                    "statusid": resp.status_id,
                    "statuscode": resp.status_code,
                    "statusvalue": resp.status_value,
                    "btypeid": resp.beneficiary_type_id,
                    "btypecode": resp.beneficiary_type_code,
                    "btypevalue": resp.beneficiary_type_value,
                    "uoid": resp.underlying_obligation_id,
                    "uocode": resp.underlying_obligation_code,
                    "uovalue": resp.underlying_obligation_value,
                    "pshipid": resp.partnership_id,
                    "pshipcode": resp.partnership_code,
                    "pshipvalue": resp.partnership_value,

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
        }

        let newlocalprod = {};

        function processLocalProdProcess(resp) {
            newlocalprod = {
                'localprodid': resp.id,
                'localprodversion': resp.version,
                'localprodcode': resp.code,
                'commentlistid': resp.comment_list_id,
                'keywordslistid': resp.keywords_list_id
            }
        }

        let tableColumns = [];
        function processTableColumns(resp) {
            tableColumns = [];
            resp.forEach(function (column_definition) {
                tableColumns.push({
                    "tableColumnId": column_definition.id,
                    "tableColumnLabel": column_definition.label,
                    "tableColumnLabelListId": column_definition.label_list_id,
                    "tableColumnLanguageCode": column_definition.language_code,
                    "tableColumnFormatId": column_definition.format_id,
                    "tableColumnFormatName": column_definition.format_name,
                    "tableColumnLength": column_definition.length,
                    "tableColumnDecimalPosition": column_definition.decimal_position
                });
            });
        }


        let newTableColumn = {};
        function processCreateTableColumn(resp) {
            newTableColumn = {
                'tableColumnId': resp.id,
                'tableColumnLabelListId': resp.label_list_id
            }
        }

        let tableAttribute = {};
        function processGetTableAttribute(resp) {
            tableAttribute = {
                column_definition: [],
                table_definition: []
            };
            resp.column_definition.forEach(function (elem) {
                tableAttribute.column_definition.push({
                    "languageCode": elem.language_code,
                    "labelListId": elem.label_list_id,
                    "length": elem.length,
                    "decimalPrecision": elem.decimal_precision,
                    "formatId": elem.format_id,
                    "id": elem.id,
                    "label": elem.label,
                    "formatValue": elem.format_value
                });
            });
            resp.table_definition.forEach(function (elem) {
                tableAttribute.table_definition.push({
                    "columnPosition": elem.column_position,
                    "defaultValueListId": elem.default_value_list_id,
                    "languageCode": elem.language_code,
                    "rowDefaultId": elem.row_default_id,
                    "defaultValue": elem.default_value,
                    "rowPosition": elem.row_position
                });
            });
        }

        let listOfValuesAttribute = [];
        function processGetProductListOfValuesAttribute(resp) {
            listOfValuesAttribute = [];
            if (resp) {
                resp.forEach(function (value_list) {

                    listOfValuesAttribute.push({
                        "id": value_list.id,
                        "translationId": value_list.translation_id,
                        "value": value_list.value,
                        "label": value_list.value
                    });

                    /* listOfValuesAttribute.push({
                         "id": 0,
                         "translationId": 20,
                         "value": "Value 0"
                     });
                     listOfValuesAttribute.push({
                         "id": 1,
                         "translationId": 21,
                         "value": "Value 1"
                     });
                     listOfValuesAttribute.push({
                         "id": 2,
                         "translationId": 22,
                         "value": "Value 2"
                     });
                     listOfValuesAttribute.push({
                         "id": 3,
                         "translationId": 23,
                         "value": "Value 3"
                     }); */
                });
            };
        }

        let newListValuesAttribute = [];
        function processCreateProductListValues(resp) {
            newListValuesAttribute = [resp];
        }

        return {
            // APIRAY URI PARAMS MISSING
            // pageURIParams: localprodid, localprodname, prodclassid, prodclassversion,
            // masterprodid, masterprodversion, statuscodelist, countryid, languagecode, keywordlist, legacycode
            searchLocalProducts: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'id': pageURIParams.localprodid,
                    'name': pageURIParams.localprodname,
                    'product_class_id': pageURIParams.prodclassid,
                    'product_class_version': pageURIParams.prodclassversion,
                    'master_product_id': pageURIParams.masterprodid,
                    'master_product_version': pageURIParams.masterprodversion,
                    'status': pageURIParams.statuscodelist,
                    'country_id': pageURIParams.countryid,
                    'language_code': pageURIParams.languagecode,
                    'keyword': pageURIParams.keywordlist,
                    'legacy_code': pageURIParams.legacycode != null ? pageURIParams.legacycode : ""
                }
                return evt.getServiceData(
                    'PR',
                    'getSearchLocalProducts', serviceURIParams, {}, 'message.data.local_product_list', processSearchLocalProducts).then(function () {
                        func ? func(localProductsList) : localProductsList;
                        observable(localProductsList);
                    });
            },
            // UPDATED
            getLocalProductsDropdown: function (observable, label, noresStr, allStr, filter) {
                const labelField = label === 'code' ? 'code' : 'name';
                const ojComboName = label === 'code' ? 'localProductCode' : 'localProductName';
                const dropdownFilter = filter ? filter : [];
                return ojCombo.loadCombo('PR', 'getSearchLocalProducts', {
                    value: ['id', 'version'],
                    label: labelField
                }, {}, {},
                    'message.data.local_product_list', ojComboName,
                    observable, dropdownFilter,
                    noresStr, allStr
                ).then(function () {
                    processLocalProductCombo(observable(), labelField);
                    observable(comboList);
                    ojCombo.updateComboFromModel(observable(), ojComboName)
                });
            },
            // DATA MISSING
            // pageURIParams: 'localprodid', 'localprodversion', 'languagecode'
            getLocalProductsById: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'id': pageURIParams.localprodid,
                    'version': pageURIParams.localprodversion,
                    'language_code': pageURIParams.language_code
                }
                return evt.getServiceData(
                    'PR',
                    'getLocalProductsById', serviceURIParams, {},
                    'message.data.local_product_list[0]', processLocalProduct).then(function (_data) { //.local_product_list[0]
                        func ? func(localprod) : localprod;
                        if(observable){
                            observable(localprod);
                        }
                        return _data;
                    })
            },
            // pageURIParams: 'localprodid', 'localprodversion', 'attrid', 'attrversion'
            updateLocalProductAttributes: function (pageURIParams, pageDataParams) {
                let serviceURIParams = {
                    'id': pageURIParams.localprodid,
                    'version': pageURIParams.localprodversion,
                    'attribute_id': pageURIParams.attrid,
                    'attribute_version': pageURIParams.attrversion
                }
                const serviceDataParams = {
                    "visible": pageDataParams.visible,
                    "mandatory": pageDataParams.mandatory,
                    "applicable": pageDataParams.applicable,
                    "input_field": pageDataParams.input_field,
                    "default_value": pageDataParams.default_value,
                    "updatable": pageDataParams.updatable
                }
                return evt.getServiceData(
                    'PR', 'updateLocalProductAttributes', serviceURIParams,
                    serviceDataParams, 'message', true);
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
                    "localProduct": {
                        "group_name": pageDataParams.bondinggrouplabel,
                        "local_name": pageDataParams.bondinglocallabel,
                        "description": pageDataParams.localproddescription,
                        "product_class_id": pageDataParams.prodclassid,
                        "product_class_version": pageDataParams.prodclassversion,
                        "master_product_id": pageDataParams.masterprodid,
                        "master_product_version": pageDataParams.masterprodversion,
                        "legacy_code": pageDataParams.legacycode != null ? pageDataParams.legacycode : "",
                        "country_id": pageDataParams.countryid,
                        "country_code": pageDataParams.country_code,
                        "partnership_id": pageDataParams.pshipcode,
                        "underlying_obligation_id": pageDataParams.uocode,
                        "beneficiary_type_id": pageDataParams.btypecode,
                        "keywords": pageDataParams.keywords,
                        "date": pageDataParams.date ? pageDataParams.date : new Date().toISOString()
                    }
                }
                if (type === 'update') {
                    bpmJson.taskContext.outcome = pageDataParams.outcome;
                }
                return bpmJson;
            },
            prepareBPMServiceURI: function (pageURIParams) {
                return {
                    'id': pageURIParams.localprodid,
                    'version': pageURIParams.localprodversion,
                    'task_id': pageURIParams.taskid
                }
            },
            // pageURIParams: 'id', 'version', taskid'
            createNewLocalProductProcess: function (observable, pageURIParams, pageDataParams, authResponse, func) {
                return evt.getServiceData(
                    'PR',
                    'createNewLocalProductProcess', this.prepareBPMServiceURI(pageURIParams), this.prepareBPMJson(pageDataParams, 'create', authResponse),
                    'message.data', processLocalProdProcess).then(function () {
                        func ? func(newlocalprod) : newlocalprod;
                        observable(newlocalprod);
                    });
            },
            // pageURIParams: 'id', 'version', taskid'
            updateNewLocalProductProcess: function (observable, pageURIParams, pageDataParams, authResponse, func) {
                return evt.getServiceData(
                    'PR',
                    'updateNewLocalProductProcess', this.prepareBPMServiceURI(pageURIParams), this.prepareBPMJson(pageDataParams, 'update', authResponse),
                    'message.data', processLocalProdProcess).then(function () {
                        func ? func(newlocalprod) : newlocalprod;
                        observable(newlocalprod);
                    });
            },

            // pageURIParams: 'id', 'version', taskid'
            createModifyLocalProductProcess: function (observable, pageURIParams, pageDataParams, authResponse, func) {
                return evt.getServiceData(
                    'PR',
                    'createModifyLocalProductProcess', this.prepareBPMServiceURI(pageURIParams), this.prepareBPMJson(pageDataParams, 'create', authResponse),
                    'message.data', processLocalProdProcess).then(function () {
                        func ? func(newlocalprod) : newlocalprod;
                        observable(newlocalprod);
                    });
            },
            // pageURIParams: 'id', 'version', taskid'
            updateModifyLocalProductProcess: function (observable, pageURIParams, pageDataParams, authResponse, func) {
                return evt.getServiceData(
                    'PR',
                    'updateModifyLocalProductProcess', this.prepareBPMServiceURI(pageURIParams), this.prepareBPMJson(pageDataParams, 'update', authResponse),
                    'message.data', processLocalProdProcess).then(function () {
                        func ? func(newlocalprod) : newlocalprod;
                        observable(newlocalprod);
                    });
            },



            // pageURIParams: 'id', 'version', 'column_id'
            getTableColumn: function (observable, pageURIParams, func) {
                return evt.getServiceData(
                    'PR',
                    'getTableColumn', pageURIParams, {},
                    'message.data', processTableColumns).then(function () {
                        func ? func(tableColumns) : tableColumns;
                        observable(tableColumns);
                    });
            },
            // pageURIParams: 'id', 'version', 'column_id'
            deleteTableColumn: function (pageURIParams) {
                return evt.getServiceData(
                    'PR',
                    'deleteTableColumn', pageURIParams, {},
                    'message.data', true
                );
            },
            // pageURIParams: 'id', 'version', 'column_id'
            createTableColumn: function (observable, pageURIParams, pageDataParams, func) {
                return evt.getServiceData(
                    'PR',
                    'createTableColumn', pageURIParams, pageDataParams,
                    'message.data', processCreateTableColumn).then(function () {
                        func ? func(newTableColumn) : newTableColumn;
                        observable(newTableColumn);
                    });
            },

            // pageURIParams: 'id', 'version', 'column_id'
            getTableAttribute: function (observable, pageURIParams, func) {
                return evt.getServiceData(
                    'PR',
                    'getTableAttribute', pageURIParams, {},
                    'message.data', processGetTableAttribute).then(function () {
                        func ? func(tableAttribute) : tableAttribute;
                        observable(tableAttribute);
                    });
            },
            // pageURIParams: 'id', 'version', 'column_id'
            createTableAttribute: function (pageURIParams, pageDataParams) {
                return evt.getServiceData(
                    'PR',
                    'createTableAttribute', pageURIParams, pageDataParams,
                    'message.data', true);
            },

            // pageURIParams: 'value_list_id', 'language_code'
            getProductListOfValues: function (observable, pageURIParams, func) {
                return evt.getServiceData(
                    'PR',
                    'getProductListOfValues', pageURIParams, {},
                    'message.data.value_list', processGetProductListOfValuesAttribute).then(function () {
                        func ? func(listOfValuesAttribute) : listOfValuesAttribute;
                        observable(listOfValuesAttribute);
                    });
            },
            // pageURIParams: 'value_list_id'
            createProductsListValues: function (observable, pageURIParams, pageDataParams, func) {
                return evt.getServiceData(
                    'PR',
                    'createProductsListValues', pageURIParams, pageDataParams,
                    'message.data', processCreateProductListValues).then(function () {
                        func ? func(newListValuesAttribute) : newListValuesAttribute;
                        observable(newListValuesAttribute);
                    });
            },
            // pageURIParams: 'value_id'
            deleteProductsListValues: function (pageURIParams) {
                return evt.getServiceData(
                    'PR',
                    'deleteProductsListValues', pageURIParams, {},
                    'message.data', true);
            }
        }
    }
);
