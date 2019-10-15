define([],
    function () {

        let attributesList = [];

        function processSearchAttributes(resp) {
            attributesList = [];
            resp.forEach(function (attribute) {
                attributesList.push({
                    "attrid": attribute.id,
                    "attrversion": attribute.version,
                    "keywordslistid": attribute.keywords_list_id,
                    "attrgrouplabel": attribute.name,
                    'name_translation_id': attribute.name_translation_id,
                    "attrdescription": attribute.description,
                    "description_translation_id": attribute.description_translation_id,
                    "attrcode": attribute.code,

                    "levelid": attribute.level_id,
                    "levelcode": attribute.level_code,
                    "levelvalue": attribute.level_name,
                    "typeid": attribute.type_id,
                    "typecode": attribute.type_code,
                    "typevalue": attribute.type_name,
                    "formatid": attribute.type_name,
                    "formatcode": attribute.format_code,
                    "formatvalue": attribute.format_value,

                    "statusid": attribute.status_id,
                    "statuscode": attribute.status_code,
                    "statusvalue": attribute.status_value,
                    "language_code": attribute.language_code
                });
            });
        }

        let attribute = {};

        function processAttribute(resp) {
            attribute = {
                "attrid": resp.id,
                "attrversion": resp.version,
                "attrcode": resp.code,
                "attrgrouplabel": resp.name,
                "attrgrouplabel_translation_id": resp.name_translation_id,
                "attrdescription": resp.description,
                "attrdescription_translation_id": resp.description_translation_id,
                "attrlength": resp.length,
                "attrdecprecision": resp.decimal_position ? resp.decimal_position : '',
                "keywordslistid": resp.keyword_list_id,
                'keywords': resp.keywords,
                "commentslistid": resp.comment_list_id,

                "levelid": resp.level_id,
                "levelcode": resp.level_code,
                "levelvalue": resp.level_name,
                "typeid": resp.type_id,
                "typecode": resp.type_code,
                "typevalue": resp.type_name,
                "formatid": resp.format_id,
                "formatcode": resp.format_code,
                "formatvalue": resp.format_name,

                "statusid": resp.status_id,
                "statuscode": resp.status_code,
                "statusvalue": resp.status_value,

                "creationdate": resp.creation_date,
                "creationusername": resp.creation_user,
                "activationdate": resp.activation_date,
                "suspensiondate": resp.suspension_date,
                "closedate": resp.close_date,
                "changeuser": resp.change_user,
                "changedate": resp.change_date,
                "migration_date": resp.migration_date,
                "legacysystem": resp.legacysystem,
                "language_code": resp.language_code
            }
        }

        let comboList = [];

        function processAttributesCombo(resp, labelField) {
            comboList = [];
            resp.forEach(function (attribute) {
                if (attribute.value === 0) {
                    comboList.push(attribute);
                } else {
                    comboList.push({
                        'value': attribute.additional.id + '_' + attribute.additional.version,
                        'label': (attribute.additional[labelField]),
                        'attrpair': attribute.additional.id + '_' + attribute.additional.version,
                        "attrid": attribute.additional.id,
                        "attrversion": attribute.additional.version,
                        "keywordslistid": attribute.additional.keywords_list_id,
                        "attrgrouplabel": attribute.additional.name,
                        'name_translation_id': attribute.additional.name_translation_id,
                        "attrdescription": attribute.additional.description,
                        "description_translation_id": attribute.additional.description_translation_id,
                        "attrcode": attribute.additional.code,
                        "levelid": attribute.additional.level_id,
                        "levelcode": attribute.additional.level_code,
                        "levelvalue": attribute.additional.level_name,
                        "typeid": attribute.additional.type_id,
                        "typecode": attribute.additional.type_code,
                        "typevalue": attribute.additional.type_name,
                        "formatid": attribute.additional.type_name,
                        "formatcode": attribute.additional.format_code,
                        "formatvalue": attribute.additional.format_name,
                        "statusid": attribute.additional.status_id,
                        "statuscode": attribute.additional.status_code,
                        "statusvalue": attribute.additional.status_value,
                        "language_code": attribute.additional.language_code
                    });
                }
            });
        }

        let countriesList = [];
        function processCountries(resp) {
            countriesList = [];
            if (Array.isArray(resp)) {
                resp.forEach(function (country) {
                    countriesList.push({
                        "country_id": country.country_id
                    });
                });
            }
        }

        let newattribute = {};

        function processAttributeProcess(resp) {
            newattribute = {
                'attrid': resp.id,
                'attrversion': resp.version,
                'attrcode': resp.code,
                'commentlistid': resp.comments_list_id,
                'keywordslistid': resp.keywords_list_id
            }
        }

        return {
            // pageURIParams: attrid, attrname, statuscodelist, languagecode,
            // local_product_id, localprodcode, typeid, levelid, countryid, prodclassid, masterprodid, keywordlist
            searchAttributes: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    id: pageURIParams.attrid,
                    name: pageURIParams.attrname,
                    status: pageURIParams.statuscodelist,
                    language_code: pageURIParams.languagecode,
                    local_product_id: pageURIParams.local_product_id,
                    local_product_code: pageURIParams.localprodcode,
                    type_id: pageURIParams.typeid,
                    level_id: pageURIParams.levelid,
                    country_id: pageURIParams.countryid,
                    product_class_id: pageURIParams.prodclassid,
                    master_product_id: pageURIParams.masterprodid,
                    keyword: pageURIParams.keywordlist
                };
                return evt.getServiceData(
                    'PR',
                    'getSearchProductAttributes', serviceURIParams, {}, 'message.data.attribute_list', processSearchAttributes).then(function () {
                    func ? func(attributesList) : attributesList;
                    observable(attributesList);
                });
            },
            // UPDATED
            getAttributesDropdown: function (observable, label, noresStr, allStr, filter) {
                const labelField = label === 'code' ? 'code' : 'name';
                const ojComboName = label === 'code' ? 'attributeCode' : 'attributeName';
                const dropdownFilter = filter ? filter : [];
                return ojCombo.loadCombo('PR', 'getSearchProductAttributes', {
                        value: ['id', 'version'],
                        label: labelField
                    }, {}, {},
                    'message.data.attribute_list', ojComboName,
                    observable, dropdownFilter,
                    noresStr, allStr
                ).then(function () {
                    processAttributesCombo(observable(), labelField);
                    observable(comboList);
                    ojCombo.updateComboFromModel(observable(), ojComboName)
                });
            },
            // pageURIParams: 'attrid', 'attrversion', 'languagecode'
            getProductAttributesById: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    id: pageURIParams.attrid,
                    version: pageURIParams.attrversion,
                    language_code: pageURIParams.languagecode
                };
                return evt.getServiceData(
                    'PR',
                    'getProductAttributesById', serviceURIParams, {},
                    'message.data.attribute_list[0]', processAttribute).then(function () {
                    func ? func(attribute) : attribute;
                    observable(attribute);
                });
            },
            // pageURIParams: 'attrid', 'attrversion'
            getAttributeCountries: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    id: pageURIParams.attrid,
                    version: pageURIParams.attrversion
                };
                return evt.getServiceData(
                    'PR',
                    'getAttributeCountries', serviceURIParams, {},
                    'message.data.country_list', processCountries).then(function () {
                    func ? func(countriesList) : countriesList;
                    observable(countriesList);
                });
            },
            // pageURIParams: 'attrid', 'attrversion'
            updateAttributeCountries: function (pageURIParams, pageDataParams) {
                let serviceURIParams = {
                    id: pageURIParams.attrid,
                    version: pageURIParams.attrversion
                };
                const serviceCountries = [];
                pageDataParams.countries.forEach(function (country) {
                    serviceCountries.push({
                        "id": country.id,
                        "country_id": country.countryid,
                        "change_operation": country.change_operation
                    });
                });
                const serviceDataParams = {
                    "country_list": serviceCountries
                }
                return evt.getServiceData(
                    'PR',
                    'updateAttributeCountries', serviceURIParams, serviceDataParams,
                    'message', processCountries);
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
                    "attribute": {
                        "name": pageDataParams.attrgrouplabel,
                        "description": pageDataParams.attrdescription,
                        "type_id": pageDataParams.typeid,
                        "format_id": pageDataParams.formatid,
                        "level_id": pageDataParams.levelid,
                        "length": pageDataParams.attrlength,
                        "decimal_position": pageDataParams.attrdecprecision,
                        "keywords": pageDataParams.keywords,
                        "date": pageDataParams.date ? pageDataParams.date : new Date().toISOString()
                    }
                }
                if (type === 'update') {
                    bpmJson.taskContext.outcome = pageDataParams.outcome;
                }
                if (pageDataParams.outcomecomment) {
                    bpmJson.attribute.comment = pageDataParams.outcomecomment;
                }
                return bpmJson;
            },
            prepareBPMServiceURI: function (pageURIParams) {
                return {
                    'id': pageURIParams.attrid,
                    'version': pageURIParams.attrversion,
                    'task_id': pageURIParams.taskid
                }
            },
            //
            // pageURIParams: 'id', 'version', taskid'
            createNewAttributeProcess: function (observable, pageURIParams, pageDataParams, authResponse, func) {
                return evt.getServiceData(
                    'PR',
                    'createNewAttributeProcess', this.prepareBPMServiceURI(pageURIParams), this.prepareBPMJson(pageDataParams, 'create', authResponse),
                    'message.data', processAttributeProcess).then(function () {
                    func ? func(newattribute) : newattribute;
                    observable(newattribute);
                });
            },
            // pageURIParams: 'id', 'version', taskid'
            updateNewAttributeProcess: function (observable, pageURIParams, pageDataParams, authResponse, func) {
                return evt.getServiceData(
                    'PR',
                    'updateNewAttributeProcess', this.prepareBPMServiceURI(pageURIParams), this.prepareBPMJson(pageDataParams, 'update', authResponse),
                    'message.data', processAttributeProcess).then(function () {
                    func ? func(newattribute) : newattribute;
                    observable(newattribute);
                });
            },

            // pageURIParams: 'id', 'version', taskid'
            createModifyAttributeProcess: function (observable, pageURIParams, pageDataParams, authResponse, func) {
                return evt.getServiceData(
                    'PR',
                    'createModifyAttributeProcess', this.prepareBPMServiceURI(pageURIParams), this.prepareBPMJson(pageDataParams, 'create', authResponse),
                    'message.data', processAttributeProcess).then(function () {
                    func ? func(newattribute) : newattribute;
                    observable(newattribute);
                });
            },
            // pageURIParams: 'id', 'version', taskid'
            updateModifyAttributeProcess: function (observable, pageURIParams, pageDataParams, authResponse, func) {
                return evt.getServiceData(
                    'PR',
                    'updateModifyAttributeProcess', this.prepareBPMServiceURI(pageURIParams), this.prepareBPMJson(pageDataParams, 'update', authResponse),
                    'message.data', processAttributeProcess).then(function () {
                    func ? func(newattribute) : newattribute;
                    observable(newattribute);
                });
            }
        }
    }
);
