/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['knockout', 'jquery', 'ojet', 'ojs/ojknockout', 'ojs/ojtrain'],
  function (ko, $, ojet) {

    function ReportViewModel() {
      var self = this;

      // Calculator train function to show selected step
      function TrainData() {
        // self.selectedStep = ko.observable('stp3');
        // hardcode arrays for testing purposes
        self.calculatorArray = ojet.createArray([{ label: 'Step One', visited: true, id: 'stp1' },
        { label: 'Step Two',  visited: true, id: 'stp2' },
        { label: 'Step Three',  visited: true, id: 'stp3' },
        { label: 'Step Four',  visited: true, id: 'stp4' },
        { label: 'Step Five', id: 'stp5' },
        { label: 'step six', id: 'stp6' },
        { label: 'step seven', id: 'stp7' },
        { label: 'step eight', id: 'stp8' }]);

        self.bondsArray = ojet.createArray([{ label: 'Step One',  visited: true, id: 'stp1' },
        { label: 'Step Two',  visited: true, id: 'stp2' },
        { label: 'Step Three',  visited: true, id: 'stp3' },
        { label: 'Step Four', id: 'stp4' },
        { label: 'Step Five', id: 'Bondstp5' }]);
      };

      var train = new TrainData();
    }
    return new ReportViewModel();
  }
);
