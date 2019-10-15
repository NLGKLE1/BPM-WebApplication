define(function () {
  return {
    getMenu: function () {

      // MAIN NAVIGATION
      const navDataInternal = [
        {
          'attr': {
            name: 'Login screen',
            id: 'login'
          }
        },
        {
          'attr': {
            name: 'Task Manager',
            id: 'taskManager'
          }
        },
        {
          'attr': {
            name: 'Report',
            id: 'report'
          }
        },
        {
          'attr': {
            name: 'About',
            id: 'about'
          }
        }];

      return navDataInternal;
    }

  }

});
