'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.table.directive:fmqTable
 * @description
 * # fmqTable
 */
angular.module('foundersMapQuestApp.table')
  .directive('fmqTable', function (SortHandler, FilterHandler, FMQ_MODULE_SETTINGS) {
    var moduleSettings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.table'];

    return {
      scope: {
        foundersManager: '=',
        sortStates: '=',
        filterStates: '=',
        viewItemCallback: '&'
      },
      templateUrl: moduleSettings.moduleLocation + 'fmq-table.html',
      restrict: 'EA',
      replace: true,
      link: function (scope) {
        scope.founders = scope.foundersManager.founders;
        scope.selectedItems = scope.foundersManager.selectedItems;

        scope.SortHandler = SortHandler;

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

        // Sorting
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

        // Filtering
        scope.resetFilters = function () {
          scope.filterStates = {};
        };

        scope.search = function (item) {
          return FilterHandler.passesFilter(scope.filterStates, item);
        };

        scope.viewItem = function () {
          scope.viewItemCallback();
        };
      }
    };
  });
