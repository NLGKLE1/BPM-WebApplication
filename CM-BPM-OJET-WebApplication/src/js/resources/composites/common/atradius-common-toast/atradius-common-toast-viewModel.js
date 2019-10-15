/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(['ojs/ojcore', 'knockout', 'jquery'], 
function (oj, ko, $) {    
  function ViewModel(context) {
    var self = this;

    //At the start of your viewModel constructor
    var busyContext = oj.Context.getContext(context.element).getBusyContext();
    var options = { "description": "CCA Startup - Waiting for data" };
    self.busyResolve = busyContext.addBusyState(options);

    self.composite = context.element;
    self.properties = context.properties;

    self.busyResolve();
    //-----------------------------------------------
    self.toasts = ko.observableArray([]);

    self.toasts.subscribe(function (oldValue) {
        var max = ko.unwrap(self.properties.max) || 3;
        if (max && self.toasts().length > max) {
            self.toasts.shift();
        }
    }, null, "arrayChange");
    
    self.pushMessage = function (messageObj) {
        messageObj = $.extend(true, {
          message: "Action completed successfully.",
          type: "success",
          timeout: 5000
        }, messageObj);

        self.toasts.push(messageObj);
        
        if(messageObj.timeout > 0) {
          messageObj._timeout = setTimeout(function() {
            self.closeMessage(messageObj);
          }, messageObj.timeout);
        }
    };
    
    self.closeMessage = function (messageObj) {
      self.toasts.remove(messageObj);
      clearTimeout(messageObj._timeout);
    };

    self.animateAdd = function(element) {
      if (element.nodeType === 1) {
          $(element).slideDown().queue(function (next) {
              next();
          });
      }
    };

    self.animateRemove = function(element) {
        if (element.nodeType === 1) {
            $(element).slideUp().queue(function (next) {
                $(element).remove();
                next();
            });
        }
    };
  }
  return ViewModel;
});