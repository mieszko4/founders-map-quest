'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.directive:fmqNavigation
 * @description
 * # fmqNavigation
 */
angular.module('foundersMapQuestApp')
  .directive('fmqNavigation', function ($state, FMQ_ROOT_URL) {
    return {
      templateUrl: 'views/directives/fmq-navigation.html',
      restrict: 'A',
      replace: true,
      link: function (scope) {
        scope.$state = $state;

        scope.items = scope.$state.get()
          .filter(function (state) { //filter urls of module paths
            return !state.abstract && typeof state.url !== 'undefined' && state.url !== FMQ_ROOT_URL;
          }).map(function (state) { //create label based on last part of state name
            return {
              name: state.name,
              label: state.name.split('.').pop() //
            };
          });
      }
    };
  });
