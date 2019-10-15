define([],
    function () {
        let refList = [];

        function processReferenceDataList(list) {
            refList = [];
            list.forEach(function (elem) {
                refList.push({
                    'reflist_id': elem.reflist_id,
                    'reflist_value': elem.reflist_value,
                    'domain_id': elem.domain_id,
                    'domain_value': elem.domain_value,
                    'is_numeric': elem.is_numeric 
                    //=== 'Y' ? true : false
                })
            })
        }
        return {
            getReferenceDataList: function (observable, pageUriParams, func) {
                let serviceUriParams = {
                    'refdata_list_id': pageUriParams.refdata_list_id,
                    'value': pageUriParams.refdata_list_name,
                    'domain_id': pageUriParams.domain_id,
                    'start_date': pageUriParams.start_date,
                    'end_date': pageUriParams.end_date
                }
                return evt.getServiceData('RD', 'getReferenceDataList', serviceUriParams, {}, 'message.data.referencedatalist',
                    processReferenceDataList).then(function () {
                        func ? func(refList) : refList;
                        observable(refList);
                    });
            }
        }
    });