'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.dashboard.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the foundersMapQuestApp.dashboard
 */
angular.module('foundersMapQuestApp.dashboard')
  .controller('DashboardCtrl', function ($scope, $state, founders, FoundersManagerFactory, FMQ_MODULE_SETTINGS, $anchorScroll) {
    //set up data
    $scope.founders = founders;
    $scope.foundersManager = FoundersManagerFactory.create(founders);
    $scope.selectColumnForMarkerDismissed = false;
    $scope.sortStates = {};

    //save table state (TODO)

    $scope.loadData = function () {
      $state.go(FMQ_MODULE_SETTINGS['foundersMapQuestApp.loadData'].routes['load-data'], {founders: founders});
    };

    //callback to view item on Map
    $scope.mapHooks = {};
    $scope.viewOnMap = function (index) {
      $scope.mapHooks.openMarker(index);
      $anchorScroll('fmq-map');
    };
  });
