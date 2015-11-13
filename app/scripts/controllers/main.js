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
    var getDefaultMarkerColumn = function () {
      return 0;
    };

    var getDefaultItemsSelection = function (items) {
      return SelectHandler.selectAll(items);
    };

    $scope.Founders = Founders;
    $scope.markerColumn = getDefaultMarkerColumn();
    $scope.selectedItems = getDefaultItemsSelection([]);
    $scope.sortStates = {};
    $scope.selectColumnForMarkerDismissed = false;

    if (!angular.equals(State.state, {})) {
      Founders.setFounders(
        State.state.header,
        State.state.items || [],
        State.state.latitudeColumn,
        State.state.longitudeColumn
      );
      $scope.markerColumn = State.state.markerColumn || getDefaultMarkerColumn();
      $scope.selectedItems = State.state.selectedItems || getDefaultItemsSelection(State.state.items);
      $scope.sortStates = State.state.sortStates || {};
      $scope.selectColumnForMarkerDismissed = State.state.selectColumnForMarkerDismissed;
    }

    // Save state live
    angular.forEach(['markerColumn', 'selectedItems', 'selectColumnForMarkerDismissed'], function (variable) {
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
        $scope.markerColumn = getDefaultMarkerColumn();
        $scope.selectedItems = getDefaultItemsSelection(State.state.items);
        $scope.sortStates = {};

        Founders.setFounders(
          result.header,
          result.items,
          result.latitudeColumn,
          result.longitudeColumn
        );
      });
    };
  });
