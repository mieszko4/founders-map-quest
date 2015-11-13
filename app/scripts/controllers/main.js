'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the foundersMapQuestApp
 */
angular.module('foundersMapQuestApp')
  .controller('MainCtrl', function ($scope, Founders, $uibModal, State, SelectHandler, $anchorScroll) {
    $scope.animationsEnabled = true;
    var defaults = {
      markerColumn: function () {
        return 0;
      },
      selectedItems: function () {
        console.log(Founders);
        return SelectHandler.selectAll(Founders.items);
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

    $scope.Founders = Founders;
    angular.forEach(defaults, function (callback, variable) {
      $scope[variable] = State.state[variable] || callback();
    });

    if (!angular.equals(State.state, {})) {
      Founders.setFounders(
        State.state.header,
        State.state.items || [],
        State.state.latitudeColumn,
        State.state.longitudeColumn
      );

      angular.forEach(defaults, function (callback, variable) {
        $scope[variable] = State.state[variable] || callback();
      });
    }

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
          longitudeColumn: result.longitudeColumn
        };

        Founders.setFounders(
          result.header,
          result.items,
          result.latitudeColumn,
          result.longitudeColumn
        );

        angular.forEach(defaults, function (callback, variable) {
          $scope[variable] = State.state[variable] || callback();
        });
      });
    };

    // View item on Map
    $scope.viewOnMap = function (index) {
      $scope.activeMarker = index;
      $anchorScroll('fmq-map');
    };
  });
