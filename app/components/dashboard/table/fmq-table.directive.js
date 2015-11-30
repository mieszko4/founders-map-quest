'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.table.directive:fmqTable
 * @description
 * # fmqTable
 */
angular.module('foundersMapQuestApp.table')
  .directive('fmqTable', function (FMQ_MODULE_SETTINGS) {
    var moduleSettings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.table'];

    return {
      scope: {
        foundersManager: '=',
        viewItem: '&' //callback when specific item wants to be viewed
      },
      templateUrl: moduleSettings.moduleLocation + 'fmq-table.html',
      restrict: 'EA',
      replace: true,
      link: function (scope) {
        scope.founders = scope.foundersManager.founders;

        //marker
        scope.chooseAsMarker = function (column) {
          scope.founders.chooseAsMarker(column);
        };
        scope.isMarker = function (column) {
          return scope.founders.isMarker(column);
        };

        //selection
        scope.isSelected = function (item) {
          return scope.foundersManager.isSelected(item);
        };

        scope.toggleAllSelection = function () {
          scope.foundersManager.toggleAllSelection();
          scope.allSelected = scope.foundersManager.allSelected();
        };

        scope.toggleSelection = function (item) {
          scope.foundersManager.toggleSelection(item);
          scope.allSelected = scope.foundersManager.allSelected();
        };

        scope.$watch('foundersManager.selectedItems', function () {
          scope.allSelected = scope.foundersManager.allSelected();
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

        scope.$watch('foundersManager.filterStates', function () {
          scope.filterStates = scope.founders.header.map(function (column) {
            return scope.foundersManager.getFilter(column);
          });
        });

        //sorting
        scope.getSort = function (column) {
          scope.foundersManager.getSort(column);
        };

        scope.applySort = function (column, state) {
          scope.foundersManager.applySort(column, state);
        };

        scope.resetSorts = function () {
          scope.foundersManager.resetSorts();
        };

        scope.$watch('foundersManager.sortStates', function () {
          scope.sortStates = scope.founders.header.map(function (column) {
            return scope.foundersManager.getSort(column);
          });
          scope.sortConfig = scope.foundersManager.getSortConfig();
        });
      }
    };
  });
