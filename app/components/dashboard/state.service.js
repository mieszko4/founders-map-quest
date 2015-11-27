'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.dashboard.State
 * @description
 * # State
 * Service in the foundersMapQuestApp.dashboard.
 */
angular.module('foundersMapQuestApp.dashboard')
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
