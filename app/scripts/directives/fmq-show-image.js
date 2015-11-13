'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.directive:fmqShowImage
 * @description
 * # fmqShowImage
 */
angular.module('foundersMapQuestApp')
  .directive('fmqShowImage', function ($uibModal) {
    return {
      scope: {fmqShowImage: '@'},
      restrict: 'A',
      link: function(scope, element) {
        element.on('click', scope.fmqShowImage, function (e) {
          e.preventDefault();
          var image = e.currentTarget.href;

          $uibModal.open({
            animation: true,
            controller: 'ShowImageCtrl',
            templateUrl: 'views/show-image.html',
            resolve: {
              image: function () {
                return image;
              }
            }
          });
        });
      }
    };
  });
