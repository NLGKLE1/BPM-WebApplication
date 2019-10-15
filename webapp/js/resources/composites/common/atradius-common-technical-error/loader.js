/**
 * Technical Error Component loader.
 * Used in across entire application
 * for all business related errors.
 */
// load dependencies
define(['ojs/ojcomposite', 'text!./atradius-common-technical-error-view.html', './atradius-common-technical-error-viewModel',
'text!./component.json', 'css!./atradius-common-technical-error-styles'],
  function(Composite, view, viewModel, metadata) {
    // register component html tag
    Composite.register('atradius-common-technical-error', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);
