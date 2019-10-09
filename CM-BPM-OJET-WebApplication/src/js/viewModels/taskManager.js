define(['knockout', 'jquery', "ojs/ojtable", "ojs/ojbutton"],
  function (ko, $) {

    function TaskManagerViewModel() {
      var self = this;

      // Mock Data
      self.mockData = ko.observableArray([
        { taskId: "1", taskName: "Calculater report", dateTime: "2-10-2019 11:36", errors: "1", warnings: "1", comments: "Check with product owner" }
      ]);

      self.taskData = new oj.ArrayDataProvider(
        self.mockData, { idAttribute: "taskId" }
      )

      // buttons
      self.acceptButton = ko.observable(true);
      self.acceptButton(oj.Translations.getTranslatedString('Accept'));

      self.correctButton = ko.observable();
      self.correctButton(oj.Translations.getTranslatedString('correct-buttonText'))

      // enables/disables accept button, not working correctly yet
      console.log(self.mockData()[0].errors);
      
      self.isDisabled = ko.observable();

      self.needsToBeDisabled = function ()
      {
           if (self.mockData()[0].errors > 0)
           return self.isDisabled(true);
           else
               return self.isDisabled(false);
      }
      
      self.needsToBeDisabled();

      self.buttonClick = function () {
        console.log("Number of errors: " + self.mockData()[0].errors);
      }

    }
    return new TaskManagerViewModel();
  }
);