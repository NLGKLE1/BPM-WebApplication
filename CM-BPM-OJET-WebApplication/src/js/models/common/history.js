define([],
    function () {

        return {
            getActivitiesTable: function (tableID, productid, producttype, dataProvider, selectedRow) {
                return evt.updateTable(
                    undefined, tableID, 'PR', 'getActivities', {
                        'productid': productid
                    }, {
                        'producttype': producttype
                    }, dataProvider, 'message.data.activities', selectedRow
                );
            }
        }
    }
);
