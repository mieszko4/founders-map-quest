'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.controller:LoadDataCtrl
 * @description
 * # LoadDataCtrl
 * Controller of the foundersMapQuestApp
 */
angular.module('foundersMapQuestApp')
  .controller('LoadDataCtrl', function ($scope, $uibModalInstance) {
    $scope.form = {
      data: '',
      delimiter: 'Comma',
      latitude: null,
      longitude: null
    };

    $scope.ok = function () {
      console.log($scope.form);
      //$uibModalInstance.close(items);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
