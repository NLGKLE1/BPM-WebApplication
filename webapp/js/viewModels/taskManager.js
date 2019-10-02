define(['ojs/ojcore', 'knockout', 'jquery', "ojs/ojtable", "ojs/ojarraydataprovider", "ojs/ojbutton"],
  function (oj, ko, $, ArrayDataProvider) {

    function TaskManagerViewModel() {
      var self = this;

      // buttons
      self.acceptButton = ko.observable();
      self.acceptButton(oj.Translations.getTranslatedString('accept-buttonText'));

      self.correctButton = ko.observable();
      self.correctButton(oj.Translations.getTranslatedString('correct-buttonText'))

      // Mock Data
      self.mockData = [
        { taskId: "1", taskName: "Calculater report", dateTime: "2-10-2019 11:36", errors: "0", warnings: "1", comments: "Check with product owner" }

      ];

      self.taskData = new oj.ArrayDataProvider(
        self.mockData, { idAttribute: "taskId" }
      )
    }
    return new TaskManagerViewModel();
  }
);