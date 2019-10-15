define([],
    function () {

        let historyList = [];
        function processHistory(resp) {
            historyList = [];
            resp.forEach(function (hist) {
                historyList.push(
                    {
                        "id": hist.id,
                        "version": hist.version,
                        "productcode": hist.code,
                        "productname": hist.name,
                        "statusid": hist.status_id,
                        "statuscode": hist.status_code,
                        "statusvalue": hist.status_value,
                        "statuscomment": hist.status_comment,
                        "creationuser": hist.creation_user,
                        "changeuser": hist.changeuser
                    }
                );
            });
        }

        let commentsList = [];
        function processGetComments(resp) {
            commentsList = [];
            resp.forEach(function (comment) {
                commentsList.push({
                    "commentid": comment.id,
                    "commenttext": comment.value,
                    "username": comment.username,
                    "commentdate": comment.date
                });
            });
        }

        let createComment = {};
        function processCreateComments(resp) {
            createComment = {};
            createComment = {
                "commentid": resp.id,
                "username": resp.username,
                "commentdate": resp.date
            }
        }

        let translationsList = [];
        function processTranslations(resp) {
            translationsList = [];
            respAux = resp.translations_list;
            respAux.forEach( function (elem) {
               translationsList.push({
                "translationid": elem.id,
                "translationvalue": elem.value,
                "language_code": elem.language_code
            });     
            })
        }

        let productAttributesList = [];
        function processProductAttributes(resp) {
            productAttributesList = [];
            resp.forEach(function (attribute) {
                productAttributesList.push({
                    "attrid": attribute.id,
                    "attrversion": attribute.version
                });
            });
        }
        function processLocalProductAttributes(resp) {
            productAttributesList = [];
            resp.forEach(function (attribute) {
                productAttributesList.push({
                    "attrid": attribute.id,
                    "attrversion": attribute.version,
                    "keywordslistid": attribute.keywords_list_id,
                    "attrcode": attribute.code,
                    "attrname": attribute.name,
                    "name_translation_id": attribute.name_translation_id,
                    "attrdescription": attribute.description,
                    "description_translation_id": attribute.description_translation_id,
                    "typeid": attribute.type_id,
                    "typecode": attribute.type_code,
                    "typename": attribute.type_name,
                    "levelid": attribute.level_id,
                    "levelcode": attribute.level_code,
                    "levelname": attribute.level_name,
                    "formatid": attribute.format_id,
                    "formatcode": attribute.format_code,
                    "formatvalue": attribute.format_value,
                    "statusid": attribute.status_id,
                    "statuscode": attribute.status_code,
                    "statusvalue": attribute.status_value,

                    "mandatory": attribute.mandatory,
                    "visible": attribute.visible,
                    "applicable": attribute.applicable,
                    "updatable": attribute.updatable,
                    "inputfield": attribute.input_field,
                    "defaultvalue": attribute.default_value,

                    "attrdecprecision": attribute.precision,
                    "attrlength": attribute.length,
                    "attrlistid": attribute.attr_list_id,

                    "tableid": attribute.table_id,
                    "language_code": attribute.language_code
                });
            });
        }

        let keywordsList = [];
        function processKeywords(resp) {
            keywordsList = [];
            resp.forEach(function (keyword) {
                keywordsList.push({
                    "id": keyword.id,
                    "value": keyword.value
                });
            });
        }

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

        return {
            // pageURIParams: 'id', 'version', 'type'
            deleteProduct: function (pageURIParams) {
                return evt.getServiceData(
                    'PR',
                    'deleteProduct', pageURIParams, {},
                    'message', true
                );
            },
            // pageURIParams: 'id', 'version', 'type', 'attribute_id', 'attribute_version'
            createProductAttributeAssociation: function (pageURIParams) {
                console.log(pageURIParams)
                return evt.getServiceData(
                    'PR',
                    'createProductAttributeAssociation', pageURIParams, {},
                    'message.data', true
                );
            },
            // pageURIParams: 'id', 'version', 'type', 'attribute_id', 'attribute_version'
            deleteProductAttributeAssociation: function (pageURIParams) {
                console.log(pageURIParams)
                return evt.getServiceData(
                    'PR',
                    'deleteProductAttributeAssociation', pageURIParams, {},
                    'message', true
                );
            },
            /// NEED UPDATE
            // pageURIParams: 'id', 'version', 'type', 'commentlistid'
            getCommentsByCommentListId: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'id': pageURIParams.id,
                    'version': pageURIParams.version,
                    'type': pageURIParams.type,
                    'comment_list_id': pageURIParams.commentlistid
                }
                return evt.getServiceData(
                    'PR',
                    'getCommentsByCommentListId', serviceURIParams, {},
                    'message.data.comments_list', processGetComments
                ).then(function () {
                    func ? func(commentsList) : commentsList;
                    observable(commentsList);
                });
            },
            // pageURIParams: 'id', 'version', 'type', 'commentlistid'
            createComments: function (observable, pageURIParams, pageDataParams) {
                let serviceURIParams = {
                    'id': pageURIParams.id,
                    'version': pageURIParams.version,
                    'type': pageURIParams.type,
                    'comment_list_id': pageURIParams.commentlistid
                }
                let serviceDataParams = {
                    'comment_text': pageDataParams.commenttext
                }
                return evt.getServiceData(
                    'PR',
                    'createComments', serviceURIParams, serviceDataParams,
                    'message.data', processCreateComments
                ).then(function () {
                    observable(createComment);
                });
            },
            // pageURIParams: 'id', 'type'
            getHistory: function (observable, pageURIParams, func) {
                return evt.getServiceData(
                    'PR',
                    'getHistory', pageURIParams, {},
                    'message.data.history_list', processHistory
                ).then(function () {
                    func ? func(historyList) : historyList;
                    observable(historyList);
                });
            },
            // pageURIParams: 'id', 'type'
            updateHistoryTable: function (tableID, pageURIParams, dataProvider, selectedRow) {
                return evt.updateTable(
                    undefined, tableID, 'PR', 'getHistory', {
                        type: pageURIParams.type,
                        id: pageURIParams.id
                    }, {}, dataProvider, 'message.data.history_list', selectedRow
                );
            },
            // pageURIParams: 'id', 'version', 'type', 'translationid', 'language_code'
            getTranslations: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'id': pageURIParams.id,
                    'version': pageURIParams.version,
                    'type': pageURIParams.type,
                    'translation_list_id': pageURIParams.translation_id,
                    'language_code': pageURIParams.language_code
                }
                return evt.getServiceData(
                    'PR',
                    'getTranslations', serviceURIParams, {},
                    'message.data', processTranslations).then(function () {
                        func ? func(translationsList) : translationsList;
                        observable(translationsList);
                    });
            },
            // pageURIParams: 'id', 'version', 'type', 'translationid'
            createTranslation: function (pageURIParams, pageDataParams) {
                let serviceURIParams = {
                    'id': pageURIParams.id,
                    'version': pageURIParams.version,
                    'type': pageURIParams.type,
                    'translation_id': pageURIParams.translationid
                }
                let serviceDataParams = {
                    "translations": []
                }
                pageDataParams.translations.forEach(function (translation) {
                    serviceDataParams.translations.push({
                        "language_code": translation.language_code,
                        "translation": translation.translation,
                        "change_operation": translation.change_operation
                    });
                });
                return evt.getServiceData(
                    'PR',
                    'createTranslations', serviceURIParams, serviceDataParams,
                    'message', true);
            },
            // pageURIParams: 'id', 'version', 'type'
            getProductAttributes: function (observable, pageURIParams, func) {
                return evt.getServiceData(
                    'PR',
                    'getProductAttributes', pageURIParams, {},
                    'message.data.attribute_list', pageURIParams.type === 'LocalProduct' ? processLocalProductAttributes : processProductAttributes).then(function () {
                        func ? func(productAttributesList) : productAttributesList;
                        observable(productAttributesList);
                    });
            },
            // pageURIParams: 'id', 'version', 'type', 'keywordslistid'
            getKeywords: function (observable, pageURIParams, func) {
                let serviceURIParams = {
                    'id': pageURIParams.id,
                    'version': pageURIParams.version,
                    'type': pageURIParams.type,
                    'keywords_list_id': pageURIParams.keywordslistid
                }
                return evt.getServiceData(
                    'PR',
                    'getKeywords', serviceURIParams, {},
                    'message.data.keyword_list', processKeywords).then(function () {
                        func ? func(keywordsList) : keywordsList;
                        observable(keywordsList);
                    });
            },
            /**
             * BPM PROCESSES
             */
            prepareStatusBPMJson: function(pageDataParams, type, authResponse) {
                const userContext = ojet.getUserContext();
                let bpmJson = {
                    "status_code": pageDataParams.statuscode,
                    "status_value": pageDataParams.statusvalue,
                    "status_id": pageDataParams.statusid,
                    "comment": pageDataParams.statuscomment,
                    "region": pageDataParams.region ? pageDataParams.region : userContext.locale,
                    "date": pageDataParams.date
                }
                if (type === 'update') {
                    bpmJson.taskContext = {
                        "workflowContext": {
                            "token": authResponse.token,
                            "locale": authResponse.locale
                        },
                        "outcome": pageDataParams.outcome
                    }
                }
                return bpmJson;
            },
            // pageURIParams: 'id', 'version'
            createChangeStatusProcess: function (pageURIParams, pageDataParams, authResponse) {
                return evt.getServiceData(
                    'PR',
                    'createChangeStatusProcess', pageURIParams, this.prepareStatusBPMJson(pageDataParams, 'create', authResponse),
                    'message.data', true)
            },
            // pageURIParams: 'id', 'version', 'taskid'
            updateChangeStatusProcess: function (pageURIParams, pageDataParams, authResponse) {
                let serviceURIParams = {
                    'id': pageURIParams.id,
                    'version': pageURIParams.version,
                    'taskid': pageURIParams.taskid,
                    'type': pageURIParams.type
                }
                return evt.getServiceData(
                    'PR',
                    'updateChangeStatusProcess', serviceURIParams, this.prepareStatusBPMJson(pageDataParams, 'update', authResponse),
                    'message.data', true)
            },
            getReferenceData: function (observable, pageUriParams, func) {
                let serviceUriParams = {
                    'refdatalistid': pageUriParams.refdatalistid,
                    'refdatacode': pageUriParams.refdatacode,
                    'languagecode': pageUriParams.languagecode,
                    'startdate': pageUriParams.startdate,
                    'enddate': pageUriParams.enddate,
                    'shownonactive': pageUriParams.shownonactive
                }
                return evt.getServiceData('PR', 
                'getReferenceData', serviceUriParams, {}, 'message.data.reference_data_list',
                    processGet).then(function () {
                    func ? func(refdataList) : refdataList;
                    observable(refdataList);
                });
            }
        }
    });
