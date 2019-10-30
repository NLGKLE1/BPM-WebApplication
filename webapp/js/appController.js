define(['ojet','resources/router/navData', 'resources/router/routerConfig'
],
  function (ojet, oJNavData, routerConfig) {
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
    }

    return new ControllerViewModel();
  }
);
