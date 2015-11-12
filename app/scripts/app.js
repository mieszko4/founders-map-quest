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
   'ngRoute',
   'LocalStorageModule',
   'uiGmapgoogle-maps',
   'ui.bootstrap'
 ])

 .config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      //key: 'your api key',
      // v: '3.20',
      libraries: 'weather,geometry,visualization'
    });
  })

 .config(function ($routeProvider) {
   $routeProvider
     .when('/', {
       templateUrl: 'views/main.html',
       controller: 'MainCtrl'
     })
     .when('/about', {
       templateUrl: 'views/about.html',
       controller: 'AboutCtrl'
     })
     .otherwise({
       templateUrl: '404.html'
     });
 });
