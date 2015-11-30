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

 .config(function ($stateProvider, FMQ_MODULE_SETTINGS) {
   var modalInstance;
   var moduleSettings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.showImage'];

   $stateProvider
     .state(moduleSettings.routes['show-image'], {
       url: '/show-image',
       params: {
          image: null
       },
       onEnter: function ($stateParams, $state, $uibModal, FMQ_ANIMATE) {
         modalInstance = $uibModal.open({
           animation: FMQ_ANIMATE,
           templateUrl: moduleSettings.moduleLocation + 'show-image.html',
           controller: 'ShowImageCtrl',
           controllerAs: 'vm',
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
