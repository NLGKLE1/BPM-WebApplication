/**
 * Require.js config for which modules to use and where to find them
 */

requirejs.config(
{
  baseUrl: 'js',
  paths:
  {
    'knockout': 'libs/knockout/knockout-3.5.0.debug',
    'jquery': 'libs/jquery/jquery-3.4.1',
    'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.1',
    'promise': 'libs/es6-promise/es6-promise',
    'hammerjs': 'libs/hammer/hammer-2.0.8',
    'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
    'ojs': 'libs/oj/v7.1.0/debug',
    'ojL10n': 'libs/oj/v7.1.0/ojL10n',
    'ojtranslations': 'libs/oj/v7.1.0/resources',
    'text': 'libs/require/text',
    'signals': 'libs/js-signals/signals',
    'customElements': 'libs/webcomponents/custom-elements.min',
    'proj4': 'libs/proj4js/dist/proj4-src',
    'css': 'libs/require-css/css.min',
    'touchr': 'libs/touchr/touchr'
  }
}
);

/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojbootstrap', 'knockout', 'appController', 'ojs/ojrouter', 'ojs/ojlogger', 'ojs/ojknockout',
  'ojs/ojmodule', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojbutton', 'ojs/ojtoolbar'],
  function (Bootstrap, ko, app, Router, Logger) { // this callback gets executed when all required modules are loaded
    Bootstrap.whenDocumentReady().then(
      function() {

        function init() {
          Router.sync().then(
            function () {
              app.loadModule();
              // Bind your ViewModel for the content of the whole page body.
              ko.applyBindings(app, document.getElementById('atradius'));
            },
            function (error) {
              console.log('Error in root start: ' + error.message);
            }
          );
        }

        // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready
        // event before executing any code that might interact with Cordova APIs or plugins.
        if (document.body.classList.contains('oj-hybrid')) {
          document.addEventListener("deviceready", init);
        } else {
          init();
        }
      });
  }
);
