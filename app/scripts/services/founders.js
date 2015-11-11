'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.Founders
 * @description
 * # Founders
 * Service in the foundersMapQuestApp.
 */
angular.module('foundersMapQuestApp')
  .factory('Founders', function () {
    var service = {
      items: [],
      setFounders: function (csv, delimiter) {
        //TODO: parse csv
        console.log(csv, delimiter);
        return this.items;
      }
    };

    return service;
  });
