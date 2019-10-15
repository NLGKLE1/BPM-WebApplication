/**
 * Technical Error Component
 * Handles logic behind showing component elements
 * and presenting unique id generated in ojEvents
 */
define([], function () {

    function technicalErrorModel() {
        const self = this;

        // unique id observable
        self.errorId = ojet.createInput();
        // Predefined texts
        self.errorInfo1 = ojet.createText('Due to a technical problem on the server we couldnt process your request.');
        self.errorInfo2 = ojet.createText('Please try again');
        self.errorInfo3 = ojet.createText('If the problem persists, call Atradius support for help.');


        /**
         * Shows technical error component and adds
         * trace id to screen
         * @param {*} uniqueId generated SHA1 trace ID
         */
        self.technicalErrorHandling = function (uniqueId) {
            self.errorId('ERROR: ' + uniqueId);
            $('#elemTechnicalError').show();
        };
        /**
         * Dismisses technical error component.
         */
        self.close = function () {
            $('#elemTechnicalError').slideUp();
        };
    }

    return technicalErrorModel;
});
