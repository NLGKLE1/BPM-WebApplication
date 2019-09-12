
/*
 * Your application specific code will go here
 */
define(['knockout', 'ojs/ojmodule-element-utils', 'ojs/ojknockouttemplateutils', 'ojs/ojrouter', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'ojs/ojarraydataprovider',
  'ojs/ojoffcanvas', 'ojs/ojmodule-element', 'ojs/ojknockout', 'ojs/ojbootstrap', 'ojs/ojarraytreedataprovider', 'ojs/ojmodule-element-utils'],
  function (ko, moduleUtils, KnockoutTemplateUtils, Router, ResponsiveUtils, ResponsiveKnockoutUtils, ArrayDataProvider, OffcanvasUtils, Bootstrap, ArrayTreeDataProvider, ModuleElementUtils) {
    function ControllerViewModel() {

      var self = this;

      this.KnockoutTemplateUtils = KnockoutTemplateUtils;

      // Media queries for repsonsive layouts
      var smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

      // Change default URL adapter
      Router.defaults['urlAdapter'] = new Router.urlParamAdapter();

      // Retrieve the router static instance and configure the states
      var router = Router.rootInstance;
      // Each state value property is a transfer object
      router.configure({
        'data': { label: 'Data-dashboard' },
        'book':
        {
          label: 'Book',
          value: router.createChildRouter('chapter', 'book').configure(
            {
              'preface': { label: 'Preface' },
              'chapter1': { label: 'Chapter 1' },
              'chapter2': { label: 'Chapter 2' },
              'chapter3': { label: 'Chapter 3' }
            })
        },
        'about': { label: 'About' }
      });

      router.states.forEach(function (state) {
        console.log(state.value);
      });

      // Build Navigation List model using the states of the router hierarchy
      function buildNavListData(router, parentId) {
        console.log(router);

        var jsonData = [];

        router.states.forEach(function (state) {
          var childrenData = [];

          if (state.value instanceof Router) {
            childrenData = buildNavListData(state.value, state.id);
          }

          let node = {
            'attr':
            {
              // The id is the compound state to transition to this state
              id: parentId ? parentId + '/' + state.id : state.id,
              label: state.label,
              href: '#'
            }
          }
          childrenData.length && (node.children = childrenData);
          jsonData.push(node);
        });

        return jsonData;
      }

      function ViewModel() {
        this.moduleConfig = ko.observable({ view: [], viewModel: null });
        // The list of items
        self.navListData = new ArrayTreeDataProvider(buildNavListData(router), { keyAttributes: 'attr.id' });

        // Navigation List Event handler
        self.selectHandler = function (event) {
          if ('menu' === event.target.id && event.detail.originalEvent) {
            // router takes care of changing the selection
            event.preventDefault();
            // Invoke go() with the selected item.
            router.go(event.detail.item.getAttribute('id'));
          }
        };

        // A computed observable representing the currently selected item in the list
        this.selection = ko.computed(function () {
          var currentState = router.currentState(),
            childRouter, selection, data;
          if (currentState && currentState.id) {
            childRouter = currentState.value;
            if (childRouter) {
              selection = childRouter.stateId();
            }

            if (selection) {
              selection = currentState.id + '/' + selection;
            }
            else {
              selection = currentState.id;
            }
          }

          return selection;
        });

        // A computed observable which listens to the router's state change and
        // creates a module config Promise.
        var moduleConfigPromise = ko.pureComputed(function () {
          var value = router.stateId();
          return ModuleElementUtils.createConfig({
            name: 'ojRouter-nestedNav/' + value,
            params: {
              parentRouter: router
            }
          })
        }.bind(self));

          // When the given module config Promise is resolved, pass it to our own
          // this.moduleConfig observable.
          var updateConfig = function (currentConfigPromise) {
            currentConfigPromise.then(function (moduleConfig) {
              // Guard against multiple router state changes causing modules to load
              // out-of-order by comparing the returned config Promise against the
              // latest in the view model.
              if (currentConfigPromise === moduleConfigPromise.peek()) {
                self.moduleConfig(moduleConfig);
              }
            }.bind(self));
          }.bind(self);
          // Update our moduleConfig with the initial value from the module config Promise
          updateConfig(moduleConfigPromise.peek());
          // When moduleConfigPromise udpates (due to router state change), tell it to
          // update our module config.
          moduleConfigPromise.subscribe(updateConfig.bind(self));
        }

        Bootstrap.whenDocumentReady().then(function () {

          Router.sync().then(function () {         
            ko.applyBindings(new ViewModel(), document.getElementById('routing-container'));

          });
        });

      }
      return new ControllerViewModel();
    });
