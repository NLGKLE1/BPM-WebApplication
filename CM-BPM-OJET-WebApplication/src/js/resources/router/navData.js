define(function () {
  // THIS FILE IS USED FOR NAVIGATION
  return {
    getMenu: function () {

      // Show elements in Main Navigation
      const navDataInternal = [
        {
          'attr': {
            name: 'Task Manager',
            id: 'taskManager',
            isDefault: true
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
    },

    getPLOMenu: function () {

    }

  }

   

  

});
