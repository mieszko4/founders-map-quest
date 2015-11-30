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
   'foundersMapQuestApp.foundersManager',
   'foundersMapQuestApp.state',

   'ui.bootstrap',
   'ui.router',
   'uiGmapgoogle-maps',
 ])

 .config(function ($stateProvider, FMQ_MODULE_SETTINGS) {
   var moduleSettings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.dashboard'];

   $stateProvider
    .state(moduleSettings.routes.dashboard, {
      url: '/dashboard',
      params: {
        label: 'Dashboard',
        founders: null
      },
      views: {
        'main@': {
          templateUrl: moduleSettings.moduleLocation + 'dashboard.html',
          resolve: {
            //get founders: from param, from state or new
            founders: function ($stateParams, StateFactory, FoundersFactory) {
              var foundersState = StateFactory.create('fmq.dashboard.founders');
              var founders = $stateParams.founders; //from param
              if (founders === null) {
                var foundersData = foundersState.get();
                if (foundersData !== null) { //from state
                  founders = FoundersFactory.createFromJson(foundersData);
                } else { //new
                  founders = FoundersFactory.create(); //default
                }
              }

              foundersState.set(founders.toJson()).save();

              return founders;
            }
          },
          controller: 'DashboardCtrl'
        }
      }
    });
 });
