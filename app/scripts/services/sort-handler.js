'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.SortHandler
 * @description
 * # SortHandler
 * Service in the foundersMapQuestApp.
 */
angular.module('foundersMapQuestApp')
  .factory('SortHandler', function () {
    var transitions = {
      0: 1,
      1: 2,
      2: 0
    };

    var service = {
      NONE: 0,
      ASC: 1,
      DESC: 2,

      notSorted: function (sortStates, key) {
        return sortStates[key] === service.NONE || typeof sortStates[key] === 'undefined';
      },
      sortedAscending: function (sortStates, key) {
        return sortStates[key] === service.ASC;
      },
      sortedDescending: function (sortStates, key) {
        return sortStates[key] === service.DESC;
      },

      setNextState: function (sortStates, key) {
        var currentState = sortStates[key];
        var nextState = (typeof currentState === 'undefined') ? service.ASC : transitions[currentState];

        //remove all keys - supports only one column support
        angular.forEach(sortStates, function (sortState, key) {
          delete sortStates[key];
        });

        sortStates[key] = nextState;
        return nextState;
      }
    };

    return service;
  });
