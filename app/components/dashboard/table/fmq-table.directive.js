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
        scope.sortStates = scope.foundersManager.sortStates;
        scope.getSortStateForColumn = function (key) {
          scope.foundersManager.getSortStateForColumn(key);
        };

        scope.applySort = function (state, key) {
          scope.foundersManager.applySort(state, key);
          scope.sortStates = scope.foundersManager.sortStates;
        };

        scope.resetSorts = function () {
          scope.foundersManager.resetSorts();
          scope.sortStates = scope.foundersManager.sortStates;
        };

        scope.$watch('sortStates', function () {
          var config = scope.foundersManager.getSortConfig();

          scope.predicate = config.predicate;
          scope.reverse = config.reverse;
        });
      }
    };
  });
