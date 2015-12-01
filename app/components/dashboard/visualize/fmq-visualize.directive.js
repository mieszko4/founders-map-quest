'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.visualize.directive:fmqVisualize
 * @description
 * # fmqVisualize
 */
angular.module('foundersMapQuestApp.visualize')
  .directive('fmqVisualize', function (FMQ_MODULE_SETTINGS) {
    var moduleSettings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.visualize'];

    return {
      scope: {
        data: '@',
        type: '@'
      },
      templateUrl: moduleSettings.moduleLocation + 'fmq-visualize.html',
      controller: function () {},
      controllerAs: 'vm',
      bindToController: true,
      restrict: 'EA',
      replace: true
    };
  });
