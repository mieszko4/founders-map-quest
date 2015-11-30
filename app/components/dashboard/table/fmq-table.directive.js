'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.table.directive:fmqTable
 * @description
 * # fmqTable
 */
angular.module('foundersMapQuestApp.table')
  .directive('fmqTable', function (SortHandler, FMQ_MODULE_SETTINGS) {
    var moduleSettings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.table'];

    return {
      scope: {
        foundersManager: '=',
        sortStates: '=',
        viewItemCallback: '&'
      },
      templateUrl: moduleSettings.moduleLocation + 'fmq-table.html',
      restrict: 'EA',
      replace: true,
      link: function (scope) {
        scope.founders = scope.foundersManager.founders;

        //marker
        scope.chooseAsMarker = function (column) {
          scope.foundersManager.chooseAsMarker(column);
        };

        //selection
        scope.isSelected = function (item) {
          return scope.foundersManager.isSelected(item);
        };

        scope.toggleAllSelection = function () {
          scope.foundersManager.toggleAllSelection();
        };

        scope.toggleSelection = function (item) {
          scope.foundersManager.toggleSelection(item);
        };

        scope.$watch(function () {
          return scope.foundersManager.allSelected();
        }, function (newValue) {
          scope.allSelected = newValue;
        });

        //filtering
        scope.setFilter = function (column, value) {
          scope.foundersManager.setFilter(column, value);
        };

        scope.resetFilters = function () {
          scope.foundersManager.resetFilters();
        };

        scope.passesFilter = function (item) {
          return scope.foundersManager.passesFilter(item);
        };

        //sorting
        scope.SortHandler = SortHandler;
        scope.$watch('sortStates', function () {
          var result = SortHandler.getCurrentSortState(scope.sortStates);

          if (result === null || result.state === SortHandler.NONE) {
            scope.predicate = undefined;
            scope.reverse = false;
          } else if (result.state === SortHandler.ASC) {
            scope.predicate = result.key;
            scope.reverse = false;
          } else {
            scope.predicate = result.key;
            scope.reverse = true;
          }
        }, true);

        scope.applySortChange = function ($index) {
          SortHandler.setNextState(scope.sortStates, $index);
        };

        scope.resetSorts = function () {
          scope.sortStates = {};
        };

        scope.viewItem = function () {
          scope.viewItemCallback();
        };
      }
    };
  });
