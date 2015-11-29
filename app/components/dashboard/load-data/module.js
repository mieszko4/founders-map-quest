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
   'foundersMapQuestApp.founders',

   'ui.bootstrap',
   'ui.router'
 ])
 .value('FileReader', typeof window.FileReader !== 'undefined' ? window.FileReader : false) //inject non-angular services

 .config(function ($stateProvider, FMQ_COMPONENTS_PATH) {
   var modalInstance;

   $stateProvider
     .state('root.dashboard.load-data', {
       url: '/load-data',
       params: {
          founders: null
       },
       onEnter: function ($stateParams, $state, $uibModal, FMQ_ANIMATE, FileReader, FoundersFactory) {
         modalInstance = $uibModal.open({
           animation: FMQ_ANIMATE,
           templateUrl: FMQ_COMPONENTS_PATH + 'dashboard/load-data/load-data.html',
           controller: 'LoadDataCtrl',
           backdrop: 'static',
           resolve: {
             founders: function () {
               return $stateParams.founders || FoundersFactory.create(); //default
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
