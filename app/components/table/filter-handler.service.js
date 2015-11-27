'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.table.FilterHandler
 * @description
 * # FilterHandler
 * Service in the foundersMapQuestApp.table.
 */
angular.module('foundersMapQuestApp.table')
  .factory('FilterHandler', function () {
    var service = {
      passesFilter: function (filterStates, item) {
        var include = true;
        angular.forEach(filterStates, function (search, key) {
          var searchLowered = search.toLowerCase();
          if (typeof search !== 'undefined' && search !== '') {
            var value = item[key];

            //treat all values as strings
            if ((''+value).toLowerCase().indexOf(searchLowered) === -1) {
              include = false;
              return false; //break
            }
          }
        });

        return include;
      }
    };

    return service;
  });
