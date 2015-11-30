'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.foundersManager.FilterHandler
 * @description
 * # FilterHandler
 * Service in the foundersMapQuestApp.foundersManager.
 */
angular.module('foundersMapQuestApp.foundersManager')
  .factory('FilterHandler', function () {
    var service = {
      setFilter: function (filterStates, key, value) {
        filterStates[key] = value;
        return filterStates;
      },
      resetFilters: function () {
        return {};
      },
      passesFilter: function (filterStates, item) {
        var include = true;

        Object.keys(filterStates).forEach(function (key) {
          if (!include) {
            return;
          }

          var search = filterStates[key];
          if (typeof search !== 'undefined' && search !== '') {
            var searchLowered = search.toLowerCase();
            var value = item[key];

            //treat all values as strings
            if ((''+value).toLowerCase().indexOf(searchLowered) === -1) {
              include = false;
            }
          }
        });

        return include;
      }
    };

    return service;
  });
