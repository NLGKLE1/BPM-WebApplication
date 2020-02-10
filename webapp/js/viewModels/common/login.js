define(['knockout', 'jquery', 'ojet', "ojs/ojtable", "ojs/ojbutton"],
    function (ko, $, ojet) {

        self.buttonClick = function(event){
            var innerHtm = $("#richText")[0].getUpdatedHTML();
            console.log(innerHtm);
            return true;
          }

        // Texts
        self.title = oj.Translations.getTranslatedString('login-titlelogin');

        // Labels
        self.userLabel = oj.Translations.getTranslatedString('login-userLabel');
        self.pwLabel = oj.Translations.getTranslatedString('login-pwLabel');

        // Buttons
        self.loginButtonText = oj.Translations.getTranslatedString('login-loginButtonText');

        //inputs
        self.loginValue = ojet.createInput();
        self.pwValue = ojet.createInput();
    });