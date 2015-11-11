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
      setItems: function (items) {
        this.items = items;
        return this.items;
      }
    };

    return service;
  });
