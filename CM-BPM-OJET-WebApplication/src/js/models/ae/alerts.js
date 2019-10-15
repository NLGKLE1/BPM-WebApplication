define([],
    function () {

        let alertList = [];
        let unreadAlert = 0;
        let flaggedAlert = 0;
        function processGetAlerts(resp) {
            alertList = [];
            unreadAlert = 0;
            flaggedAlert = 0;
            resp.forEach(function (alert) {
                const newAlertDate = new Date(alert.alert_creation_date);
                const alertCreationDateLong = newAlertDate.getDate() + ' ' + newAlertDate.toLocaleDateString('default', { month: 'long' }) +
                    ' at ' + (newAlertDate.getHours() <= 12 ? newAlertDate.getHours() : newAlertDate.getHours() - 12) + ':' +
                    (newAlertDate.getMinutes() < 10 ? '0' + newAlertDate.getMinutes() : newAlertDate.getMinutes()) +
                    (newAlertDate.getHours() < 12 ? ' AM' : ' PM');

                newAlert = {
                    "alert_id": alert.alert_id,
                    "event_not_subject_id": alert.event_not_subject_id,
                    "notification_id": alert.notification_id,
                    "alert_user_id": alert.alert_user_id,
                    "organization_id": alert.organization_id,
                    "alert_title": alert.alert_title,
                    "alert_body": alert.alert_body,
                    "alert_body_short": alert.alert_body.length > 80 ? alert.alert_body.slice(0, 80) + '...' : alert.alert_body,
                    "alert_read_flag": alert.alert_read_flag,
                    "alert_important_flag": alert.alert_important_flag,
                    "alert_creation_date": alert.alert_creation_date,
                    "alert_done_date": alert.alert_done_date,
                    "alert_handling_user_id": alert.alert_handling_user_id,
                    "event_not_subject_desc": alert.event_not_subject_desc,
                    "alert_creation_date_long": alertCreationDateLong
                }
                if (newAlert.alert_read_flag === 'N') {
                    unreadAlert++;
                }
                if (newAlert.alert_important_flag === 'Y') {
                    flaggedAlert++;
                }
                let match = false;
                alertList.forEach(function (listAlert) {
                    if (listAlert.event_not_subject_id === newAlert.event_not_subject_id) {
                        match = true;
                        listAlert.alert_list.push(newAlert);
                    }
                });
                if (!match) {
                    alertList.push({
                        "event_not_subject_id": newAlert.event_not_subject_id,
                        alert_list: [newAlert]
                    });
                }
            });
            // sort inner array

            alertList.forEach(function (alert) {
                sortDateArray(alert.alert_list, 'alert_creation_date');
            });
            // add most recent alert to outer object and remove from array
            alertList.forEach(function (alert) {
                alert.most_recent_alert = alert.alert_list[0];
                alert.alert_list.splice(0, 1);
            });
            // sort outer array
            sortDateArray(alertList, 'most_recent_alert.alert_creation_date');
        }

        function sortDateArray(array, field) {
            array.sort(function (a, b) {
                a = new Date(ojet.getProperty(field, a));
                b = new Date(ojet.getProperty(field, b));
                return a > b ? -1 : a < b ? 1 : 0;
            });
        }

        return {
            // pageURIParams: 'user_id', 'org_id', 'read_flag', 'important_flag', 'done_date', 'handling_user'
            getAlerts: function (observable, pageURIParams, unreadObs, flaggedObs) {
                let serviceURIParams = {
                    'user_id': pageURIParams.user_id,
                    'org_id': pageURIParams.org_id,
                    'read_flag': pageURIParams.read_flag,
                    'important_flag': pageURIParams.important_flag,
                    'done_date': pageURIParams.done_date,
                    'handling_user': pageURIParams.handling_user
                };
                return evt.getServiceData(
                    'AE',
                    'getAlerts', serviceURIParams, {},
                    'results.alertlist', processGetAlerts).then(function () {
                        observable(alertList);
                        if(unreadObs) unreadObs(unreadAlert);
                        if(flaggedObs) flaggedObs(flaggedAlert);
                    });
            },
            // pageURIParams: 'alert_id'
            updateAlerts: function (pageDataParams) {
                let serviceDataParams = { alertslistflags: [] };
                pageDataParams.forEach(function (elem) {
                    serviceDataParams.alertslistflags.push({
                        "alert_id": elem.alert_id,
                        "alert_read_flag": elem.alert_read_flag,
                        "alert_important_flag": elem.alert_important_flag,
                        "alert_done_date": elem.alert_done_date,
                    });
                });
                ojet.removeObjectFields(serviceDataParams);
                return evt.getServiceData('AE', 'updateAlerts', {},
                    serviceDataParams, '', true);
            },
            // pageURIParams: 'alert_id'
            deleteAlerts: function (pageURIParams) {
                let serviceURIParams = {
                    'alert_id': pageURIParams.alert_id
                };
                return evt.getServiceData('AE', 'deleteAlerts', serviceURIParams,
                    {}, '', true);
            },
        }
    }
);
