'use strict';

/**
 * @ngdoc overview
 * @name foundersMapQuestApp
 * @description
 * # foundersMapQuestApp
 *
 * Main module of the application.
 */
 angular.module('foundersMapQuestApp.about', [
   'ngRoute',
   'ui.bootstrap'
 ])

 .config(function ($routeProvider) {
   $routeProvider
     .when('/about', {
       templateUrl: 'components/about/about.html'
     })
 });
