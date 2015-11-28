'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.dashboard.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the foundersMapQuestApp.dashboard
 */
angular.module('foundersMapQuestApp.dashboard')
  .controller('DashboardCtrl', function ($scope, founders, $anchorScroll) {
    //set up data
    $scope.founders = founders;
    $scope.selectColumnForMarkerDismissed = false;
    $scope.selectedItems = [];
    $scope.sortStates = {};
    $scope.filterStates = {};

    //save table state (TODO)

    //callback to view item on Map
    $scope.mapHooks = {};
    $scope.viewOnMap = function (index) {
      $scope.mapHooks.openMarker(index);
      $anchorScroll('fmq-map');
    };
  });
