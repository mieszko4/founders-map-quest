'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.directive:fmqTable
 * @description
 * # fmqTable
 */
angular.module('foundersMapQuestApp')
  .directive('fmqTable', function (SelectHandler, SortHandler) {
    return {
      scope: {
        header: '=',
        items: '=',
        markerColumn: '=',
        selectedItems: '=',
        sortStates: '=',
        filterStates: '='
      },
      templateUrl: 'views/directives/fmq-table.html',
      restrict: 'A',
      replace: true,
      link: function (scope) {
        scope.SelectHandler = SelectHandler;
        scope.SortHandler = SortHandler;
        //check if all selected items
        scope.$watch(function () {
          return SelectHandler.allSelected(scope.items, scope.selectedItems);
        }, function (newValue) {
          scope.allSelected = newValue;
        });

        scope.toggleAllSelection = function () {
          scope.selectedItems = SelectHandler.toggleAllSelection(scope.items, scope.selectedItems);
        };

        scope.toggleSelection = function ($index) {
          scope.selectedItems = SelectHandler.toggleSelection(scope.items, $index, scope.selectedItems);
        };

        scope.chooseAsMarker = function ($index) {
          scope.markerColumn = $index;
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

        // Filtering
        scope.resetFilters = function () {
          scope.filterStates = {};
        };
      }
    };
  });
