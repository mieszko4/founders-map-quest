'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.dashboard.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the foundersMapQuestApp.dashboard
 */
angular.module('foundersMapQuestApp.dashboard')
  .controller('DashboardCtrl', function ($scope, $state, foundersManagerState, tableHelpInfoState, FoundersManagerFactory, FMQ_MODULE_SETTINGS, $anchorScroll) {
    var vm = this;
    //set up data
    vm.foundersManager = FoundersManagerFactory.createFromJson(foundersManagerState.get());
    vm.founders = vm.foundersManager.founders;
    vm.tableHelpInfo = tableHelpInfoState.get();

    //save table state
    var firstWatch = true;
    $scope.$watch(function () {
      return JSON.stringify(vm.founders.markerColumn) +
        JSON.stringify(vm.foundersManager.selectedItems) +
        JSON.stringify(vm.foundersManager.filterStates) +
        JSON.stringify(vm.foundersManager.sortStates);
    }, function () {
      if (firstWatch) {
        firstWatch = false;
        return; //return;
      }

      foundersManagerState.set(vm.foundersManager.toJson()).save();
    });

    //save tableHelpInfo state
    $scope.$watch(function () {
      return vm.tableHelpInfo;
    }, function () {
      tableHelpInfoState.set(vm.tableHelpInfo).save();
    });

    vm.loadData = function () {
      $state.go(FMQ_MODULE_SETTINGS['foundersMapQuestApp.loadData'].routes['load-data'], {founders: vm.founders});
    };

    //callback to view item on Map
    vm.mapHooks = {};
    vm.viewOnMap = function (item) {
      vm.mapHooks.openMarker(item);
      $anchorScroll('fmq-map');
    };
  });
