define([],
    function () {
        let partyList = [];
        function processSearchPartyResult(partySearchResult) {
            partyList = [];
            partySearchResult.forEach(function (elem) {
                partyList.push({
                    first_line_name: elem.first_line_name ? elem.first_line_name : '',
                    second_line_name: elem.second_line_name ? elem.second_line_name : '',
                    third_line_name: elem.third_line_name ? elem.third_line_name : '',
                    org_id: elem.org_id,
                    country_id: elem.country_id,
                    first_line_street_addr: elem.first_line_street_addr ? elem.first_line_street_addr : '',
                    second_line_street_addr: elem.second_line_street_addr ? elem.second_line_street_addr : '',
                    third_line_street_addr: elem.third_line_street_addr ? elem.third_line_street_addr : '',
                    co_registered_nr: elem.co_registered_nr,
                    city_name: elem.city_name,
                    vat_nr: elem.vat_nr,
                    post_code: elem.post_code,
                    score: elem.score
                });
            });
        };

        let cityList = [];
        function processCityList(resp) {
            cityList = [];
            resp.forEach(function (elem) {
                cityList.push({
                    "country_id": elem.country_id,
                    "country_name": elem.country_name,
                    "language_code": elem.language_code,
                    "effective_from": elem.effective_from,
                    "effective_to": elem.effective_to,
                    "city_id": elem.city_id,
                    "city_name": elem.city_name,
                    "city_desc": elem.city_desc,
                    "location_name": elem.location_name
                });
            })
        };

        let currencyList = [];
        function processCurrencies(resp) {
            currencyList = [];
            resp.forEach(function (currency) {
                currencyList.push({
                    "currency_code": currency.currency_code,
                    "value": currency.currency_code,
                    "label": currency.currency_code,
                    "validity_flag": currency.validity_flag,
                    "language_code": currency.language_code,
                    "local_currency_name": currency.local_currency_name,
                    "currency_symbol": currency.currency_symbol,
                    "euro_fixed_flag": currency.euro_fixed_flag,
                    "integer_flag": currency.integer_flag,
                    "au_trunc_amt": currency.au_trunc_amt,
                    "stand_ncm_flag": currency.stand_ncm_flag,
                    "value": currency.currency_code,
                    "label": currency.currency_code
                });
            })
        };


        return {
            searchParty: function (pageURIParams, observable) {
                return evt.getServiceData(
                    'SC',
                    'searchParty', {
                        country_id: pageURIParams.country_id,
                        org_name: pageURIParams.org_name,
                        address: pageURIParams.address,
                        city_id: pageURIParams.city_id,
                        region_name: pageURIParams.region_name,
                        post_code: pageURIParams.post_code,
                        co_registered_nr: pageURIParams.co_registered_nr,
                        vat_nr: pageURIParams.vat_nr,
                        org_id: pageURIParams.org_id,
                        other_system_ref_type: pageURIParams.other_system_ref_type,
                        other_system_ref_nr: pageURIParams.other_system_ref_nr
                    }, {},
                    'message.data.organisations',
                    processSearchPartyResult
                ).then(function () {
                    observable(partyList);
                });
            },
            getCountriesDropdown: function (countriesDropdown, noresStr, allStr) {
                ojCombo.loadCombo(
                    'SC',
                    'getCountryList', {
                        value: 'country_id',
                        label: 'country_name'
                    }, {}, {}, 'message.data.countries', 'countries',
                    countriesDropdown, [],
                    noresStr, allStr
                )
            },
            getRegionsDropdown: function (countryID, regionsDropdown, noresStr, allStr) {
                ojCombo.loadCombo(
                    'SC',
                    'getRegionList', {
                        value: 'region_name',
                        label: 'region_name'
                    }, {
                        country_id: countryID
                    }, {}, 'message.data.Country_region_list', 'regions',
                    regionsDropdown, [],
                    noresStr, allStr
                );
            },
            getCitiesDropdown: function (countryID, citiesDropdown, noresStr, allStr) {
                ojCombo.loadCombo(
                    'SC',
                    'getCityList', {
                        value: 'city_id',
                        label: 'city_name'
                    }, {
                        country_id: countryID
                    }, {}, 'message.data.countries_and_cities_names', 'cities',
                    citiesDropdown, [],
                    noresStr, allStr
                );
            },
            // page URI params: currency_code, language_code and validity_flag
            getCityList: function (observable, pageURIParams, func) {
                return evt.getServiceData(
                    'SC',
                    'getCityList', pageURIParams, {},
                    'message.data.countries_and_cities_names',
                    processCityList
                    ).then(function(){
                        func ? func(cityList) : cityList;
                        observable(cityList);
                    });
            },
            // page URI params: currency_code, language_code and validity_flag
            getCurrencyList: function (observable, pageURIParams, func) {
                return evt.getServiceData(
                    'SC',
                    'getCurrencyList', pageURIParams, {},
                    'message.data.currencies',
                    processCurrencies
                ).then(function () {
                    func ? func(currencyList) : currencyList;
                    observable(currencyList);
                });
            }
        }
    }
);
