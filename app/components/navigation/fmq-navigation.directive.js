'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.navigation.directive:fmqNavigation
 * @description
 * # fmqNavigation
 */
angular.module('foundersMapQuestApp.navigation')
  .directive('fmqNavigation', function ($state, FMQ_MODULE_SETTINGS) {
    var moduleSettings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.navigation'];

    return {
      templateUrl: moduleSettings.moduleLocation + 'fmq-navigation.html',
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
