'use strict';

/**
 * @ngdoc overview
 * @name foundersMapQuestApp
 * @description
 * # foundersMapQuestApp
 *
 * Main module of the application.
 */
 angular.module('foundersMapQuestApp', [
   'LocalStorageModule',
   'uiGmapgoogle-maps',
   'ui.bootstrap',
   'ui.router',

   'foundersMapQuestApp.constants',
   'foundersMapQuestApp.about'
 ])
 .value('Papa', window.Papa)

 .config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      libraries: 'visualization'
    });
  })

 .config(function ($stateProvider, $urlRouterProvider, FMQ_ROOT_URL) {
   $urlRouterProvider
    .when(FMQ_ROOT_URL + '/', FMQ_ROOT_URL + '/dashboard')
    .otherwise(function ($injector) {
      $injector.invoke(['$state', function($state) {
        $state.go('not-found');
      }]);
    });

   $stateProvider
    .state('root', {
      url: FMQ_ROOT_URL
    })
    .state('root.dashboard', {
      url: '/dashboard',
      views: {
        'main@': {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        },
      },
    })
    .state('not-found', {
      views: {
        'main': {
          templateUrl: '404.html'
        },
      }
    });
 });
