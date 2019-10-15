/**
 * Business Error Component
 * Handles logic behind showing component elements
 * and extracting the information contained in the service
 * response json
 */
define(
    ['jquery'],
    function ($) {

        function businessErrorModel() {
            const self = this;

            // observable variables
            self.errorDescription = ojet.createArray();
            self.messageHeader = ojet.createText('We were unable to process your request because we found errors in your page. Please review and correct them.');
            self.dismissBtn = ojet.createText('DISMISS');

            /**
             * Extracts error descriptions from service response
             * and shows business error component.
             * @param {*} errorlist list of error descriptions from service
             */
            self.businessErrorHandling = function (errorlist) {
                if ((typeof errorlist.description).toString() === 'object') {
                    self.errorDescription(errorlist.description);
                } else {
                    self.errorDescription([errorlist.description]);
                }
                $('#elemBusinessError').show();
            };

            /**
             * Changes disclose button arrow direction and shows/hides
             * error information
             */
            self.toggleDisclose = function () {
                $('#discloseBusinessDesc').toggleClass('oj-fwk-icon-caret02-n oj-fwk-icon-caret02-s');
                const $selectDesc = $('#businessErrorDesc');
                $selectDesc.is(':visible') ? $selectDesc.slideUp() : $selectDesc.slideDown();
            };

            /**
             * Dismisses business error component.
             * Resets dislose button arrow direction and
             * hides both the error header and detail.
             */
            self.dismiss = function () {
                //hide error desciption div
                $('#businessErrorDesc').hide();
                // change directional arrow of disclose button
                $('#discloseBusinessDesc').removeClass('oj-fwk-icon-caret02-n oj-fwk-icon-caret02-s');
                $('#discloseBusinessDesc').addClass('oj-fwk-icon-caret02-s');
                // hide businees error component
                $('#elemBusinessError').hide();
            };
        }

        return businessErrorModel;
    });
