/**
 * Loads all library dependencies for the project
 * and global variables
 */
requirejs.config(
  {
    baseUrl: 'js',
    waitSeconds: 0,
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
      'css': 'libs/require-css/css',
      'touchr': 'libs/touchr/touchr',
      'persist': 'libs/persist/min',
      'ojFetch': 'libs/core/modules/ojFetch',
      'ojTime': 'libs/core/modules/ojTime',
      'ojet': 'libs/core/common/ojCommon',
      'ojCommonComponents': 'libs/core/bundles/ojCommonComponents',
      'ojCommonLibs': 'libs/core/bundles/ojCommonLibs',
      'ojCoreComponents': 'libs/core/bundles/ojCoreComponents',
      'ojEvents': 'libs/core/common/ojEvents',
      'ojLogger': 'libs/core/logger/ojLogger',
      'ojNavData': 'libs/core/router/ojNavData',
      'ojRouterConfig': 'libs/core/router/ojRouterConfig',
      'ojUtils': 'libs/core/utils/ojUtils',
      'es6': 'libs/core/modules/requirejs-babel/es6',
      'babel': 'libs/core/modules/requirejs-babel/babel.min',
      'ojCombo': 'libs/core/common/ojCombo',
      'crypto-js': 'libs/crypto-js/crypto-js',
      'ojAuth': 'libs/core/auth/ojAuth'
    },
    shim: {
      'jquery': {
        exports: ['jQuery', '$']
      }
    },
    config: {
      ojL10n: {
        merge: {
          'ojtranslations/nls/ojtranslations': 'resources/nls/l10'
        }
      }
    }
  });

/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojbootstrap', 'knockout', 'appController', 'ojet', 'ojEvents', 'ojUtils', 'text!./varconfig.json', 'ojCombo', 'ojAuth', 'ojFetch',
  'resources/router/navData', 'resources/core/common/ojKnockout', 'resources/core/utils/ojMapping'],
  function (Bootstrap, ko, app, ojet, evt, utils, vars, ojCombo, ojAuth, ojFetch, ojNavData) {
    // add ojet, evt and ojCombo js to global scope
    const varconfig = JSON.parse(vars);
    window.ojet = ojet;
    window.evt = evt;
    window.ojCombo = ojCombo;
    window.site_url = varconfig['base_url'];
    window.logger_url = varconfig['logger_servlet'];

    Bootstrap.whenDocumentReady().then(
      function () {

        self.navListData = ojet.createJSONTreeDataSource(ojNavData.getPLOMenu());;

        //initialize application
        ojet.init(app);

        //Used to check menu status (aberto=open/Fechado=closed)
        let menuAberto = false;

        const slideMenuButton = $('.slideMenuButton');

        //Check browser window size, at certain XXX width resolution, element attributes are manipulated
        $(function () {
          // Optimalisation: Store the references outside the event handler:
          const $window = $(window);
          let openOneTimeOnly = 0;

          //Verify that a certain XXX Resolution has been reached and ensure that these changes only happen between the transition
          function checkWidth() {
            const windowsize = $window.width();

            if ((windowsize < 1025 && openOneTimeOnly === 0) || (windowsize < 1025 && openOneTimeOnly >= 1025)) {
              openOneTimeOnly = windowsize;
              slideMenuButton.show();
              $('.sidebar-menu').hide();

              //Changes the menu button from X to bars
              // slideMenuButton.removeClass('fa-times');
              // slideMenuButton.addClass(' fa-bars');

              //Redefine grid positions in firefox and ie
              $('#atradius').css('grid-template-areas', '"atradiusRed  atradiusRed" "atradiusHeader atradiusHeader" "atradiusMain atradiusMain"');
              $('.atradiusMain').css('-ms-grid-column', '1');

              menuAberto = false;
            }
            if ((windowsize >= 1025 && openOneTimeOnly === 0) || (windowsize >= 1025 && openOneTimeOnly < 1025)) {
              openOneTimeOnly = windowsize;
              slideMenuButton.hide();
              $('.sidebar-menu').show();
              $('.atradiusMenu').show();

              //Redefine grid positions in firefox and ie
              $('#atradius').css('grid-template-areas', '"atradiusRed  atradiusRed" "atradiusHeader atradiusHeader" "atradiusMenu atradiusMain"');
              $('.atradiusMain').css('-ms-grid-column', '2');
            }
          }
          // Execute on load
          checkWidth();
          // Bind event listener
          $(window).resize(checkWidth);
        });

        //Show / Hide Menu
        slideMenuButton.click(function () {

          $('.atradiusMain').css('-ms-grid-column', '2');

          //Changes the menu button from bars to X
          slideMenuButton.removeClass('fa-bars');
          slideMenuButton.addClass(' fa-times');

          //Checks if the menu is open. Redifines grid positions, changes the icon of the menu button and opens and closes the menu
          if (menuAberto) {
            menuAberto = false;

            //Redefine grid positions in firefox and ie
            $('#atradius').css('grid-template-areas', '"atradiusRed  atradiusRed" "atradiusHeader atradiusHeader" "atradiusMain atradiusMain"');
            $('.atradiusMain').css('-ms-grid-column', '1');

            //Hides the menu
            $('.atradiusMenu').hide();
            $('.sidebar-menu').toggle('slide');

            //Changes the menu button from X to bars
            slideMenuButton.removeClass('fa-times');
            slideMenuButton.addClass(' fa-bars');
          }
          else {
            menuAberto = true;

            //Redefine grid positions in firefox and ie
            $('#atradius').css('grid-template-areas', '"atradiusRed  atradiusRed" "atradiusHeader atradiusHeader" "atradiusMenu atradiusMain"');

            //Shows the menu
            $('.atradiusMenu').show();
            $('.sidebar-menu').toggle('slide');
          }
        });
      });

  }
);

