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
      scope: {header: '=', items: '=', markerColumn: '='},
      templateUrl: 'views/directives/fmq-table.html',
      restrict: 'A',
      replace: true,
      link: function (scope) {
        scope.chooseAsMarker = function ($index) {
          scope.markerColumn = $index;
        };
      }
    };
  });
