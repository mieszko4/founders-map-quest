'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the foundersMapQuestApp
 */
angular.module('foundersMapQuestApp')
  .controller('MainCtrl', function ($scope, FoundersFactory, Founders, $uibModal, State, SelectHandler, $anchorScroll) {
    $scope.animationsEnabled = true;
    var defaults = {
      markerColumn: function () {
        return 0;
      },
      selectedItems: function () {
        return SelectHandler.selectAll($scope.founders.items);
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

    if (!angular.equals(State.state, {})) {
      $scope.founders = FoundersFactory.create(
        State.state.header,
        State.state.items || [],
        State.state.delimiter || Founders.defaultDelimiter,
        State.state.latitudeColumn,
        State.state.longitudeColumn
      );
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

    $scope.openLoadDataForm = function () {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/load-data.html',
        controller: 'LoadDataCtrl',
        backdrop: 'static',
        resolve: {
          state: function () {
            return State.state;
          }
        }
      });

      modalInstance.result.then(function (result) {
        State.state = {
          delimiter: result.delimiter,
          header: result.header,
          items: result.items,
          latitudeColumn: result.latitudeColumn,
          longitudeColumn: result.longitudeColumn,
          selectColumnForMarkerDismissed: $scope.selectColumnForMarkerDismissed
        };

        $scope.founders = FoundersFactory.create(
          result.header,
          result.items,
          result.delimiter,
          result.latitudeColumn,
          result.longitudeColumn
        );

        applyDefaults();
      });
    };

    // View item on Map
    $scope.mapHooks = {};
    $scope.viewOnMap = function (index) {
      $scope.mapHooks.openMarker(index);
      $anchorScroll('fmq-map');
    };
  });
