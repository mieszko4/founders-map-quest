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
            //get foundersManager: from param, from state or new
            foundersManagerState: function ($stateParams, StateFactory, FoundersFactory, FoundersManagerFactory) {
              var foundersManagerState = StateFactory.create('fmq.foundersManager');
              var founders = $stateParams.founders; //from param
              var foundersManager = null;

              if (founders !== null) {
                //ignore saved data for foundersManager
                foundersManager = FoundersManagerFactory.create(founders); //default with existing founders
              } else {
                var foundersManagerData = foundersManagerState.get();

                if (foundersManagerData !== null) { //from state
                  foundersManager = FoundersManagerFactory.createFromJson(foundersManagerData);
                } else { //new
                  founders = FoundersFactory.create(); //default
                  foundersManager = FoundersManagerFactory.create(founders); //default with default founders
                }
              }

              foundersManagerState.set(foundersManager.toJson()).save();

              return foundersManagerState;
            },

            tableHelpInfoState: function (StateFactory) {
              var tableHelpInfoState = StateFactory.create('fmq.tableHelpInfo');
              var tableHelpInfo = tableHelpInfoState.get();

              tableHelpInfo = (tableHelpInfo !== null) ? tableHelpInfo : true; //default

              tableHelpInfoState.set(tableHelpInfo).save();

              return tableHelpInfoState;
            }
          },
          controller: 'DashboardCtrl'
        }
      }
    });
 });
