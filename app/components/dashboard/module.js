'use strict';

/**
 * @ngdoc overview
 * @name foundersMapQuestApp.dashboard
 * @description
 * # foundersMapQuestApp.dashboard
 *
 * About module of the application.
 */
 angular.module('foundersMapQuestApp.dashboard', [
   'foundersMapQuestApp.constants',

   'ui.bootstrap',
   'ui.router',
   'LocalStorageModule',
   'uiGmapgoogle-maps',
 ])

 .config(function ($stateProvider, FMQ_COMPONENTS_PATH) {
   $stateProvider
    .state('root.dashboard', {
      url: '/dashboard',
      views: {
        'main@': {
          templateUrl: FMQ_COMPONENTS_PATH + 'dashboard/dashboard.html',
          controller: 'DashboardCtrl'
        }
      }
    });
 });
