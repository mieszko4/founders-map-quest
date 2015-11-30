'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.dashboard.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the foundersMapQuestApp.dashboard
 */
angular.module('foundersMapQuestApp.dashboard')
  .controller('DashboardCtrl', function ($scope, $state, foundersManagerState, FoundersManagerFactory, FMQ_MODULE_SETTINGS, $anchorScroll) {
    //set up data
    $scope.foundersManager = FoundersManagerFactory.createFromJson(foundersManagerState.get());
    $scope.founders = $scope.foundersManager.founders;
    $scope.selectColumnForMarkerDismissed = false;

    //save table state
    [
      'founders.markerColumn',
      'foundersManager.selectedItems',
      'foundersManager.filterStates',
      'foundersManager.sortStates'
    ].forEach(function (variable) {
      var firstWatch = true;
      $scope.$watch(variable, function (newValue) {
        if (firstWatch) {
          firstWatch = false;
          return; //break;
        }

        foundersManagerState.set($scope.foundersManager.toJson()).save();
      }, true);
    });

    $scope.loadData = function () {
      $state.go(FMQ_MODULE_SETTINGS['foundersMapQuestApp.loadData'].routes['load-data'], {founders: $scope.founders});
    };

    //callback to view item on Map
    $scope.mapHooks = {};
    $scope.viewOnMap = function (item) {
      $scope.mapHooks.openMarker(item);
      $anchorScroll('fmq-map');
    };
  });
