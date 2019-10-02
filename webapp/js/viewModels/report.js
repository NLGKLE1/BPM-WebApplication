/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtrain', 'ojs/ojbutton'],
  function (ko, $) {

    function ReportViewModel() {
      var self = this;
      function TrainData() {
        
        self.selectedStepValue = ko.observable('stp1');
        self.selectedStepLabel = ko.observable('Step One');
        self.stepArray =
          ko.observableArray(
            [{ label: 'Step One', id: 'stp1' },
            { label: 'Step Two', id: 'stp2' },
            { label: 'Step Three', id: 'stp3' },
            { label: 'Step Four', id: 'stp4' },
            { label: 'Step Five', id: 'stp5' }]);
        self.updateLabelText = function (event) {
          var train = document.getElementById("train");
          self.selectedStepLabel(train.getStep(event.detail.value).label);
        };
      };

      var trainModel = new TrainData();


      $(function () {
        ko.applyBindings(trainModel, document.getElementById('train-container'));
      });
    }
    return new ReportViewModel();
  }
);
