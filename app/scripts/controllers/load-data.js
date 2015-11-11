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
    var items = [1, 2, 3];

    $scope.ok = function () {
      $uibModalInstance.close(items);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
