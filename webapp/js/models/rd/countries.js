define([],
    function () {
        let countries = [];

        function processRefdataCountries(list) {
            countries = [];
            list.forEach(function (elem) {
                countries.push({
                    'country_id': elem.country_id
                });
            });
        }
        return {
            getRefdataCountries: function (observable, pageUriParams, func) {
                let serviceUriParams = {
                    'refdata_id': pageUriParams.refdata_id,
                    'start_date': pageUriParams.start_date,
                    'end_date': pageUriParams.end_date
                }
                return evt.getServiceData('RD', 'getRefDataCountries', serviceUriParams, {}, 'message.data.listreferencedatacountry',
                    processRefdataCountries).then(function () {
                        func ? func(countries) : countries;
                        observable(countries);
                    });
            }
        }
    });