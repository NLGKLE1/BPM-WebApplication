/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./atradius-common-toast-view.html', './atradius-common-toast-viewModel', 'text!./component.json', 'css!./atradius-common-toast-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('atradius-common-toast', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);