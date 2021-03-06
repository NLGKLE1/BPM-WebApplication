/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./atradius-dropdown-button-view.html', './atradius-dropdown-button-viewModel', 'text!./component.json', 'css!./atradius-dropdown-button-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('atradius-dropdown-button', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);