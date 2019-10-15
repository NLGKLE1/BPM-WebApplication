define([],
    function () {

        return {
            getReferenceData: function (observable, pageUriParams, func) {
                let serviceUriParams = {
                    'refdatalistid': pageUriParams.refdatalistid,
                    'refdatacode': pageUriParams.refdatacode,
                    'languagecode': pageUriParams.languagecode,
                    'startdate': pageUriParams.startdate,
                    'enddate': pageUriParams.enddate,
                    'shownonactive': pageUriParams.shownonactive
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
                return evt.getServiceData('PR', 
                'getReferenceData', serviceUriParams, {}, 'message.data.referencedatalist', processGet).then(function () {
                    func ? func(refdataList) : refdataList;
                    observable(refdataList);
                });
            }
        }
    });
