define(['knockout', 'jquery', 'ojet', "ojs/ojtable", "ojs/ojbutton"],
  function (ko, $, ojet) {

    function TaskManagerViewModel() {
      var self = this;

      // Mock Data
      self.mockData = ojet.createArray([
        { taskId: "1", taskName: "Calculater report", dateTime: "2-10-2019 11:36", errors: "1", warnings: "1", comments: "Check with product owner" }
      ])

      self.taskData = new oj.ArrayDataProvider(
        self.mockData, { idAttribute: "taskId" }
      )

      // buttons
      self.acceptButton = ojet.createInput(true);
      self.acceptButton(oj.Translations.getTranslatedString('Accept'));

      self.correctButton = ojet.createArray();
      self.correctButton(oj.Translations.getTranslatedString('correct-buttonText'))

      // enables/disables accept button, still working on changing the class
      self.isDisabled = ojet.createInput();

      self.needsToBeDisabled = function () {
        if (self.mockData()[0].errors == 0) {
          return self.isDisabled(true);
        }
        else {
          return self.isDisabled(false);
        }
      };

      self.needsToBeDisabled();

      // click function for buttons
      self.correctButtonClick = function () {
        alert("Data needs to be corrected!")
      }

      self.acceptButtonClick = function () {
        alert("You have accepted the data!")
      }
    }
    return new TaskManagerViewModel();
  }
);