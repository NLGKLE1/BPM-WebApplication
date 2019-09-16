define(["ojs/ojcore", "knockout", "jquery", 'ojs/ojinputtext'],
  function (oj, ko, $, ) {

    function LoginViewModel() {
      var self = this;

      // Texts
      self.title = ko.observable();
      self.title(oj.Translations.getTranslatedString('login-titlelogin'))

      // buttons
      self.loginButtonText = ko.observable()
      self.loginButtonText(oj.Translations.getTranslatedString('login-loginButtonText'));

      //labels 
      self.userLabel = ko.observable();
      self.userLabel(oj.Translations.getTranslatedString('login-userLabel'))
      self.pwLabel = ko.observable();
      self.pwLabel(oj.Translations.getTranslatedString('login-pwLabel'))

      //inputs
      // self.loginValue = 
      // self.pwValue = 

    };

    return new LoginViewModel();
  }
);

