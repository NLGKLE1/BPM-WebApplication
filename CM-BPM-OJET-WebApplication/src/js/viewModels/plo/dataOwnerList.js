/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define([],
    function() {
   
       function DataOwnerListViewModel() {
         var self = this;
         
         self.dataOwner = ojet.createInput("Data Owner 1");

       }

       return new DataOwnerListViewModel();
     }
   );
   