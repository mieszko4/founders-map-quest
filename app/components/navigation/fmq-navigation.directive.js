'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.navigation.directive:fmqNavigation
 * @description
 * # fmqNavigation
 */
angular.module('foundersMapQuestApp.navigation')
  .directive('fmqNavigation', function (FMQ_MODULE_SETTINGS) {
    var moduleSettings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.navigation'];

    return {
      templateUrl: moduleSettings.moduleLocation + 'fmq-navigation.html',
      restrict: 'EA',
      replace: true,
      controllerAs: 'vm',
      bindToController: true,
      controller: function ($state) {
        var vm = this;
        vm.state = $state;

        vm.items = $state.get()
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
