define([],
    function () {
        function commonValidationWarning() {
            const self = this;
            self.validationMessage = ojet.createInput('');

            //Close Validator Header warning
            self.closeMessage = function () {
                $('#popupValidationWarning').slideUp();
            };
            //Show Validator Header warning
            self.openMessage = function (warningmessage) {
                self.validationMessage(warningmessage);
                $('#popupValidationWarning').slideDown();
            };
        }
        return commonValidationWarning;
    });
    