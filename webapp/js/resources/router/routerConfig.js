define(function () {
  // THIS FILE IS USED FOR ROUTER CONFIGURATION AND NAVIGATION
  return {
    MainRouter: function () {
      const routerConfig = {
        'empty': {
          label: 'Empty',
          value: 'common/empty',
          isDefault: true
        },
        'taskManager': {
          label: 'Task Manager',
          value: 'do/taskManager'
        },
        'report': {
          label: 'Report',
          value: 'do/report'
        },
        'dataownerlist': {
          label: 'List of Data Owners',
          value: 'plo/dataOwnerList'
        }
      }
      return routerConfig;
    }
  };
});
