define(
    [],
    function () {
        function commonInfoMessages(context) {
            const self = this;

            self.properties = context.properties

            self.infoMessage = ojet.createArray();

            //Close Validator Header warning
            self.closeMessage = function () {
                $('#popupInfoMessage').slideUp();
            };
            //Show Validator Header warning
            self.openMessage = function (infomessage) {
                self.infoMessage(infomessage);
                $('#popupInfoMessage').slideDown();
            };
        }

        return commonInfoMessages;
    });
