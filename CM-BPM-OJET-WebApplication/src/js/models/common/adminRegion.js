define([],
    function () {
        let adminRegionList = [];
        function processAdminRegions(res) {
            adminRegionList = [];
            res.forEach(function (adminRegion) {
                adminRegionList.push({
                    "code": adminRegion.code,
                    "country_code": adminRegion.country_code,
                    "value": adminRegion.value
                });
            });
        };

        return {
            getAdministrativeRegionDropdown: function (observable, dataParams, noresStr, allStr, filter) {
                const dropdownFilter = filter ? filter : [];
                return ojCombo.loadCombo(
                    'RD',
                    'getAdministrativeRegion', {
                        value: 'country_code',
                        label: 'value'
                    }, {
                        country_code: dataParams ? dataParams.region_code : null
                    }, {},
                    'message.data.listadminregions', 'countries',
                    observable, dropdownFilter,
                    noresStr, allStr
                );
            },
            getAdministrativeRegion: function (observable, func) {
                return evt.getServiceData(
                    'RD',
                    'getAdministrativeRegion',
                    {}, {}, 'message.data.listadminregions',
                    processAdminRegions
                ).then(function(data) {
                    func ? func(adminRegionList) : adminRegionList;
                    if(observable) observable(adminRegionList);
                    return data; 
                });
            }
        }
    }
);