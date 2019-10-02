define(['ojs/ojcore', 'knockout', 'jquery', "ojs/ojlistview", "ojs/ojdataprovider", "ojs/ojoption", "ojs/ojcheckboxset" ],
  function (oj, ko, $) {

    function TaskManagerViewModel() {
      var self = this;

      self.title = ko.observable("Data to check");   

      self.mockData = [
        { name: "Every data owner has 1 task to check and not more", id: "1" },

      ];

      self.taskData = new oj.ArrayDataProvider(
        self.mockData, {idAttribute: "id"}
      )
    
      
    }
    return new TaskManagerViewModel();
  }
);