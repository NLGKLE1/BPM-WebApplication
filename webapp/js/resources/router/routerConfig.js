define(function () {
// THIS FILE IS USED FOR ROUTER CONFIGURATION AND NAVIGATION
  return {
    MainRouter: function () {
      const routerConfig = {
        'login': {
          label: 'Login screen',
          value: 'login'
        },
        'taskManager': {
          label: 'Task Manager',
          value: 'taskManager',
          isDefault: true
        },
        'report': {
          label: 'Report',
          value: 'report'
        },
        'about': {
          label: 'About',
          value: 'about'
        },
      }
      return routerConfig;
    }
  };
});
