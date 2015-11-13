'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the foundersMapQuestApp
 */
angular.module('foundersMapQuestApp')
  .controller('MainCtrl', function ($scope, Founders, $uibModal, State) {
    var getDefaultMarkerColumn = function () {
      return 0;
    };

    var getDefaultItemsSelection = function (items) { //select all items on default
      var selectedItems = {};
      angular.forEach(items, function (item, i) {
        selectedItems[i] = true;
      });

      return selectedItems;
    };

    $scope.Founders = Founders;
    $scope.markerColumn = getDefaultMarkerColumn();
    $scope.selectedItems = getDefaultItemsSelection([]);

    if (!angular.equals(State.state, {})) {
      Founders.setFounders(
        State.state.header,
        State.state.items || [],
        State.state.latitudeColumn,
        State.state.longitudeColumn
      );
      $scope.markerColumn = State.state.markerColumn || getDefaultMarkerColumn();
      $scope.selectedItems = State.state.selectedItems || getDefaultItemsSelection(State.state.items);
    }

    // Save state live
    $scope.$watch('markerColumn', function (newValue) {
      console.log(newValue);
      State.state.markerColumn = newValue;
    });
    $scope.$watch('selectedItems', function (newValue) {
      State.state.selectedItems = newValue;
    }, true);

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

        Founders.setFounders(
          result.header,
          result.items,
          result.latitudeColumn,
          result.longitudeColumn
        );
      });
    };
  });
