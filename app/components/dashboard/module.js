'use strict';

/**
 * @ngdoc overview
 * @name foundersMapQuestApp.dashboard
 * @description
 * # foundersMapQuestApp.dashboard
 *
 * Dashboard module of the application.
 */
 angular.module('foundersMapQuestApp.dashboard', [
   'foundersMapQuestApp.constants',
   'foundersMapQuestApp.loadData',
   'foundersMapQuestApp.showImage',
   'foundersMapQuestApp.table',
   'foundersMapQuestApp.map',
   'foundersMapQuestApp.founders',
   'foundersMapQuestApp.state',

   'ui.bootstrap',
   'ui.router',
   'uiGmapgoogle-maps',
 ])

 .config(function ($stateProvider, FMQ_COMPONENTS_PATH) {
   $stateProvider
    .state('root.dashboard', {
      url: '/dashboard',
      params: {
        label: 'Dashboard',
        foundersData: {}
      },
      views: {
        'main@': {
          templateUrl: FMQ_COMPONENTS_PATH + 'dashboard/dashboard.html',
          resolve: {
            foundersData: function ($stateParams) {
              return $stateParams.foundersData;
            }
          },
          controller: 'DashboardCtrl'
        }
      }
    });
 });
