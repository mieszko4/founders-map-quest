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
        scope.chooseAsMarker = function ($index) {
          scope.foundersManager.chooseAsMarker($index);
        };
        scope.isMarker = function ($index) {
          return scope.foundersManager.isMarker($index);
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
        scope.setFilter = function ($index) {
          scope.foundersManager.setFilter(scope.filterStates[$index]);
        };

        scope.resetFilters = function () {
          scope.foundersManager.resetFilters();
        };

        scope.passesFilter = function (item) {
          return scope.foundersManager.passesFilter(item);
        };

        scope.$watch('foundersManager.filterStates', function (newValue) {
          scope.filterStates = newValue;
        });

        //sorting
        scope.getSortStateForColumn = function (key) {
          scope.foundersManager.getSortStateForColumn(key);
        };

        scope.applySort = function (state, key) {
          scope.foundersManager.applySort(state, key);
        };

        scope.resetSorts = function () {
          scope.foundersManager.resetSorts();
        };

        scope.$watch('foundersManager.sortStates', function (newValue) {
          scope.sortStates = newValue;
          scope.sortConfig = scope.foundersManager.getSortConfig();
        });
      }
    };
  });
