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

 .config(function ($stateProvider, $urlRouterProvider, FMQ_MODULE_SETTINGS) {
   var moduleSettings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.error'];
   var notFoundRoute = moduleSettings.routes['not-found'];

   $urlRouterProvider
    .otherwise(function ($injector) {
      $injector.invoke(['$state', function ($state) {
        $state.go(notFoundRoute);
      }]);
    });

   $stateProvider
    .state(notFoundRoute, {
      views: {
        'main': {
          templateUrl: moduleSettings.moduleLocation + '404.html'
        },
      }
    });
 });
