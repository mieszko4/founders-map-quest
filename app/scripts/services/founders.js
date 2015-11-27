'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.Founders
 * @description
 * # Founders
 * Service in the foundersMapQuestApp.
 */
angular.module('foundersMapQuestApp')
  .factory('FoundersFactory', function (Founders, Papa) {
    var Factory = {
      create: function (header, items, delimiter, latitudeColumn, longitudeColumn) {
        return new Founders(header, items, delimiter, latitudeColumn, longitudeColumn);
      },
      createFromRaw: function (raw, delimiter, latitudeColumn, longitudeColumn) {
        delimiter = typeof delimiter !== 'undefined' ? delimiter : ''; //default is auto

        var csv = Papa.parse(raw, {
          header: true,
          skipEmptyLines: true,
          delimiter: delimiter
        });

        var header = csv.meta.fields;
        var items;

        if (csv.errors.length === 0) {
          //convert to array of arrays
          items = [];
          angular.forEach(csv.data, function (rowData) {
            var item = [];

            angular.forEach(header, function (column) {
              item.push(rowData[column]);
            });

            items.push(item);
          });
        } else {
          items = false;
        }

        return Factory.create(header, items, csv.meta.delimiter, latitudeColumn, longitudeColumn);
      }
    };

    return Factory;
  })

  .factory('Founders', function (Papa) {
    var linkRegExp = new RegExp(/https?:\/\/(.+)/);
    var imageRegExp = new RegExp(/.+\.(jpg|jpeg|png|gif|svg|bmp)$/);

    var Founders = function (header, items, delimiter, latitudeColumn, longitudeColumn) {
      this.header = header;
      this.items = items;
      this.delimiter = delimiter;

      this.latitudeColumn = latitudeColumn;
      this.longitudeColumn = longitudeColumn;
    };

    Founders.prototype.encodeToRaw = function () {
      var raw = Papa.unparse([this.header].concat(this.items), {
        newline: '\n',
        delimiter: this.delimiter
      });

      return raw;
    };

    Founders.prototype.detectType = function (item, $index) {
      var type = null;

      if ($index === this.latitudeColumn) {
        type = 'latitude';
      } else if ($index === this.longitudeColumn) {
        type = 'longitude';
      } else if (linkRegExp.test(item)) {
        if (imageRegExp.test(item)) {
          type = 'image';
        } else {
          type = 'link';
        }
      }

      return type;
    };

    //static settings
    Founders.defaultDelimiter = ',';
    Founders.delimiters = [
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

    return Founders;
  });
