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
    $scope.Founders = Founders;

    if (State.state !== null) {
      Founders.setFounders(
        State.state.header,
        State.state.items,
        State.state.latitudeColumn,
        State.state.longitudeColumn
      );
    }

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
      }, function () {
      });
    };
  });
