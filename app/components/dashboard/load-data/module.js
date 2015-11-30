'use strict';

/**
 * @ngdoc overview
 * @name foundersMapQuestApp.loadData
 * @description
 * # foundersMapQuestApp.loadData
 *
 * LoadData module of the application.
 */
 angular.module('foundersMapQuestApp.loadData', [
   'foundersMapQuestApp.constants',
   'foundersMapQuestApp.foundersManager',

   'ui.bootstrap',
   'ui.router'
 ])
 .value('FileReader', typeof window.FileReader !== 'undefined' ? window.FileReader : false) //inject non-angular services

 .config(function ($stateProvider, FMQ_MODULE_SETTINGS) {
   var modalInstance;
   var moduleSettings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.loadData'];

   $stateProvider
     .state(moduleSettings.routes['load-data'], {
       url: '/load-data',
       params: {
          founders: null
       },
       onEnter: function ($stateParams, $state, $uibModal, FMQ_ANIMATE, FileReader, FoundersFactory) {
         modalInstance = $uibModal.open({
           animation: FMQ_ANIMATE,
           templateUrl: moduleSettings.moduleLocation + 'load-data.html',
           controller: 'LoadDataCtrl',
           backdrop: 'static',
           resolve: {
             founders: function () {
               var founders = $stateParams.founders;

               if (founders !== null) {
                 founders = FoundersFactory.clone(founders);
               } else {
                 founders = FoundersFactory.create(); //default
               }

               return founders;
             },
             supportsFileReader: function () {
               return FileReader !== false;
             }
           }
         });

         modalInstance.result.then(function(founders) {
           $state.go('^', {founders: founders}, {reload: true});
         }, function () {
           $state.go('^');
         });
       },
       onExit: function() {
         modalInstance.close();
       }
   });
 });
