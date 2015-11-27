'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.directive:fmqNavigation
 * @description
 * # fmqNavigation
 */
angular.module('foundersMapQuestApp')
  .directive('fmqNavigation', function ($state) {
    return {
      templateUrl: 'views/directives/fmq-navigation.html',
      restrict: 'A',
      replace: true,
      link: function (scope) {
        scope.$state = $state;

        scope.items = scope.$state.get()
          .filter(function (state) { //filter urls of module paths
            return !state.abstract && typeof state.params !== 'undefined' && typeof state.params.label !== 'undefined';
          }).map(function (state) { //structure data with name and label
            return {
              name: state.name,
              label: state.params.label
            };
          });
      }
    };
  });
