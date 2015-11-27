'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.visualize.directive:fmqVisualize
 * @description
 * # fmqVisualize
 */
angular.module('foundersMapQuestApp.visualize')
  .directive('fmqVisualize', function (FMQ_COMPONENTS_PATH) {
    return {
      scope: {
        data: '@',
        type: '@',
        isSelected: '=',
        viewItemCallback: '&',
      },
      templateUrl: FMQ_COMPONENTS_PATH + 'visualize/fmq-visualize.html',
      restrict: 'A',
      replace: true
    };
  });
