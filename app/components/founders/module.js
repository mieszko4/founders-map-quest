'use strict';

/**
 * @ngdoc overview
 * @name foundersMapQuestApp.founders
 * @description
 * # foundersMapQuestApp.founders
 *
 * Founders module of the application.
 */
 angular.module('foundersMapQuestApp.founders', [
   'foundersMapQuestApp.constants'
 ])
 .value('Papa', window.Papa); //inject non-angular services
