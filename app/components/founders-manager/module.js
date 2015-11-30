'use strict';

/**
 * @ngdoc overview
 * @name foundersMapQuestApp.foundersManager
 * @description
 * # foundersMapQuestApp.foundersManager
 *
 * FoundersManager module of the application.
 */
 angular.module('foundersMapQuestApp.foundersManager', [
   'foundersMapQuestApp.constants'
 ])
 .value('Papa', window.Papa); //inject non-angular services
