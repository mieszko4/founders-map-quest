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

   'foundersMapQuestApp.about'
 ])
 .value('Papa', window.Papa)

 .config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      libraries: 'visualization'
    });
  })

 .config(function ($stateProvider, $urlRouterProvider) {
   var ROOT_URL = ''; //route prefix

   $urlRouterProvider
    .when(ROOT_URL + '/', ROOT_URL + '/dashboard')
    .otherwise(function ($injector) {
      $injector.invoke(['$state', function($state) {
        $state.go('not-found');
      }]);
    });

   $stateProvider
    .state('root', {
      url: ROOT_URL
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
