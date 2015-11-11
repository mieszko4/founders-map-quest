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
    var trimItems = function (items, removeEmpty) {
      var trimmedItems = [];

      angular.forEach(items, function (item) {
        var trimmedItem = item.trim();

        if (trimmedItem.length > 0 || !removeEmpty) {
          trimmedItems.push(trimmedItem);
        }
      });

      return items;
    };

    var service = {
      header: null,
      items: [],
      latitudeColumn: null,
      longitudeColumn: null,

      parseRawData: function (raw, delimiter) {
       var items = [];

       var rows = raw.split(/\n\r?/);
       rows = trimItems(rows, true);

       //first row is column data
       var header = rows.shift().split(delimiter);
       header = trimItems(header, false);

       var valid = true;
       angular.forEach(rows, function (row) {
         var columns = row.split(delimiter);
         columns = trimItems(columns, false);

         if (columns.length !== header.length) {
           valid = false;
           return false; //break loop
         } else {
           items.push(columns);
         }
       });

       if (!valid) {
         return false;
       } else {
         return {
           header: header,
           items: items
         };
       }
     },
      setFounders: function (header, items, latitudeColumn, longitudeColumn) {
        this.header = header;
        this.items = items;
        this.latitudeColumn = latitudeColumn;
        this.longitudeColumn = longitudeColumn;

        return this.items;
      }
    };

    return service;
  });
