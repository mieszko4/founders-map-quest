'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.columnSorter.directive:fmqColumnSorter
 * @description
 * # fmqColumnSorter
 */
angular.module('foundersMapQuestApp.columnSorter')
  .directive('fmqColumnSorter', function (FMQ_MODULE_SETTINGS, SortStates) {
    var moduleSettings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.columnSorter'];

    return {
      scope: {
        state: '=',
        change: '&'
      },
      templateUrl: moduleSettings.moduleLocation + 'fmq-column-sorter.html',
      restrict: 'EA',
      replace: true,
      link: function (scope) {
        scope.SortStates = SortStates; //enumerator

        scope.$watch('state', function () {
          if (typeof scope.state === 'undefined') {
            scope.state = SortStates.NONE;
          }
        });

        scope.changeSortState = function () {
          scope.state = SortStates.getNextState(scope.state);
          scope.change({state: scope.state});
        };
      }
    };
  });
