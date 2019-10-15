define([],
    function () {

        return {
            createProductsListValues: function (dataParams) {
                return evt.getServiceData(
                    'PR',
                    'createProductsListValues',
                    {}, {
                        attrlistid: dataParams.attrlistid,
                        value: dataParams.value,
                        description: dataParams.description
                    },
                    'message.data', true
                );
            },
            updateProductsListValues: function (productlistvalueidParam, dataParams) {
                return evt.getServiceData(
                    'PR',
                    'updateProductsListValues', {
                        productlistvalueid: productlistvalueidParam
                    }, {
                        value: dataParams.value,
                        description: dataParams.description
                    },
                    'message.data', true
                );
            },
            deleteProductsListValues: function (productlistvalueidParam) {
                return evt.getServiceData(
                    'PR',
                    'deleteProductsListValues', {
                        productlistvalueid: productlistvalueidParam
                    }, {},
                    'message', undefined
                );
            }
        }
    }
);
