'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.Founders
 * @description
 * # Founders
 * Service in the foundersMapQuestApp.
 */
angular.module('foundersMapQuestApp')
  .factory('Founders', function (Papa) {
    var delimiters = [
      {
        delimiter: ',',
        label: 'Comma'
      },
      {
        delimiter: ';',
        label: 'Colon'
      },
      {
        delimiter: '\t',
        label: 'Tab'
      }
    ];

    var service = {
      header: null,
      items: [],
      latitudeColumn: null,
      longitudeColumn: null,

      defaultDelimiter: ',',
      delimiters: delimiters,

      decode: function (raw, delimiter) {
        delimiter = typeof delimiter !== 'undefined' ? delimiter : ''; //default is auto

        var csv = Papa.parse(raw, {
          header: true,
          delimiter: delimiter,
          skipEmptyLines: true
        });

        var header = csv.meta.fields;
        var items = false;

        if (csv.errors.length === 0) {
          //convert to array form
          items = [];
          angular.forEach(csv.data, function (rowData) {
            var item = [];

            angular.forEach(header, function (column) {
              item.push(rowData[column]);
            });

            items.push(item);
          });
        }

        return {
          header: header,
          items: items,
          meta: csv.meta
        };
     },
     encode: function (header, items, delimiter) {
       if (header === null || typeof header === 'undefined') {
         return '';
       }

       var raw = Papa.unparse([header].concat(items), {
         newline: '\n',
         delimiter: delimiter
       });

       return raw;
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
