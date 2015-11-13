'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.controller:ShowImageCtrl
 * @description
 * # ShowImageCtrl
 * Controller of the foundersMapQuestApp
 */
angular.module('foundersMapQuestApp')
  .controller('ShowImageCtrl', function ($scope, $uibModalInstance, image) {
    $scope.image = image;

    $scope.ok = function () {
      $uibModalInstance.close();
    };
  });
