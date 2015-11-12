'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.State
 * @description
 * # State
 * Service in the foundersMapQuestApp.
 */
angular.module('foundersMapQuestApp')
  .factory('State', function ($rootScope, localStorageService) {
    var key = 'founders';
    var service = {
      state: null
    };

    var state = localStorageService.get(key);
    service.state = state || null;

    $rootScope.$watch(function () {
      return service.state;
    }, function (newValue) {
      localStorageService.set(key, newValue);
    }, true);

    return service;
  });
