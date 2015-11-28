'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.founders.Founders
 * @description
 * # Founders
 * Service in the foundersMapQuestApp.founders.
 */
angular.module('foundersMapQuestApp.founders')
  .factory('FoundersFactory', function (Founders, Papa) {
    var Factory = {
      create: function (header, items, delimiter, latitudeColumn, longitudeColumn, markerColumn) {
        return new Founders(header, items, delimiter, latitudeColumn, longitudeColumn, markerColumn);
      },
      createFromJson: function (json) {
        return new Founders(json.header, json.items, json.delimiter, json.latitudeColumn, json.longitudeColumn, json.markerColumn);
      },
      createFromRaw: function (raw, delimiter, latitudeColumn, longitudeColumn, markerColumn) {
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
          items = csv.data.map(function (rowData) {
            return header.map(function (column) {
              return rowData[column];
            });
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

    var Founders = function (header, items, delimiter, latitudeColumn, longitudeColumn, markerColumn) {
      this.header = header || [];
      this.items = items || [];
      this.delimiter = delimiter || ',';

      this.latitudeColumn = latitudeColumn || null;
      this.longitudeColumn = longitudeColumn || null;

      this.markerColumn = markerColumn || 0;
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

    Founders.prototype.toJson = function () {
      return {
        header: this.header,
        items: this.items,
        delimiter: this.delimiter,
        latitudeColumn: this.latitudeColumn,
        longitudeColumn: this.longitudeColumn
      };
    };

    //static settings
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
