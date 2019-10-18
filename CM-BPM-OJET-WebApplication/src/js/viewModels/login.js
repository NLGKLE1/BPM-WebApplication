define(['resources/composites/oraclejet/rich-text-editor/loader'],
  function () {

    function LoginViewModel() {

      const self = this;

      // RICH TEXT
      self.content = ojet.createInput("OLA");

      self.buttonClick = function (event) {
        var innerHtm = $("#richText")[0].getUpdatedHTML();
        console.log(innerHtm);
        return true;
      }

      // Messages
      // timeout -1 never fades, timeout in miliseconds is the fading timer
      self.messages = ojet.createInput(
        [{
          category: 'UNDER DEVELOPMENT',
          severity: 'warning',
          detail: 'Falta tratar da combo status para permitir multi-selection',
          autoTimeout: 1000
        },
        {
          category: 'LIMITED FUNCTIONALITIES',
          severity: 'info',
          detail: 'Webservices para as combos estão a retornar 0 para o valor All e deviam estar a retornar -1',
          autoTimeout: 1000
        },
        {
          category: 'DEFECT',
          severity: 'error',
          detail: 'Pagination e Número de rows por linha não estão com o estilo definido no FD. Adicionalmente falta o botão Archive',
          autoTimeout: 1000
        }
        ]
      );

      // Loading Screen
      self.loaded = ojet.createInput(true);
      self.errorloading = ojet.createInput(false);
      self.firstLoad = ojet.createInput(false);

      // Texts
      self.title = ojet.createText('login-titlelogin');

      // buttons
      self.loginButtonText = ojet.createText('login-loginButtonText');

      //labels 
      self.userLabel = ojet.createText('login-userLabel');
      self.pwLabel = ojet.createText('login-pwLabel');

      //inputs
      self.loginValue = ojet.createInput();
      self.pwValue = ojet.createInput();

      self.cancelButton = function () {
        ojet.goTo('helpCenterSearch');
      };

      // LifeCycle
      self.initialize = function (info) {
      };

      self.dispose = function (info) {
      };

      self.handleActivated = function (info) {
      };

      self.handleDetached = function (info) {
      };

      self.handleBindingsApplied = function (info) {
      };

      self.handleDeactivated = function (info) {
      };

      self.handleAttached = function (info) {
        ojet.initializeStart('main');
       // ojet.loadCSS("css/common/login.css");
      };

      self.handleTransitionCompleted = function (info) {
        if (self.firstLoad()) {
          self.firstLoad(false);
        } else {
          if (self.loaded && self.loaded()) {
            if (self.errorloading()) {
              ojet.initializeFinish();
            } else {
              ojet.initializeFinish('main');
            }
          }
        }
      };

    };

    return new LoginViewModel();
  }
);

