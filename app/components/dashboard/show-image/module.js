'use strict';

/**
 * @ngdoc overview
 * @name foundersMapQuestApp.showImage
 * @description
 * # foundersMapQuestApp.showImage
 *
 * ShowImage module of the application.
 */
 angular.module('foundersMapQuestApp.showImage', [
   'foundersMapQuestApp.constants',

   'ui.bootstrap',
   'ui.router'
 ])
 .value('Papa', window.Papa)

 .config(function ($stateProvider, FMQ_COMPONENTS_PATH, $locationProvider) {
   var modalInstance;
   console.log($locationProvider.hashPrefix());

   $stateProvider
     .state('root.dashboard.show-image', {
       url: '/show-image',
       params: {
          image: null
       },
       onEnter: function ($stateParams, $state, $uibModal, FMQ_ANIMATE) {
         modalInstance = $uibModal.open({
           animation: FMQ_ANIMATE,
           templateUrl: FMQ_COMPONENTS_PATH + 'dashboard/show-image/show-image.html',
           controller: 'ShowImageCtrl',
           backdrop: 'static',
           resolve: {
             image: function () {
               return $stateParams.image;
             }
           }
         });

         modalInstance.result.finally(function() {
           $state.go('^');
         });
       },
       onExit: function() {
         modalInstance.close();
       }
   });
 });
