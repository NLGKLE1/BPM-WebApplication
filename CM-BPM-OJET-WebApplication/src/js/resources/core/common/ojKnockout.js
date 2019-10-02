define([
    'jquery',
    'knockout'
], function ($, ko) {
    /**
     * HOW TO USE:
     * 
     * Translation readable and direct on the element without polute the ViewModel.
     * 
     * Use in data-bind: translation: '{{ your n10.js translation key }}'  
     * 
     * Example:
     * ```
     * <div>
     *   <a href="#" data-bind="translation: 'pr-title'"></a>
     *   <div data-bind="translation: 'pr-contract-content'"></div>
     * </div>
     * ```
     */
    if (!ko.bindingHandlers.translation) {
        window.locale = ko.observable("");

        function getOptions(options) {
            let _opts = {};
            if(typeof(options)==="string"){
                _opts.key = options;
            } else {
                _opts = options;
            }

            return ko.utils.extend({
                key: "", place: "text"
            }, _opts);
        }

        ko.bindingHandlers.translation = {
            init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                if (!window.locale) {
                    window.locale = ko.observable("");
                    console.warn("User instance is not available to follow changes...");
                }
                window.locale.subscribe(function () {
                    ko.bindingHandlers.translation.update(element, valueAccessor, allBindings, viewModel, bindingContext);
                });
                
                let options = getOptions(valueAccessor());

                if(ko.bindingHandlers[options.place].init) ko.bindingHandlers[options.place].init(element, options.key, allBindings, viewModel, bindingContext);
            },
            update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                let options = getOptions(valueAccessor());
                ko.bindingHandlers[options.place].update(element, function () {
                    return oj.Translations.getTranslatedString(ko.unwrap(options.key)) 
                }, allBindings, viewModel, bindingContext);
            }
        };
    }



    /**
     * HOW TO USE:
     * 
     * Collapse effect quick without polute ViewModel:
     * 
     * Use in data-bind: collapsible: {
     *  target: '{{ selector to de inner element that will be collapsed }}',
     *  trigger: '{{ selector to de inner element that trigger the collapse behaviour }}',
     *  on: { 
     *      firstTime: '{{ function<Promise> callback when openned at the first time }}'
     *  }
     * }
     * 
     * Example:
     * 
     * <div data-bind="collapsible: { target:'.panel', trigger:'a', on: { firstTime: function() { alert('LOL') } } }">
     *   <a href="#">Section</a>
     *   <div class="panel">Content</div>
     * </div>
     */
    if (!ko.bindingHandlers.collapsible) {
        var $ = require("jquery");

        ko.bindingHandlers.collapsible = {
            init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var options = ko.unwrap(valueAccessor());

                var trigger = $(element).find(options.trigger);
                var target = $(element).find(options.target);

                // 1) if observable was passed, it will used it, 
                // 2) if a boolean was passed, it will use it, if both was not set, 
                // 3) it will fallback in the visibility of the target
                var $collapsed = ko.isObservable(options.collapsed) ? options.collapsed : ko.observable(typeof options.collapsed != 'undefined' ? options.collapsed : !$(target).is(':visible'));

                var context = bindingContext.extend(valueAccessor);
                context["$collapsed"] = $collapsed;
                ko.applyBindingsToDescendants(context, element);

                $(trigger).click(function () {
                    $collapsed(!$collapsed());
                });

                function show() {
                    var target = $(element).find(options.target);
                    if (target.length > 0) {
                        target.slideDown();
                    } else { console.warn("Element 'target' (", options.target, ") within (", element, ") is not found, check if it's expected ") }
                }
                function hide() {
                    var target = $(element).find(options.target);
                    if (target.length > 0) {
                        target.slideUp();
                    } else { console.warn("Element 'target' (", options.target, ") within (", element, ") is not found, check if it's expected ") }
                }

                var firstTimeShown = ko.observable(false);

                $collapsed.subscribe(function () {
                    // Case of a hide is desired
                    if ($collapsed()) {
                        hide();
                    } else {
                        // If it's the first time openned
                        if (!firstTimeShown()) {
                            //Mark as already openned
                            firstTimeShown(true);

                            // In case of a callback is set
                            if (options.on && options.on.firstTime) {
                                // Register return
                                var returnFirstTime = options.on.firstTime(context.$data);

                                // Check if it's a promise to offer async support
                                if (returnFirstTime && returnFirstTime.then) {
                                    // Case of promise returned
                                    returnFirstTime.then(function () {
                                        show();
                                    });
                                } else {
                                    // Case of not return a promise
                                    show();
                                }
                            } else {
                                // Case of no callback was set but it's the first time
                                show();
                            }

                        } else {
                            // Case of it's not the first time
                            show();
                        }
                    }
                });

                // Triggers to run at the first time
                $collapsed.valueHasMutated();

                return { controlsDescendantBindings: true };
            },
            update: function (element, valueAccessor, allBindings, viewModel, bindingContext) { }
        };
    }


    ko.bindingHandlers.placeholder = {
        update: function (element, valueAccessor, allBindingsAccessor) {
            let translated = oj.Translations.getTranslatedString(ko.unwrap(valueAccessor()))
            ko.applyBindingsToNode(element, { attr: { placeholder: translated } });
        }
    };

    /**
     * Dirty flag
     * 
     * Helps you to track or detect when a observable or an object with observables is modified
     * 
     * ```
     * function Item() {
     *  this.name = ko.observable("John");
     *  this.dirtyFlag = ko.dirtyFlag(this);
     * }
     * 
     * var item = new Item();
     * console.log(item.dirtyFlag.isDirty());
     * item.name("Andre");
     * console.log(item.dirtyFlag.isDirty());
     * item.dirtyFlag.reset();
     * console.log(item.dirtyFlag.isDirty());
     * ```
     * 
     */
    ko.dirtyFlag = function (root, isInitiallyDirty) {
        var result = function () { },
            _initialState = ko.observable(ko.toJSON(root)),
            _isInitiallyDirty = ko.observable(isInitiallyDirty);

        /**
         * Check if it was modified or not
         * @returns {boolean}
         */
        result.isDirty = ko.computed(function () {
            return _isInitiallyDirty() || _initialState() !== ko.toJSON(root);
        });

        /**
         * Sets current state or value as initial state
         */
        result.reset = function () {
            _initialState(ko.toJSON(root));
            _isInitiallyDirty(false);
        };

        /**
         * Get initial state or value
         */
        result.initialState = function () {
            return _initialState;
        }

        return result;
    };

    ko.observable.fn.silentUpdate = function (value) {
        this.notifySubscribers = function () { };
        this(value);
        this.notifySubscribers = function () {
            ko.subscribable.fn.notifySubscribers.apply(this, arguments);
        };
    };


    /**
     * Safe mechanisms of subscription for OJET Composites
     */
    (function (ko) {
        function register(componentVM, subscription) {
            componentVM._subscriptions = componentVM._subscriptions || [];
            componentVM._subscriptions.push(subscription);

            if (!(componentVM.disconnected)) {
                componentVM.disconnected = function (context) {
                    componentVM._subscriptions.forEach(function (listener) {
                        listener.dispose();
                    });
                };
                componentVM._subscriptions = [];
            }
        }

        function getArgumentsArray(argList) {
            let argsArray = [];
            for (key in argList) {
                if (argList.hasOwnProperty(key)) argsArray.push(argList[key]);
            }
            return argsArray;
        }

        ko.safeComputed = function () {
            let args = getArgumentsArray(arguments);
            let componentViewModel = args.shift();
            let subscription = ko.computed.apply(null, args);
            register(componentViewModel, subscription);
            return subscription;
        };

        ko.observable.fn.safeSubscribe = function () {
            let args = getArgumentsArray(arguments);
            let componentViewModel = args.shift();
            let subscription = ko.observable.fn.subscribe.apply(this, args);
            register(componentViewModel, subscription);
            return subscription;
        };
    })(ko);

    if (ko.bindingHandlers.orderable) {
        ko.bindingHandlers.orderable = {
            getProperty: function (o, s) {
                // copied from http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
                s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
                s = s.replace(/^\./, '');           // strip a leading dot
                var a = s.split('.');
                while (a.length) {
                    var n = a.shift();
                    if (n in o) {
                        o = o[n];
                    } else {
                        return;
                    }
                }
                return o;
            },

            compare: function (left, right) {
                if (typeof left === 'string' || typeof right === 'string') {
                    return left ? left.localeCompare(right) : 1;
                }
                if (left > right)
                    return 1;

                return left < right ? -1 : 0;
            },

            sort: function (viewModel, collection, field) {
                //make sure we sort only once and not for every binding set on table header
                if (viewModel[collection].orderField() == field) {
                    viewModel[collection].sort(function (left, right) {
                        var left_field = ko.bindingHandlers.orderable.getProperty(left, field);
                        var right_field = ko.bindingHandlers.orderable.getProperty(right, field);
                        var left_val = (typeof left_field === 'function') ? left_field() : left_field;
                        right_val = (typeof right_field === 'function') ? right_field() : right_field;
                        if (viewModel[collection].orderDirection() == "desc") {
                            return ko.bindingHandlers.orderable.compare(right_val, left_val);
                        } else {
                            return ko.bindingHandlers.orderable.compare(left_val, right_val);
                        }
                    });
                }
            },

            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                //get provided options
                var collection = valueAccessor().collection;
                var field = valueAccessor().field;

                //add a few observables to ViewModel to track order field and direction
                if (viewModel[collection].orderField == undefined) {
                    viewModel[collection].orderField = ko.observable();
                }
                if (viewModel[collection].orderDirection == undefined) {
                    viewModel[collection].orderDirection = ko.observable("asc");
                }

                var defaultField = valueAccessor().defaultField;
                var defaultDirection = valueAccessor().defaultDirection || "asc";
                if (defaultField) {
                    viewModel[collection].orderField(field);
                    viewModel[collection].orderDirection(defaultDirection);
                    ko.bindingHandlers.orderable.sort(viewModel, collection, field);
                }

                //set order observables on table header click
                $(element).click(function (e) {
                    e.preventDefault();

                    //flip sort direction if current sort field is clicked again
                    if (viewModel[collection].orderField() == field) {
                        if (viewModel[collection].orderDirection() == "asc") {
                            viewModel[collection].orderDirection("desc");
                        } else {
                            viewModel[collection].orderDirection("asc");
                        }
                    }

                    viewModel[collection].orderField(field);
                });

                //order records when observables changes, so ordering can be changed programmatically
                viewModel[collection].orderField.subscribe(function () {
                    ko.bindingHandlers.orderable.sort(viewModel, collection, field);
                });
                viewModel[collection].orderDirection.subscribe(function () {
                    ko.bindingHandlers.orderable.sort(viewModel, collection, field);
                });
            },

            update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                //get provided options
                var collection = valueAccessor().collection;
                var field = valueAccessor().field;
                var isOrderedByThisField = viewModel[collection].orderField() == field;

                //apply css binding programmatically
                ko.bindingHandlers.css.update(
                    element,
                    function () {
                        return {
                            sorted: isOrderedByThisField,
                            asc: isOrderedByThisField && viewModel[collection].orderDirection() == "asc",
                            desc: isOrderedByThisField && viewModel[collection].orderDirection() == "desc"
                        };
                    },
                    allBindingsAccessor,
                    viewModel,
                    bindingContext
                );
            }
        };

    }
});