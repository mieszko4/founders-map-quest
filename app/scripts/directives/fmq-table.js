'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.directive:fmqTable
 * @description
 * # fmqTable
 */
angular.module('foundersMapQuestApp')
  .directive('fmqTable', function (SelectHandler) {
    return {
      scope: {
        header: '=',
        items: '=',
        markerColumn: '=',
        selectedItems: '='
      },
      templateUrl: 'views/directives/fmq-table.html',
      restrict: 'A',
      replace: true,
      link: function (scope) {
        scope.SelectHandler = SelectHandler;
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
      }
    };
  });
