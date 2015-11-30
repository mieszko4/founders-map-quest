'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.state.State
 * @description
 * # State
 * Service in the foundersMapQuestApp.state.
 */
angular.module('foundersMapQuestApp.state')
  .factory('StateFactory', function (State) {
    var Factory = {
      create: function (key) {
        return new State(key);
      }
    };

    return Factory;
  })

  .factory('State', function (localStorageService) {
    var State = function (key) {
      this.key = key;
      var value = localStorageService.get(key);
      this.value = (typeof value !== 'undefined') ? value : null;
    };

    State.prototype.set = function (value) {
      this.value = value;

      return this;
    };

    State.prototype.save = function () {
      localStorageService.set(this.key, this.value);

      return this;
    };

    State.prototype.get = function () {
      return this.value;
    };

    return State;
  });
