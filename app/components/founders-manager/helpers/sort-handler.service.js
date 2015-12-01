'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.foundersManager.SortHandler
 * @description
 * # SortHandler
 * Service in the foundersMapQuestApp.foundersManager.
 */
angular.module('foundersMapQuestApp.foundersManager')
  .factory('SortHandler', function () {
    var service = {
      getSortState: function (sortStates, key) {
        return sortStates[key];
      },
      getSortKeys: function (sortStates) {
        return Object.keys(sortStates);
      },
      applySort: function (sortStates, state, key) {
        sortStates[key] = state;

        return sortStates;
      },
      resetSorts: function () {
        return {};
      }
    };

    return service;
  });
