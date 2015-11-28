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
     .state('root.dashboard.load-data', { //TODO: fix dependency on dashboard route
       url: '/load-data',
       params: {
          state: {}
       },
       onEnter: function ($stateParams, $state, $uibModal, FMQ_ANIMATE, FileReader) {
         modalInstance = $uibModal.open({
           animation: FMQ_ANIMATE,
           templateUrl: FMQ_COMPONENTS_PATH + 'load-data/load-data.html',
           controller: 'LoadDataCtrl',
           backdrop: 'static',
           resolve: {
             state: function () {
               return $stateParams.state;
             },
             supportsFileReader: function () {
               return FileReader !== false;
             }
           }
         });

         modalInstance.result.then(function(result) {
           $state.go('^', {foundersData: result});
         }, function () {
           $state.go('^');
         });
       },
       onExit: function() {
         modalInstance.close();
       }
   });
 });
