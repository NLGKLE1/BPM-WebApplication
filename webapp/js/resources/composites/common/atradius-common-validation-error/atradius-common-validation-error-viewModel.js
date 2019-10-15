define(
    [],
    function () {
        function commonValidationError(context) {
            const self = this;

            self.properties = context.properties

            self.validationTitle = ojet.createInput('');
            self.validationMessage = ojet.createInput('');

            //Close Validator Header warning
            self.closeMessage = function () {
                $('#popupValidationError').slideUp();
            };
            //Show Validator Header warning
            self.openMessage = function (errormessage, errortitle) {
                errortitle ? self.validationTitle(errortitle) : self.validationTitle('');
                errortitle ? $("#validationInfoTitle").show() : $("#validationInfoTitle").hide();
                self.validationMessage(errormessage);
                $('#popupValidationError').slideDown();
            };
        }

        return commonValidationError;
    });
