define(function () {

    return {
        MainRouter: function () {
            const routerConfig = {
                'login': {
                    label: 'Login screen',
                    value: 'login',
                    isDefault: true
                  },
                  'taskManager': {
                    label: 'Task Manager',
                    value: 'taskManager'
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
