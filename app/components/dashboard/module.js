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
        founders: null
      },
      views: {
        'main@': {
          templateUrl: FMQ_COMPONENTS_PATH + 'dashboard/dashboard.html',
          resolve: {
            //get founders: from param, from state or new
            founders: function ($stateParams, StateFactory, FoundersFactory) {
              var foundersState = StateFactory.create('founders');

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
