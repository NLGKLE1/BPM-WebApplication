/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
  ['knockout', 'jquery', 'ojL10n!./resources/nls/atradius-dropdown-button-strings'],
  function (ko, $, componentStrings) {

    function ExampleComponentModel(context) {
      var self = this;

      self.lpQueryOtherActions = ojet.createText('label_other');

      //At the start of your viewModel constructor
      var busyContext = oj.Context.getContext(context.element).getBusyContext();
      var options = {
        "description": "CCA Startup - Waiting for data"
      };
      self.busyResolve = busyContext.addBusyState(options);

      self.composite = context.element;

      //Example observable
      self.messageText = ko.observable('Hello from Example Component');
      self.properties = context.properties;
      self.res = componentStrings['atradius-dropdown-button'];

      self.param = ojet.createInput(self.properties.options);

      self.myFunction = function() {
        let dinId = 'dropdown_' + self.properties.attrid;
        let vis = document.getElementById(dinId).style.visibility;
        if(vis === 'visible'){
          document.getElementById(dinId).style.visibility = 'hidden';
        } else{
          document.getElementById(dinId).style.visibility = 'visible';
        }
      }

      // Close the dropdown if the user clicks outside of it
      window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }

      //Once all startup and async activities have finished, relocate if there are any async activities
      self.busyResolve();
    }

    //Lifecycle methods
    ExampleComponentModel.prototype.bindingsApplied = function(context){
      let dinId = 'dropdown_' + context.properties.attrid;
      document.getElementById(dinId).style.marginTop = (0 - context.properties.options.length * 20 - 1) + '%';
    };

    return ExampleComponentModel;
  });