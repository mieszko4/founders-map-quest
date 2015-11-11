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

    $scope.ok = function () {
      var result = Founders.parseRawData($scope.form.data, $scope.form.delimiter);

      if (result !== false) {
        $uibModalInstance.close({
          header: result.header,
          items: result.items,
          latitudeColumn: $scope.form.latitude,
          longitudeColumn: $scope.form.longitude
        });
      } else {
        console.error('TODO: could not parse data');
      }
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
