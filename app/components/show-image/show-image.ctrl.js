'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.showImage.controller:ShowImageCtrl
 * @description
 * # ShowImageCtrl
 * Controller of the foundersMapQuestApp.showImage
 */
angular.module('foundersMapQuestApp.showImage')
  .controller('ShowImageCtrl', function ($scope, $uibModalInstance, image) {
    if (image === null) {
      $uibModalInstance.opened.then(function () {
        $uibModalInstance.close();
      });
    }

    $scope.image = image;

    $scope.ok = function () {
      $uibModalInstance.close();
    };
  });
