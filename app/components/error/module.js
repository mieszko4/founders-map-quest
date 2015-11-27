'use strict';

/**
 * @ngdoc overview
 * @name foundersMapQuestApp.error
 * @description
 * # foundersMapQuestApp.error
 *
 * Error module of the application.
 */
 angular.module('foundersMapQuestApp.error', [
   'foundersMapQuestApp.constants',

   'ui.router'
 ])

 .config(function ($stateProvider, $urlRouterProvider, FMQ_COMPONENTS_PATH) {
   $urlRouterProvider
    .otherwise(function ($injector) {
      $injector.invoke(['$state', function($state) {
        $state.go('not-found');
      }]);
    });

   $stateProvider
    .state('not-found', {
      views: {
        'main': {
          templateUrl: FMQ_COMPONENTS_PATH + 'error/404.html'
        },
      }
    });
 });
