'use strict';

/**
 * @ngdoc overview
 * @name foundersMapQuestApp
 * @description
 * # foundersMapQuestApp
 *
 * Main module of the application.
 */
 angular.module('foundersMapQuestApp.about', [])

 .config(function ($stateProvider) {
   $stateProvider
    .state('root.about', {
      url: '/about',
      views: {
        'main@': {
          templateUrl: 'components/about/about.html'
        }
      }
    });
 });
