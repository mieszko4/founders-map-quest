'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.directive:fmqTable
 * @description
 * # fmqTable
 */
angular.module('foundersMapQuestApp')
  .directive('fmqTable', function () {
    return {
      scope: {header: '=', items: '='},
      templateUrl: 'views/directives/fmq-table.html',
      restrict: 'A',
      replace: true,
      link: function () {
      }
    };
  });
