'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.showImage.controller:ShowImageCtrl
 * @description
 * # ShowImageCtrl
 * Controller of the foundersMapQuestApp.showImage
 */
angular.module('foundersMapQuestApp.showImage')
  .controller('ShowImageCtrl', function ($uibModalInstance, image) {
    var vm = this;
    if (image === null) {
      $uibModalInstance.opened.then(function () {
        $uibModalInstance.close();
      });
    }

    vm.image = image;

    vm.ok = function () {
      $uibModalInstance.close();
    };
  });
