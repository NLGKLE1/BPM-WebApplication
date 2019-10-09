/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton'],
  function (ko, $) {

    function ReportViewModel() {
      var self = this;

      // hardcode arrays for testing purposes
      self.calculatorArray = [{ label: 'Step One', id: 'stp1' },
      { label: 'Step Two', id: 'stp2' },
      { label: 'Step Three', id: 'stp3' },
      { label: 'Step Four', id: 'stp4' },
      { label: 'Step Five', id: 'stp5' },
      { label: 'step six', id: 'stp6' },
      { label: 'step seven', id: 'stp7' },
      { label: 'step eight', id: 'stp8' }];

      self.bondsArray = [{ label: 'Step Six', id: 'stp6' },
      { label: 'Step Seven', id: 'stp7' },
      { label: 'Step Eight', id: 'stp8' },
      { label: 'Step Nine', id: 'stp9' },
      { label: 'Step Ten', id: 'stp10' }];

      var calculatorSelectedStepValue = self.calculatorArray[0].id
      var calculatorSelectedStepLabel = self.calculatorArray[0].label

      var bondsSelectedStepValue = self.bondsArray[0].id
      var bondsSelectedStepLabel = self.bondsArray[0].label

      // Calculator train function to show selected step
      function CalculatorTrainData(newArray, selectedValue, selectedLabel) {
        self.selectedStepValue = ko.observable(selectedValue);
        self.selectedStepLabel = ko.observable(selectedLabel);
        self.stepArray =
          ko.observableArray(newArray);
        self.updateLabelText = function (event) {

          var train = document.getElementById("Calculator-train");
          self.selectedStepLabel(train.getStep(event.detail.value).label);
        };
      };

      var calculatorTrain = new CalculatorTrainData(self.calculatorArray, calculatorSelectedStepValue, calculatorSelectedStepLabel);

      // Bonds train function to show selected step
      function BondsTrainData(newArray, selectedValue, selectedLabel) {
        self.selectedStepValue = ko.observable(selectedValue);
        self.selectedStepLabel = ko.observable(selectedLabel);
        self.stepArray =
          ko.observableArray(newArray);
        self.updateLabelText = function (event) {

          var train = document.getElementById("Bonds-train");
          self.selectedStepLabel(train.getStep(event.detail.value).label);
        };
      };
      var bondsTrain = new BondsTrainData(self.bondsArray, bondsSelectedStepValue, bondsSelectedStepLabel)
    }
    return new ReportViewModel();
  }
);
