'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.table.directive:fmqTable
 * @description
 * # fmqTable
 */
angular.module('foundersMapQuestApp.table')
  .directive('fmqTable', function (SelectHandler, SortHandler, FilterHandler, FMQ_COMPONENTS_PATH) {
    return {
      scope: {
        founders: '=',
        selectedItems: '=',
        sortStates: '=',
        filterStates: '=',
        viewItemCallback: '&'
      },
      templateUrl: FMQ_COMPONENTS_PATH + 'table/fmq-table.html',
      restrict: 'A',
      replace: true,
      link: function (scope) {
        scope.SelectHandler = SelectHandler;
        scope.SortHandler = SortHandler;
        //check if all selected items
        scope.$watch(function () {
          return SelectHandler.allSelected(scope.founders.items, scope.selectedItems);
        }, function (newValue) {
          scope.allSelected = newValue;
        });

        scope.toggleAllSelection = function () {
          scope.selectedItems = SelectHandler.toggleAllSelection(scope.founders.items, scope.selectedItems);
        };

        scope.toggleSelection = function ($index) {
          scope.selectedItems = SelectHandler.toggleSelection(scope.founders.items, $index, scope.selectedItems);
        };

        scope.chooseAsMarker = function ($index) {
          scope.founders.markerColumn = $index;
        };

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
