define(['ojet', 'resources/router/navData', 'resources/router/routerConfig'
],
  function (ojet, ojNavData, routerConfig) {
    function ControllerViewModel() {
      var self = this;

      // Router setup      
      self.router = ojet.getRouterInstance();
      ojet.configureRouter(routerConfig);

      self.moduleConfig = ojet.createInput({
        'view': [],
        'viewModel': null
      });

      //map router
      // const jQuery = function (name) {
      //   const viewPath = 'views/' + name + '.html';
      //   const modelPath = 'viewModels/' + name;
      //   const masterPromise = Promise.all([
      //     ojet.moduleUtils().createView({
      //       'viewPath': viewPath
      //     }),
      //     ojet.moduleUtils().createViewModel({
      //       'viewModelPath': modelPath
      //     })
      //   ]);
      //   masterPromise.then(
      //     function (values) {
      //       self.moduleConfig({
      //         'view': values[0],
      //         'viewModel': values[1]
      //       }).catch(function (errors) {
      //         console.log(errors);
      //       });;
      //     }
      //   );
      // };

      // Router View/ViewModel configuration
        self.loadModule = function () {
          ojet.createComputed(function () {
            var name = self.router.moduleConfig.name();            
            //prepareRouter(name);
          });
        };

        // Homepage Greeting
        self.localeGreeting = ojet.createText('homepage-welcome');

      // Navigation setup


      // // Called by navigation drawer toggle button and after selection of nav drawer item
      // self.toggleDrawer = function () {
      //   return OffcanvasUtils.toggle(self.drawerParams);
      // }
      // // Add a close listener so we can move focus back to the toggle button when the drawer closes
      // document.getElementById('navDrawer').addEventListener("ojclose", document.getElementById('drawerToggleButton').focus());

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ojet.createArray([
        // new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about')
      ]);
    }

    return new ControllerViewModel();
  }
);
