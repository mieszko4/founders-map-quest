'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.directive:fmqShowImage
 * @description
 * # fmqShowImage
 */
angular.module('foundersMapQuestApp')
  .directive('fmqShowImage', function ($state) {
    return {
      scope: {fmqShowImage: '@'},
      restrict: 'A',
      link: function(scope, element) {
        element.on('click', scope.fmqShowImage, function (e) {
          e.preventDefault();
          var image = e.currentTarget.href;

          $state.go('root.dashboard.show-image', {image: image});
        });
      }
    };
  });
