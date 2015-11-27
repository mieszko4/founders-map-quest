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

   'ui.bootstrap',
   'ui.router',
   'LocalStorageModule',
   'uiGmapgoogle-maps',
 ])
 .value('Papa', window.Papa) //inject non-angular services

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
