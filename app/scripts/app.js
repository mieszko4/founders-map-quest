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
   'foundersMapQuestApp.constants',
   'foundersMapQuestApp.dashboard',
   'foundersMapQuestApp.about',
   'foundersMapQuestApp.error',

   'ui.router'
 ])

 .config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      libraries: 'visualization'
    });
  })

 .config(function ($stateProvider, $urlRouterProvider, FMQ_ROOT_URL) {
   $urlRouterProvider
    .when(FMQ_ROOT_URL + '/', FMQ_ROOT_URL + '/dashboard');

   $stateProvider
    .state('root', {
      url: FMQ_ROOT_URL
    });
 });
