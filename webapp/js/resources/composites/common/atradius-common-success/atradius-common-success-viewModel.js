define([],
    function () {
        function commonActionSuccess() {
            const self = this;
            self.successMessage = ojet.createInput('Action completed successfully.');
            //Close Validator Header warning
            self.closeMessage = function () {
                $('#popupActionSuccess').slideUp();
            };
            //Show Validator Header warning
            self.openMessage = function () {
                $('#popupActionSuccess').slideDown();
            };
        }
        return commonActionSuccess;
    });
    