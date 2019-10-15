define([],
    function () {
        let domains = [];

        function processDomains(list) {
            domains = [];
            list.forEach(function (elem) {
                domains.push({
                    'domain_id': elem.domain_id,
                    'domain_name': elem.domain_value
                })
            });
        }
        return {
            getDomainList: function (observable, pageUriParams, func) {
                let serviceUriParams = {
                    'domain_id': pageUriParams.domain_id,
                    'value': pageUriParams.domain_name,
                    'start_date': pageUriParams.start_date,
                    'end_date': pageUriParams.end_date
                }
                return evt.getServiceData('RD', 'getDomain', serviceUriParams, {}, 'message.data.listdomains',
                    processDomains).then(function () {
                        func ? func(domains) : domains;
                        observable(domains);
                    });
            },
            getDomainDropdown: function (domainArray, noresStr, allStr) {
                return ojCombo.loadCombo('RD', 'getDomain', {
                    value: 'domain_id',
                    label: 'domain_value'
                }, {}, {}, 'message.data.listdomains',
                    'domainNames', domainArray, [], noresStr, allStr);
            }
        }
    });