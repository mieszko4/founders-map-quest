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
      controllerAs: 'vm',
      bindToController: true,
      controller: function ($scope) {
        var vm = this;

        vm.founders = vm.foundersManager.founders;

        //marker
        vm.chooseAsMarker = function (column) {
          vm.founders.chooseAsMarker(column);
        };
        vm.isMarker = function (column) {
          return vm.founders.isMarker(column);
        };

        //selection
        vm.isSelected = function (item) {
          return vm.foundersManager.isSelected(item);
        };

        vm.toggleAllSelection = function () {
          vm.foundersManager.toggleAllSelection();
          vm.allSelected = vm.foundersManager.allSelected();
        };

        vm.toggleSelection = function (item) {
          vm.foundersManager.toggleSelection(item);
          vm.allSelected = vm.foundersManager.allSelected();
        };

        $scope.$watch(function () {
          return JSON.stringify(vm.foundersManager.selectedItems);
        }, function () {
          vm.allSelected = vm.foundersManager.allSelected();
        });

        //filtering
        vm.setFilter = function (column, value) {
          vm.foundersManager.setFilter(column, value);
        };

        vm.resetFilters = function () {
          vm.foundersManager.resetFilters();
        };

        vm.passesFilter = function (item) {
          return vm.foundersManager.passesFilter(item);
        };

        $scope.$watch(function () {
          return JSON.stringify(vm.foundersManager.filterStates);
        }, function () {
          vm.filterStates = vm.founders.header.map(function (column) {
            return vm.foundersManager.getFilter(column);
          });
        });

        //sorting
        vm.getSort = function (column) {
          vm.foundersManager.getSort(column);
        };

        vm.applySort = function (column, state) {
          vm.foundersManager.applySort(column, state);
        };

        vm.resetSorts = function () {
          vm.foundersManager.resetSorts();
        };

        $scope.$watch(function () {
          return JSON.stringify(vm.foundersManager.sortStates);
        }, function () {
          vm.sortStates = vm.founders.header.map(function (column) {
            return vm.foundersManager.getSort(column);
          });
          vm.sortConfig = vm.foundersManager.getSortConfig();
        });
      }
    };
  });
