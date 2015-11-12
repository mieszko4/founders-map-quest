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
   'ui.bootstrap'
 ])

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
