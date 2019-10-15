define([],
    function () {
        let countries = [];

        function processCountries(list) {
            countries = [];
            list.forEach(function (elem) {
                countries.push({
                    'country_id': elem.country_id,
                    'country_code': elem.country_code,
                    'country_name': elem.country_name
                });
            });
        }

        return {
            getCountryList: function (observable, pageUriParams, func) {
                let serviceUriParams = {};
                if (pageUriParams) {
                    serviceUriParams = {
                        'country_id': pageUriParams.country_id,
                        'code': pageUriParams.country_code,
                        'sub_code': pageUriParams.country_sub_code,
                        'language_code': pageUriParams.language_code,
                        'effective_from': pageUriParams.date_from,
                        'effective_to': pageUriParams.date_to
                    }
                };
                return evt.getServiceData('RD', 'getCountries', serviceUriParams, {}, 'message.data.countries',
                    processCountries).then(function () {
                        func ? func(countries) : countries;
                        observable(countries);
                    });
            }
        }
    });