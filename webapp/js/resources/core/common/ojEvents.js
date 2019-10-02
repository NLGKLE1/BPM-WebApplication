define(['ojet', 'jquery'],
    function (ojet, $) {

        /**
         * Generic error handling function.
         * @param {*} responseStructure structured response json
         */
        function errorHandling(responseStructure) {
            if (!responseStructure.message.response) {
                document.getElementById('elemTechnicalError').technicalErrorHandling(responseStructure.traceID);
                ojet.errorLogServlet('service', responseStructure);
            } else {
                switch (responseStructure.message.response.status) {
                    case 500:
                        // load technical error component
                        document.getElementById('elemTechnicalError').technicalErrorHandling(responseStructure.traceID);
                        ojet.errorLogServlet('service', responseStructure);
                        break;
                    case 409:
                        //load business error component
                        document.getElementById('elemBusinessError').businessErrorHandling(responseStructure.message.response.data.message.header.communication.result);
                        break;
                    default:
                        document.getElementById('elemTechnicalError').technicalErrorHandling(responseStructure.traceID);
                        ojet.errorLogServlet('service', responseStructure);
                }
            }
        }
        return {

            loadServices: function (services) {
                return Promise.all(services).then(function (m) {
                    return 'Services loaded successfully';
                }).catch(function (error) {
                    throw ({
                        'status': 'Error',
                        'message': error
                    });
                });
            },
            updateTable: function (event, tableId, domain, service, payload, data, array, responsePath, selectedRow) {
                let responseStructure = {
                    service: String(service),
                    uriParams: payload,
                    dataParams: data,
                    traceID : ojet.generateSHA1()
                }
                if (selectedRow) {
                    selectedRow({});
                }
                // assumo que usamos sempre ArrayDataProvider para tabelas por isso removi validaçoes
                var tableData;
                if (array.constructor.name === 'ArrayDataProvider') {
                    tableData = array.data;
                } else {
                    tableData = array.dataSource.data;
                }
                tableData.removeAll();
                if (event) {
                    event.disabled = true;
                }
                return ojet.callService(domain, service, payload, data, responseStructure).then(function (response) {
                    if (response.data) {
                        let rowCount = 0;
                        const responseData = ojet.getProperty(responsePath, response.data);
                        rowCount = responseData.length;
                        $.each(responseData, function (i) {
                            tableData.push(responseData[i]);
                        });
                        $('#' + tableId)[0].refresh();
                        if (event) {
                            event.disabled = false;
                        }
                        responseStructure.status = 'Success - Table with ' + rowCount + ' items loaded)';
                        responseStructure.message = responseData;
                        console.log(responseStructure);
                        return responseStructure;
                    } else {
                        if (event) {
                            event.disabled = false;
                        }
                        responseStructure.status = 'Error - No results returned (please check response message)';
                        responseStructure.message = response;
                        console.log(responseStructure);
                        return responseStructure;
                    }
                })
                    // logs error
                    .catch(function (error) {
                        if (event) {
                            event.disabled = false;
                        }
                        responseStructure.status = 'Error';
                        responseStructure.message = error;
                        errorHandling(responseStructure);
                        console.log(responseStructure);
                        throw responseStructure;
                    });
            },
            /**
             * Responsible for performing a generic service call and running a custom fucntion defined in page js
             * @param {*} domain Service Domain
             * @param {*} serviceName service name from in \resources\dataControls\domain
             * @param {*} payload URI/query parameters
             * @param {*} params json for message.data
             * @param {*} responseProperty list name from service response json
             * @param {*} run addition function to be ran after service call. If "true" simply returns service response
             */
            getServiceData: function (domain, serviceName, payload, params, responseProperty, run) {
                let responseStructure = {
                    service: String(serviceName),
                    uriParams: payload,
                    dataParams: params,
                    traceID : ojet.generateSHA1()
                }
                return ojet.callService(domain, serviceName, payload, params, responseStructure).then(function (response) {
                    // if response was successful,
                    if (response.data) {
                        let rd = ojet.getProperty(responseProperty, response.data);
                        if (run != true) {
                            run(rd);
                        }

                        responseStructure.status = 'Success';
                        responseStructure.message = rd;
                        console.log(responseStructure);
                        return rd;
                    } else {
                        responseStructure.status = 'Success';
                        responseStructure.message = 'No data returned';
                        console.log(responseStructure);
                        return responseStructure;
                    }
                })
                    // logs error
                    .catch(function (error) {
                        responseStructure.status = 'Error';
                        responseStructure.message = error;
                        console.log(responseStructure);
                        errorHandling(responseStructure);
                        throw responseStructure;
                    });
            }
        };
    });
