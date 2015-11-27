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
   'ui.bootstrap',

   'foundersMapQuestApp.about'
 ])
 .value('Papa', window.Papa)

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
     .otherwise({
       templateUrl: '404.html'
     });
 });
