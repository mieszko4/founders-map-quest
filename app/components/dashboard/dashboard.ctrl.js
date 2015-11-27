'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the foundersMapQuestApp
 */
angular.module('foundersMapQuestApp')
  .controller('DashboardCtrl', function ($scope, $stateParams, FoundersFactory, Founders, $uibModal, State, SelectHandler, $anchorScroll) {
    $scope.State = State;

    var defaults = {
      markerColumn: function () {
        return 0;
      },
      selectedItems: function () {
        return SelectHandler.selectAll(($scope.founders !== null) ? $scope.founders.items : []);
      },
      selectColumnForMarkerDismissed: function () {
        return false;
      },
      sortStates: function () {
        return {};
      },
      filterStates: function () {
        return {};
      }
    };
    var applyDefaults = function () {
      angular.forEach(defaults, function (callback, variable) {
        $scope[variable] = (typeof State.state[variable] !== 'undefined') ? State.state[variable] : callback($scope[variable]);
      });
    };

    if (Object.keys($stateParams.foundersData).length > 0) { // Preload data from stateParams
      //create founders
      $scope.founders = FoundersFactory.create(
        $stateParams.foundersData.header,
        $stateParams.foundersData.items,
        $stateParams.foundersData.delimiter,
        $stateParams.foundersData.latitudeColumn,
        $stateParams.foundersData.longitudeColumn
      );

      //save state
      State.state = angular.extend({}, $stateParams.foundersData);
      State.state.selectColumnForMarkerDismissed = defaults.selectColumnForMarkerDismissed();
    } else if (Object.keys(State.state).length > 0) { //Preload data from state
      $scope.founders = FoundersFactory.create(
        State.state.header,
        State.state.items || [],
        State.state.delimiter || Founders.defaultDelimiter,
        State.state.latitudeColumn,
        State.state.longitudeColumn
      );
    } else {
      $scope.founders = null;
    }

    applyDefaults();

    // Save state live
    angular.forEach(defaults, function (callback, variable) {
      (function (variable) {
        $scope.$watch(variable, function (newValue) {
          State.state[variable] = newValue;
        });
      }(variable));
    });

    // View item on Map
    $scope.mapHooks = {};
    $scope.viewOnMap = function (index) {
      $scope.mapHooks.openMarker(index);
      $anchorScroll('fmq-map');
    };
  });
