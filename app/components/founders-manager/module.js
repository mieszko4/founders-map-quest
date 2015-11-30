'use strict';

/**
 * @ngdoc overview
 * @name foundersMapQuestApp.founders
 * @description
 * # foundersMapQuestApp.founders
 *
 * Founders module of the application.
 */
 angular.module('foundersMapQuestApp.foundersManager', [
   'foundersMapQuestApp.constants'
 ])
 .value('Papa', window.Papa); //inject non-angular services
