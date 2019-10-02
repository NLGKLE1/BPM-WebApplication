define(['ojet', 'jquery'],
    function (ojet, $) {

        const self = this;

        //these MUST have the same name as the "key" field when calling getRefData service
        // Attribute Type
        self.ATTTY = ojet.createArray();
        // Attribute Level
        self.ATTLV = ojet.createArray();
        // Product Status
        self.ATTPS = ojet.createArray();
        self.countries = ojet.createArray();
        self.regions = ojet.createArray(); //Party
        self.cities = ojet.createArray(); //Party
        // Attribute Format
        self.ATTFO = ojet.createArray();
        // Partnership
        self.PARTN = ojet.createArray();
        // Underlying Obligation
        self.UNDOB = ojet.createArray();
        // Beneficiary Type
        self.BENTY = ojet.createArray();
        self.domainNames = ojet.createArray();
        self.refdataNames = ojet.createArray();

        self.productClassName = ojet.createArray();
        self.productClassCode = ojet.createArray();
        self.masterProductName = ojet.createArray();
        self.masterProductCode = ojet.createArray();
        self.localProductCode = ojet.createArray();
        self.localProductName = ojet.createArray();
        self.attributeCode = ojet.createArray();

        // ALERTS
        self.alertOrigin = ojet.createArray();
        self.alertEventDesc = ojet.createArray();
        self.alertEventVersion = ojet.createArray();
        self.alertRecipient = ojet.createArray();
        self.alertChannel = ojet.createArray();
        self.alertSubject = ojet.createArray();
        self.alertCategory = ojet.createArray();
        self.alertLink = ojet.createArray();
        self.alertActive = ojet.createArray();
        self.alertTitleText = ojet.createArray();
        self.alertBodyText = ojet.createArray();
        self.alertVariables = ojet.createArray();
        self.alertOperations = ojet.createArray();
        self.eventNotConfigVersions = ojet.createArray();
        // Party Management
        self.currencies = ojet.createArray();
        self.partyDropdowns = ojet.createArray();

        self.startNode = ojet.createArray();
        self.tempArray = ojet.createArray();
        self.statusActiveVal = ojet.createInput();

        /**
         * Responsible for filtering and population the common reference data dropdowns
         * @param {*} servicePair json that maps value and label to service fields. ex: {value: 'prodclassid',label: 'prodclassname'}
         * @param {*} dropdownOptions page dropdown array
         * @param {*} filterArray allows up to n filters. Follows this structure: [{field: 'statusvalue',value: "Active"}]
         * @param {*} noResLabel "no results" placeholder label
         * @param {*} allLabel "all" placeholder label
         */
        function processRefDataCombo(servicePair, dropdownOptions, filterArray, noResLabel, allLabel) {


            processFilters(self.tempArray, filterArray);
            if (self.tempArray().length == 0 && noResLabel!== undefined) {
                dropdownOptions.push({
                    value: 0,
                    label: noResLabel
                })
            } else {
                if (allLabel !== undefined) {
                    dropdownOptions.push({
                        value: 0,
                        label: allLabel
                    })
                }

                self.tempArray().forEach(function (tempElement) {
                    let duplicate = false;
                    tempValue = (typeof servicePair.value === "string") ? tempElement[servicePair.value] : tempElement[servicePair.value[0]] + '_' + tempElement[servicePair.value[1]];
                    dropdownOptions().forEach(function (optElement) {
                        if (optElement.value == tempValue) {
                            duplicate = true;
                        }
                    });
                    if (!duplicate) {
                        dropdownOptions.push({
                            value: tempValue,
                            label: tempElement[servicePair.label],
                            additional: tempElement
                        });
                    }
                });
            }
        }

        /**
         * Populates combo array
         * @param {*} node start structure node
         */
        function pushResultsToCombo(node) {
            node.inputCombo([]);
            // add no results label if empty
            if (self.tempArray().length == 0) {
                if (node.noResLabel != undefined) {
                    node.inputCombo.push({
                        value: 0,
                        label: node.noResLabel
                    })
                }
            } else {
                // add all label if specified
                if (node.allLabel != undefined) {
                    node.inputCombo.push({
                        value: 0,
                        label: node.allLabel
                    })
                }
                // push elements to dropdown
                self.tempArray().forEach(function (element) {
                    node.inputCombo.push({
                        value: element[node.comboValueField],
                        label: element[node.comboLabelField],
                        additional: element
                    })
                })
            }
        }
        /**
         * Responsible for identifying exactly where in the structure tree
         * the trigger dropdown occured and then splitting the tree in two parts:
         * - the children tree, containing the branch of the triggered node starting from this node
         *  - the parents tree, containing the rest of the tree
         * @param {*} ojComboName name of ojCombo.js 
         * @param {*} treeStructure start structure tree
         * @param {*} startNode start structure node
         */
        function findStartNode(ojComboName, treeStructure) {
            treeStructure.forEach(function (treeNode) {
                //check if start node
                if (treeNode.ojComboName == ojComboName) {
                    self.startNode(treeNode);
                }
                //if it has children, calls itself
                if (treeNode.children.length > 0) {
                    findStartNode(ojComboName, treeNode.children);
                }
            })
        }

        /**
         * Responsible for filtering triggered dropdown and sets triggered inputRow
         * @param {*} node start structure node
         * @param {*} inputRow row from triggered array 
         */
        function updateStartCombo(node, inputRow) {
            let ojComboDropdown = (self[node.ojComboName]);
            self.tempArray(ojComboDropdown.slice());

            //remove rows based on node.filterArray
            processFilters(self.tempArray, node.filterArray);

            //Extract parent value and row corresponding to id of user selected dropdown value
            let parentValue;
            self.tempArray().forEach(function (element) {
                if (node.parentField && element[node.comboValueField] == node.inputValue()) {
                    inputRow(element);
                    parentValue = element[node.parentField];
                }
            });
            //remove rows != parent val
            for (let i = self.tempArray().length - 1; i >= 0; i--) {
                let element = self.tempArray()[i];
                if (node.parentField && element[node.parentField] != parentValue) {
                    self.tempArray.splice(i, 1);
                }
            }
            pushResultsToCombo(node);
        }

        /**
         * Responsible for removing from array rows with "field: value" pairs different from
         * filterArray "field: value" pairs
         * @param {*} array service array
         * @param {*} filterArray array containing the additional filters
         */
        function processFilters(array, filterArray) {
            if (filterArray != undefined) {
                filterArray.forEach(function (filter) {
                    let filterField = filter.field;
                    let filterValues;
                    if (typeof filter.value == 'function') {
                        filterValues = String(filter.value()).split(",");
                    } else {
                        filterValues = String(filter.value).split(",");
                    }
                    for (let i = array().length - 1; i >= 0; i--) {
                        let filterFlag = true;
                        filterValues.forEach(function (filterValue) {
                            if ((array()[i][filterField]) == filterValue || filterValue == 0) {
                                filterFlag = false;
                            }
                        })
                        if (filterFlag) {
                            array.splice(i, 1);
                        }
                    }
                })
            }
        }

        /**
         *  Responsible for selecting values of child combos after trigger and
         * iteratively filtering them based on trigger parent id field value
         * @param {*} treeNode input structure node
         * @param {*} filterValue triggered dropdown id field value
         * @param {*} filterField triggered dropdown id field name
         */
        function processChildren(treeNode, filterValue, filterField) {
            treeNode.forEach(function (node) {
                self.tempArray((self[node.ojComboName]).slice());
                processFilters(self.tempArray, node.filterArray);
                //remove rows != parent val or != 0
                for (let i = self.tempArray().length - 1; i >= 0; i--) {
                    if (self.tempArray()[i][filterField] != filterValue) {
                        self.tempArray.splice(i, 1);
                    }
                }
                //populate combo
                pushResultsToCombo(node);
                //reset combo value to first record
                let newValue = node.inputCombo()[0].value;
                node.inputValue(newValue);
                //if it has children, calls itself
                if (node.children.length > 0) {
                    //if no all is defined, then new children filter is this combo value
                    if (newValue != 0) {
                        processChildren(node.children, newValue, node.comboValueField);
                    }
                    processChildren(node.children, filterValue, filterField);
                }
            })
        }

        /**
         *  Responsible for selecting values of parent combos after trigger and
         * iteratively filtering them based on immediate parent value.
         * @param {*} parentTreeStructure input structure node
         * @param {*} inputRow row from triggered array
         * @param {*} filterValue parent value to filter child set
         */
        function processParents(treeStructure, inputRow, filterValue, componentId) {
            treeStructure.forEach(function (node) {
                //stops in start node
                if (node.ojComboName != componentId) {

                    self.tempArray((self[node.ojComboName]).slice());
                    processFilters(self.tempArray, node.filterArray);
                    // if parent exist we need to filter dropdown results
                    if (filterValue != undefined) {
                        for (let i = self.tempArray().length - 1; i >= 0; i--) {
                            if (self.tempArray()[i][node.parentField] != filterValue && filterValue != 0) {
                                self.tempArray.splice(i, 1);
                            }
                        }
                    }
                    pushResultsToCombo(node);
                    // if this node is part of starting branch, set value from input row,
                    //otherwise set value from parent dropdown

                    const comboVal = inputRow[node.comboValueField];
                    if (comboVal) {
                        node.inputValue(inputRow[node.comboValueField]);
                    } else {
                        node.inputValue(node.inputCombo()[0].value);
                    }
                    // if has children, calls itself
                    if (node.children.length > 0) {
                        processParents(node.children, inputRow, node.inputValue(), componentId);
                    }
                }
            })
        }

        function resetCombos(treeStructure) {
            treeStructure.forEach(function (node) {
                node.inputValue(0);
                self.tempArray((self[node.ojComboName]).slice());
                processFilters(self.tempArray, node.filterArray);
                pushResultsToCombo(node);
                node.inputValue(node.inputCombo()[0].value);
                if (node.children.length > 0) {
                    resetCombos(node.children);
                }
            })
        }

        return {
            getStatusActive: function (newVal) {
                if (newVal) {
                    self.statusActiveVal(newVal);
                }
                return '' + self.statusActiveVal();
            },
            /**
             * Handles all the logic behind tree based dependant dropdowns
             * @param {*} componentId html component id
             * @param {*} treeStructure tree structure defined in page js
             */
            updateComboTree: function (componentId, treeStructure, forceFlag) {

                findStartNode(componentId, treeStructure);

                // reset combos if user selects "all"
                if (self.startNode().inputValue() == 0 && !forceFlag) {
                    resetCombos(treeStructure);
                } else {
                    let inputRow = ojet.createInput();
                    // Extract input row and filter triggered dropdown
                    updateStartCombo(self.startNode(), inputRow);
                    // filter children dropdowns based on selected value
                    // and set their values to first row
                    if (self.startNode().children.length > 0) {
                        let filterValue = self.startNode().inputValue();
                        let filterField = self.startNode().comboValueField;
                        processChildren(self.startNode().children, filterValue, filterField);
                    }
                    //set parent dropdown values and filter them as necessary
                    processParents(treeStructure, inputRow(), undefined, componentId);
                }
            },

            /**
             * Responsible for loading product reference data dropdowns
             * @param {*} serviceKey specific key to identify which type of reference data is desired
             * @param {*} dropdownOptions dropdown array
             * @param {*} filterArray allows up to n filters. Used in processRefDataCombo.
             * @param {*} noResLabel "no results" placeholder label
             * @param {*} allLabel "all" placeholder label
             */
            loadProductRefDataCombo: function (serviceKey, dropdownOptions, filterArray, noResLabel, allLabel) {

                let servicePair = {
                    value: 'id',
                    label: 'value'
                };
                let newKey = (self[serviceKey]);

                if (newKey().length == 0) {
                    return evt.getServiceData('PR',
                        'getReferenceData', {
                            refdatalistid: serviceKey
                        }, {},
                        'message.data.reference_data_list', true).then(function (response) {
                            dropdownOptions([]);
                            newKey(response ? response : []);
                            ////////////////////////////
                            self.tempArray(newKey.slice());
                            processRefDataCombo(servicePair, dropdownOptions, filterArray, noResLabel, allLabel);
                        }).catch(function (resp) {
                            console.log(resp);
                        });
                } else {
                    dropdownOptions([]);
                    self.tempArray(newKey.slice());
                    processRefDataCombo(servicePair, dropdownOptions, filterArray, noResLabel, allLabel);
                }
            },
            // (domain, serviceName, servicePair, payload, data, responsePath,
            // ojComboDropdown, dropdownOptions, filterArray, noResLabel, allLabel)
            loadStaticRefDataCombo: function (domain, serviceName, servicePair, payload, data, responsePath,
                ojComboDropdown, dropdownOptions, filterArray, noResLabel, allLabel) {
                let newKey = (self[ojComboDropdown]);
                if (newKey().length == 0) {
                    return evt.getServiceData(domain, serviceName, payload, data, responsePath, true).then(function (response) {
                        dropdownOptions([]);
                        newKey(response);
                        self.tempArray(newKey.slice());
                        processRefDataCombo(servicePair, dropdownOptions, filterArray, noResLabel, allLabel);
                    }).catch(function (resp) {
                        console.log(resp);
                    });
                } else {
                    dropdownOptions([]);
                    self.tempArray(newKey.slice());
                    processRefDataCombo(servicePair, dropdownOptions, filterArray, noResLabel, allLabel);
                }
            },

            /**
             * Responsible for loading common reference data dropdowns
             * @param {*} serviceKey specific key to identify which type of reference data is desired
             * @param {*} dropdownOptions dropdown array
             * @param {*} filterArray allows up to n filters. Used in processRefDataCombo.
             * @param {*} noResLabel "no results" placeholder label
             * @param {*} allLabel "all" placeholder label
             */
            loadRefDataCombo: function (serviceKey, dropdownOptions, filterArray, noResLabel, allLabel) {

                let servicePair = {
                    value: 'id',
                    label: 'ref_data_value'
                };
                let newKey = (self[serviceKey]);

                if (newKey().length == 0) {
                    return evt.getServiceData('RD',
                        'getReferenceData', {
                            refdata_list_id: serviceKey,
                            show_non_active: 'Y'
                        }, {},
                        'message.data.listreferencedata', true).then(function (response) {
                            dropdownOptions([]);
                            newKey(response ? response : []);
                            ////////////////////////////
                            self.tempArray(newKey.slice());
                            processRefDataCombo(servicePair, dropdownOptions, filterArray, noResLabel, allLabel);
                        }).catch(function (resp) {
                            console.log(resp);
                        });
                } else {
                    dropdownOptions([]);
                    self.tempArray(newKey.slice());
                    processRefDataCombo(servicePair, dropdownOptions, filterArray, noResLabel, allLabel);
                }
            },
            /**
             * Responsible for loading any type of dropdown
             * @param {*} domain data control domain string
             * @param {*} serviceName service name string
             * @param {*} servicePair json that maps value and label to service fields. ex: {value: 'prodclassid',label: 'prodclassname'}
             * @param {*} payload payload json
             * @param {*} data data json
             * @param {*} responsePath string defining path from service response to desired field
             * @param {*} ojComboDropdown ojCombo.js dropdown array name
             * @param {*} dropdownOptions page dropdown array
             * @param {*} filterArray allows up to n filters. Follows this structure: [{field: 'statusvalue',value: "Active"}]
             * @param {*} noResLabel "no results" placeholder label
             * @param {*} allLabel "all" placeholder label
             */
            loadCombo: function (domain, serviceName, servicePair, payload, data, responsePath,
                ojComboDropdown, dropdownOptions, filterArray, noResLabel, allLabel) {
                let newKey = (self[ojComboDropdown]);
                return evt.getServiceData(domain, serviceName, payload, data, responsePath, true).then(function (response) {
                    dropdownOptions([]);
                    newKey(response);
                    self.tempArray(newKey.slice());
                    processRefDataCombo(servicePair, dropdownOptions, filterArray, noResLabel, allLabel);
                }).catch(function (resp) {
                    console.log(resp);
                });
            },
            updateComboFromModel: function (combo, ojComboName) {
                const newCombo = combo.slice();
                if (newCombo[0] && newCombo[0].value === 0) {
                    newCombo.splice(0, 1);
                }
                (self[ojComboName])(newCombo);
            },
            removeDuplicates: function (combo, field) {
                let newCombo = [];
                combo().forEach(function (elem) {
                    let match = false;
                    newCombo.forEach(function (newElem) {
                        if (newElem[field] === elem[field]) {
                            match = true;
                        }
                    });
                    if (!match) {
                        newCombo.push(elem);
                    }
                });
                combo(newCombo);
            }
        }
    }
);
