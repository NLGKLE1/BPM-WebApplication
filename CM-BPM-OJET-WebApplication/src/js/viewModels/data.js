define(['ojs/ojcore', 'knockout', 'jquery' ],
    function(oj, ko, $) {
   
       function DataViewModel() {
         var self = this;

         self.title = ko.observable("Data to check");
       }

       return new DataViewModel();
    }
);