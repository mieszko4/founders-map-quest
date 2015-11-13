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

    var newlineRegExp = /\n\r?/;

    var service = {
      header: null,
      items: [],
      latitudeColumn: null,
      longitudeColumn: null,

      defaultDelimiter: ',',
      delimiters: delimiters,

      detectDelimiter: function (raw) {
        //limit possible delimiters
        var possibleDelimiters = [];
        angular.forEach(delimiters, function (item) {
          possibleDelimiters.push(item.delimiter);
        });

        //go line by line comparing line frequencies
        var frequencies = {};
        angular.forEach(raw.split(newlineRegExp), function (line, lineNumber) {
          var lineFrequencies = {};
          angular.forEach(line, function (character) {
            if (possibleDelimiters.indexOf(character) === -1) {
              return true; //continut
            }

            lineFrequencies[character] = (typeof lineFrequencies[character] !== 'undefined') ? lineFrequencies[character] + 1 : 1;
          });

          //check which delimiter passes to the next round
          angular.forEach(possibleDelimiters, function (delimiter) {
            if (typeof frequencies[delimiter] === 'undefined' && lineNumber === 0) {
              frequencies[delimiter] = lineFrequencies[delimiter]; //inital state
            } else if (frequencies[delimiter] !== lineFrequencies[delimiter]) {
              frequencies[delimiter] = null;
            }
          });
        });
        
        //choose delimiter by highest frequency
        var max = -1;
        var bestDelimiter = null;
        angular.forEach(frequencies, function (count, delimiter) {
          if (count !== null && count > max) {
            max = count;
            bestDelimiter = delimiter;
          }
        });

        return bestDelimiter;
      },

      decode: function (raw, delimiter) {
       var items = [];

       var rows = raw.trim().split(newlineRegExp);
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
         items = false;
       }

       return {
         header: header,
         items: items
       };
     },
     encode: function (header, items, delimiter) {
       if (header === null || typeof header === 'undefined') {
         return '';
       }

       var raw = header.join(delimiter);
       var rows = [];

       angular.forEach(items, function (item) {
         rows.push(item.join(delimiter));
       });
       raw += '\n' + rows.join('\n');

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
