/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

requirejs.config(
  {
    baseUrl: 'js',
    // Path mappings for the logical module names
    paths :
//injector:mainReleasePaths

{
  "knockout":"libs/knockout/knockout-3.5.0.debug",
  "jquery":"libs/jquery/jquery-3.4.1",
  "jqueryui-amd":"libs/jquery/jqueryui-amd-1.12.1",
  "promise":"libs/es6-promise/es6-promise",
  "hammerjs":"libs/hammer/hammer-2.0.8",
  "ojdnd":"libs/dnd-polyfill/dnd-polyfill-1.0.0",
  "persist":"libs/persist/debug",
  "ojs":"libs/oj/v7.1.0/debug",
  "ojL10n":"libs/oj/v7.1.0/ojL10n",
  "ojtranslations":"libs/oj/v7.1.0/resources",
  "text":"libs/require/text",
  "signals":"libs/js-signals/signals",
  "touchr":"libs/touchr/touchr",
  "customElements":"libs/webcomponents/custom-elements.min",
  "css":"libs/require-css/css",
  "ojFetch":"libs/core/modules/ojFetch",
  "ojTime":"libs/core/modules/ojTime",
  "ojet":"libs/core/common/ojCommon",
  "ojCombo":"libs/core/common/ojCombo",
  "ojDataControls":"libs/core/bundles/ojDataControls",
  "ojCommonComponents":"libs/core/bundles/ojCommonComponents",
  "ojCommonLibs":"libs/core/bundles/ojCommonLibs",
  "ojCoreComponents":"libs/core/bundles/ojCoreComponents",
  "ojEvents":"libs/core/common/ojEvents",
  "ojLogger":"libs/core/logger/ojLogger",
  "ojNavData":"libs/core/router/ojNavData",
  "ojRouterConfig":"libs/core/router/ojRouterConfig",
  "ojUtils":"libs/core/utils/ojUtils",
  "ojAuth":"libs/core/auth/ojAuth",
  "babel":"libs/core/modules/requirejs-babel/babel.min",
  "es6":"libs/core/modules/requirejs-babel/es6",
  "CryptoJS":"libs/crypto-js"
}

//endinjector
      ,
      // Shim configurations for modules that do not expose AMD
      shim :
        {
          'jquery' :
            {
              exports : ['jQuery', '$']
            },
          'simulate' :
            {
              deps : ['jquery']
            },
          'test' :
            {
              deps : ['jquery', 'knockout', 'ojs/ojcore', 'ojs/ojknockout', 'ojs/ojcomponentcore']
            }
        }
    }
  );

  require(['ojs/ojbootstrap', 'knockout', 'ojs/ojknockout', 'test'],
    function (Bootstrap)
    {
      Bootstrap.whenDocumentReady().then(
        function () {
          QUnit.load();
          QUnit.start();
      });
    }
  );
