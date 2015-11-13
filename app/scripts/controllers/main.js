'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the foundersMapQuestApp
 */
angular.module('foundersMapQuestApp')
  .controller('MainCtrl', function ($scope, Founders, $uibModal, State, SelectHandler) {
    var defaults = {
      markerColumn: function () {
        return 0;
      },
      selectedItems: function () {
        return SelectHandler.selectAll([]);
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
    angular.forEach(Object.keys(defaults), function (variable) {
      $scope[variable] = State.state[variable] || defaults[variable]();
    });

    if (!angular.equals(State.state, {})) {
      Founders.setFounders(
        State.state.header,
        State.state.items || [],
        State.state.latitudeColumn,
        State.state.longitudeColumn
      );

      angular.forEach(Object.keys(defaults), function (variable) {
        $scope[variable] = State.state[variable] || defaults[variable]();
      });
    }

    // Save state live
    angular.forEach(Object.keys(defaults), function (variable) {
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

        angular.forEach(Object.keys(defaults), function (variable) {
          $scope[variable] = State.state[variable] || defaults[variable]();
        });

        Founders.setFounders(
          result.header,
          result.items,
          result.latitudeColumn,
          result.longitudeColumn
        );
      });
    };
  });
