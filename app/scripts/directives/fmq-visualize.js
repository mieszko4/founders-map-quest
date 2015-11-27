'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.directive:fmqVisualize
 * @description
 * # fmqVisualize
 */
angular.module('foundersMapQuestApp')
  .directive('fmqVisualize', function () {
    return {
      scope: {
        data: '@',
        type: '@',
        isSelected: '=',
        viewItemCallback: '&',
      },
      templateUrl: 'views/directives/fmq-visualize.html',
      restrict: 'A',
      replace: true
    };
  });
