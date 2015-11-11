'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.controller:LoadDataCtrl
 * @description
 * # LoadDataCtrl
 * Controller of the foundersMapQuestApp
 */
angular.module('foundersMapQuestApp')
  .controller('LoadDataCtrl', function ($scope, $uibModalInstance, Founders) {
    $scope.form = {
      data: '',
      delimiter: ',',
      latitude: null,
      longitude: null
    };

    $scope.data = false;
    $scope.parseRawData = function () {
      $scope.data = Founders.parseRawData($scope.form.data, $scope.form.delimiter);
    };

    $scope.formValid = false;
    $scope.$watch(function() {
      return $scope.data && $scope.form.latitude !== null && $scope.form.longitude !== null;
    }, function (newValue) {
      $scope.formValid = newValue;
    });

    $scope.columns = [];
    $scope.$watch(function() {
      return $scope.data;
    }, function (newValue) {
      $scope.columns = (newValue !== false) ? newValue.header : [];
    }, true);

    $scope.ok = function () {
      $uibModalInstance.close({
        header: $scope.data.header,
        items: $scope.data.items,
        latitudeColumn: $scope.form.latitude,
        longitudeColumn: $scope.form.longitude
      });
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
