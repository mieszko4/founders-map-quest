'use strict';

/**
 * @ngdoc overview
 * @name foundersMapQuestApp.about
 * @description
 * # foundersMapQuestApp.about
 *
 * About module of the application.
 */
 angular.module('foundersMapQuestApp.about', [
   'foundersMapQuestApp.constants',

   'ui.router'
 ])

 .config(function ($stateProvider, FMQ_MODULE_SETTINGS) {
   var moduleSettings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.about'];

   $stateProvider
    .state(moduleSettings.routes.about, {
      url: '/about',
      params: {
        label: 'About'
      },
      views: {
        'main@': {
          templateUrl: moduleSettings.moduleLocation + 'about.html'
        }
      }
    });
 });
