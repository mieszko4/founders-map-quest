'use strict';

/**
 * @ngdoc overview
 * @name foundersMapQuestApp.map
 * @description
 * # foundersMapQuestApp.map
 *
 * Map module of the application.
 */
 angular.module('foundersMapQuestApp.map', [
   'foundersMapQuestApp.constants',
   'foundersMapQuestApp.foundersManager',
   'foundersMapQuestApp.visualize',

   'ui.router'
 ])

 .config(function ($stateProvider, FMQ_MODULE_SETTINGS) {
   var moduleSettings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.map'];

   $stateProvider
    .state(moduleSettings.routes.map, {
      url: '/map',
      params: {
        item: null
      }
    });
 });
