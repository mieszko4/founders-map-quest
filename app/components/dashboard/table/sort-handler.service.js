'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.table.SortHandler
 * @description
 * # SortHandler
 * Service in the foundersMapQuestApp.table.
 */
angular.module('foundersMapQuestApp.table')
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

        //remove all keys - supports only one column sort
        Object.keys(sortStates).forEach(function (key) {
          delete sortStates[key];
        });

        sortStates[key] = nextState;
        return nextState;
      },

      getCurrentSortState: function (sortStates) {
        var keys = Object.keys(sortStates);
        if (keys.length === 0) {
          return null;
        }

        return {
          key: keys[0], //first key - support only one column sort
          state: sortStates[keys[0]]
        };
      }
    };

    return service;
  });
