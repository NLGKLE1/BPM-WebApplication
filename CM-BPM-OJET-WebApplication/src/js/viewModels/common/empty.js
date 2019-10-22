define([],

    function () {

        function EmptyViewModel() {


            // LifeCycle
            self.initialize = function (info) {
            };

            self.dispose = function (info) {
            };

            self.handleActivated = function (info) {
            };

            self.handleDetached = function (info) {
            };

            self.handleBindingsApplied = function (info) {
            };

            self.handleDeactivated = function (info) {
            };

            self.handleAttached = function (info) {
                //ojet.initializeStart('main');
                //ojet.loadCSS("css/common/cs.css");
            };

            self.handleTransitionCompleted = function (info) {
                /*
                if (self.firstLoad()) {
                    self.firstLoad(false);
                } else {
                    if (self.loaded && self.loaded()) {
                        if (self.errorloading()) {
                            ojet.initializeFinish();
                        } else {
                            ojet.initializeFinish('main');
                        }
                    }
                }
                */
            };


        }

        return new EmptyViewModel();
    }
);