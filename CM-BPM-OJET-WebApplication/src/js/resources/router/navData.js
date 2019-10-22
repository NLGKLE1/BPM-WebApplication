define(function () {
  // THIS FILE IS USED FOR NAVIGATION
  return {
    getDOMenu: function () {
      // Show elements in Data Owner Navigation
      const navDataDataOwner = [
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

      return navDataDataOwner;
    },

    getPLOMenu: function () {
      const navDataProductLineOwner = [
        {
          'attr': {
            name: 'Data Owners',
            id: 'dataownerlist'
          }
        }
      ]
      return navDataProductLineOwner;
    }

  }





});
