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
      }
    };

    return service;
  });
