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

 .config(function ($stateProvider, FMQ_COMPONENTS_PATH) {
   $stateProvider
    .state('root.about', {
      url: '/about',
      views: {
        'main@': {
          templateUrl: FMQ_COMPONENTS_PATH + 'about/view.html'
        }
      }
    });
 });
