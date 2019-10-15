define(['knockout','models/pl/requestPolicyModel', 'ojEvents'], function (ko, API, ojEvents) {
    const domain = "bd_pl";

    function renameProperties(o, remaneFn) {
        var returnObj = {};
        Object.keys(o).forEach(function(key) {
            returnObj[remaneFn(key)] = o[key];
        })
        return returnObj;
    }

    var MappingUtils = {
        toSnake: function(str) {
            return str.split(/(?=[A-Z])/).join('_').toLowerCase();
        },
        toCamel: function(str){
            return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr) {
                return chr.toUpperCase();
            });
        },
        Object: {
            toSnake: function(o) {
                return renameProperties(o, MappingUtils.toSnake);
            },
            toCamel: function(o){
                return renameProperties(o, MappingUtils.toCamel);
            }         
        }
    }

    return {
        getRequest: function(id) {
            return ojEvents.getServiceData(domain, 'getRequests', {}, MappingUtils.Object.toSnake({
                requestId: ko.unwrap(id)
            }));
        },
        createRequest: function(request) {
            return ojEvents.getServiceData(domain, 'createRequest', request, {}, "results", true);
        },
        actionAccept: function(requestId, taskId) {
            return ojEvents.getServiceData(domain, 'takeActionOverRequest', { "action": "ACCEPT" }, MappingUtils.Object.toSnake({
                requestId: ko.unwrap(requestId),
                taskId: ko.unwrap(taskId)
            }));
        },
        actionReject: function(requestId, taskId) {
            return ojEvents.getServiceData(domain, 'takeActionOverRequest', { "action": "REJECT" }, MappingUtils.Object.toSnake({
                requestId: ko.unwrap(requestId),
                taskId: ko.unwrap(taskId)
            }));
        },
        actionClose: function(requestId, taskId) {
            return ojet.callService(domain, 'takeActionOverRequest', { "action": "CLOSE" }, MappingUtils.Object.toSnake({
                requestId: ko.unwrap(requestId),
                taskId: ko.unwrap(taskId)
            }));
        }
    }

});