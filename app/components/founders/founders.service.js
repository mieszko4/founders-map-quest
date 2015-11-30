'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.founders.Founders
 * @augments Csv
 * @description
 * # Founders
 * Service in the foundersMapQuestApp.founders.
 * founders object *is a* csv object (csv data with additional annotations)
 */
angular.module('foundersMapQuestApp.founders')
  .factory('FoundersFactory', function (Founders, Csv) {
    var Factory = {
      create: function (header, items, delimiter, latitudeColumn, longitudeColumn, markerColumn) {
        return new Founders(header, items, delimiter, latitudeColumn, longitudeColumn, markerColumn);
      },
      createFromJson: function (json) {
        return new Founders(json.header, json.items, json.delimiter, json.latitudeColumn, json.longitudeColumn, json.markerColumn);
      },
      createFromRaw: function (raw, delimiter, latitudeColumn, longitudeColumn, markerColumn) {
        var parsedData = Csv.parse(raw, delimiter);

        return Factory.create(parsedData.header, parsedData.items, parsedData.delimiter, latitudeColumn, longitudeColumn, markerColumn);
      },

      clone: function (founders) {
        return Factory.createFromJson(JSON.parse(JSON.stringify(founders.toJson())));
      }
    };

    return Factory;
  })

  .factory('Founders', function (Csv) {
    var Founders = function (header, items, delimiter, latitudeColumn, longitudeColumn, markerColumn) {
      Csv.call(this, header, items, delimiter); //super

      this.latitudeColumn = typeof latitudeColumn !== 'undefined' ? latitudeColumn : null;
      this.longitudeColumn = typeof longitudeColumn !== 'undefined' ? longitudeColumn : null;
      this.markerColumn = typeof markerColumn !== 'undefined' ? markerColumn : 0;
    };

    //augment
    Founders.prototype = Object.create(Csv.prototype);
    Founders.prototype.constructor = Founders;

    var linkRegExp = new RegExp(/https?:\/\/(.+)/);
    var imageRegExp = new RegExp(/.+\.(jpg|jpeg|png|gif|svg|bmp)$/);
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

    var coordinateRegExps = {
      latitude: new RegExp(/latitude|\blat\b/i),
      longitude: new RegExp(/longitude|\blng\b/i)
    };
    Founders.prototype.autoSetCoordinateColumns = function () {
      ['latitude', 'longitude'].forEach(function (type) {
        var newValue = this[type + 'Column'];
        if (newValue === null) {
          this.header.forEach(function (column, i) {
            if (newValue === null && column.match(coordinateRegExps[type])) {
              newValue = i;
            }
          });

          this[type + 'Column'] = newValue;
        }
      }, this);
    };

    Founders.prototype.toJson = function () {
      var csvJson = Csv.prototype.toJson.call(this); //super

      return angular.extend(csvJson, {
        latitudeColumn: this.latitudeColumn,
        longitudeColumn: this.longitudeColumn,
        markerColumn: this.markerColumn
      });
    };

    return Founders;
  });
