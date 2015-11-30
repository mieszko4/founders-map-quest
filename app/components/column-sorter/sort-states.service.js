'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.columnSorter.SortStates
 * @description
 * # SortStates
 * Service in the foundersMapQuestApp.columnSorter.
 */
angular.module('foundersMapQuestApp.columnSorter')
  .factory('SortStates', function () {
    var states = {
      NONE: 0,
      ASC: 1,
      DESC: 2
    };
    var transitions = {
      0: states.ASC, //key: service.NONE
      1: states.DESC, //key: service.ASC
      2: states.NONE //key: service.DESC
    };

    var service = {
      NONE: states.NONE,
      ASC: states.ASC,
      DESC: states.DESC,

      getNextState: function (state) {
        var nextState = (typeof state === 'undefined') ? service.ASC : transitions[state];

        return nextState;
      }
    };

    return service;
  });
