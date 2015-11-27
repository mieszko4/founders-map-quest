'use strict';

/**
 * @ngdoc overview
 * @name foundersMapQuestApp.loadData
 * @description
 * # foundersMapQuestApp.loadData
 *
 * About module of the application.
 */
 angular.module('foundersMapQuestApp.loadData', [
   'foundersMapQuestApp.constants',

   'ui.bootstrap',
   'ui.router'
 ])

 .config(function ($stateProvider, FMQ_COMPONENTS_PATH) {
   var modalInstance;

   $stateProvider
     .state('root.dashboard.load-data', {
       url: '/load-data',
       params: {
          state: {}
       },
       onEnter: function ($stateParams, $state, $uibModal, FMQ_ANIMATE) {
         modalInstance = $uibModal.open({
           animation: FMQ_ANIMATE,
           templateUrl: FMQ_COMPONENTS_PATH + 'load-data/load-data.html',
           controller: 'LoadDataCtrl',
           backdrop: 'static',
           resolve: {
             state: function () {
               return $stateParams.state;
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
