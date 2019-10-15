/**
 * Business Error Component loader.
 * Used in across entire application
 * for all business related errors.
 */
// load dependencies
define(['ojs/ojcomposite', 'text!./atradius-common-business-error-view.html', './atradius-common-business-error-viewModel',
'text!./component.json', 'css!./atradius-common-business-error-styles'],
  function(Composite, view, viewModel, metadata) {
    // register component html tag
    Composite.register('atradius-common-business-error', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);
