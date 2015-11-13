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
        //check if all selected items
        scope.$watch(function () {
          return Object.keys(scope.selectedItems).length === scope.items.length;
        }, function (newValue) {
          scope.allSelected = newValue;
        });

        scope.toggleAllSelection = function () {
          if (Object.keys(scope.selectedItems).length === scope.items.length) {
            scope.selectedItems = {};
          } else {
            angular.forEach(scope.items, function (item, key) {
              scope.selectedItems[key] = true;
            });
          }
        };

        scope.toggleSelection = function ($index) {
          if (typeof scope.selectedItems[$index] !== 'undefined') {
            delete scope.selectedItems[$index];
          } else {
            scope.selectedItems[$index] = true;
          }
        };

        scope.chooseAsMarker = function ($index) {
          scope.markerColumn = $index;
        };
      }
    };
  });
