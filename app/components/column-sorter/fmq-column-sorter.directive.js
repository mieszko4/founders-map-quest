'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.columnSorter.directive:fmqColumnSorter
 * @description
 * # fmqColumnSorter
 */
angular.module('foundersMapQuestApp.columnSorter')
  .directive('fmqColumnSorter', function (FMQ_MODULE_SETTINGS) {
    var moduleSettings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.columnSorter'];

    return {
      scope: {
        state: '=',
        change: '&'
      },
      templateUrl: moduleSettings.moduleLocation + 'fmq-column-sorter.html',
      restrict: 'EA',
      replace: true,
      controllerAs: 'vm',
      bindToController: true,
      controller: function ($scope, SortStates) {
        var vm = this;
        vm.SortStates = SortStates; //enumerator

        $scope.$watch(function () {
          return vm.state;
        }, function () {
          if (typeof vm.state === 'undefined') {
            vm.state = SortStates.NONE;
          }
        });

        vm.changeSortState = function () {
          vm.state = SortStates.getNextState(vm.state);
          vm.change({state: vm.state});
        };
      }
    };
  });
