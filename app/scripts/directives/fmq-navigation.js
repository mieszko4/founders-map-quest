'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.directive:fmqNavigation
 * @description
 * # fmqNavigation
 */
angular.module('foundersMapQuestApp')
  .directive('fmqNavigation', function () {
    return {
      templateUrl: 'views/directives/fmq-navigation.html',
      restrict: 'A',
      replace: true,
      link: function (scope) {
        /*
        scope.route = $route;
        scope.items = [
          {
            path: '/',
            label: 'Home'
          },
          {
            path: '/about',
            label: 'About'
          }
        ];*/
      }
    };
  });
