'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.state.State
 * @description
 * # State
 * Service in the foundersMapQuestApp.state.
 */
angular.module('foundersMapQuestApp.state')
  .factory('State', function ($rootScope, localStorageService) {
    var key = 'founders';
    var service = {
      state: {}
    };

    var state = localStorageService.get(key);
    service.state = state || {};

    $rootScope.$watch(function () {
      return service.state;
    }, function (newValue) {
      localStorageService.set(key, newValue);
    }, true);

    return service;
  });
