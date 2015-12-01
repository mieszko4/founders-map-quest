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
angular.module('foundersMapQuestApp.foundersManager')
  .factory('FoundersFactory', function (Founders, Csv, ColumnFactory) {
    var Factory = {
      create: function (header, items, delimiter, latitudeColumn, longitudeColumn, markerColumn) {
        return new Founders(header, items, delimiter, latitudeColumn, longitudeColumn, markerColumn);
      },
      createFromJson: function (json) {
        var header = json.header;
        if (typeof header !== 'undefined') {
          header = json.header.map(function (columnJson) {
            return ColumnFactory.createFromJson(columnJson);
          });
        }

        return new Founders(header, json.items, json.delimiter, json.latitudeColumn, json.longitudeColumn, json.markerColumn);
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
    var defaultMarkerColumn = 0;

    var Founders = function (header, items, delimiter, latitudeColumn, longitudeColumn, markerColumn) {
      Csv.call(this, header, items, delimiter); //super

      this.latitudeColumn = typeof latitudeColumn !== 'undefined' ? latitudeColumn : null;
      this.longitudeColumn = typeof longitudeColumn !== 'undefined' ? longitudeColumn : null;
      this.markerColumn = typeof markerColumn !== 'undefined' ? markerColumn : defaultMarkerColumn;
    };

    //augment
    Founders.prototype = Object.create(Csv.prototype);
    Founders.prototype.constructor = Founders;

    //marker
    Founders.prototype.chooseAsMarker = function (column) {
      this.markerColumn = this.header.indexOf(column);
    };

    Founders.prototype.isMarker = function (column) {
      return this.markerColumn === this.header.indexOf(column);
    };

    var linkRegExp = new RegExp(/https?:\/\/(.+)/);
    var imageRegExp = new RegExp(/.+\.(jpg|jpeg|png|gif|svg|bmp)$/);
    Founders.prototype.detectType = function (value, column) {
      var type = null;
      var index = this.header.indexOf(column);

      if (index === this.latitudeColumn) {
        type = 'latitude';
      } else if (index === this.longitudeColumn) {
        type = 'longitude';
      } else if (linkRegExp.test(value)) {
        if (imageRegExp.test(value)) {
          type = 'image';
        } else {
          type = 'link';
        }
      }

      return type;
    };

    Founders.prototype.getMarkerContentType = function (item) {
      return this.detectType(item[this.markerColumn], this.header[this.markerColumn]);
    };

    Founders.prototype.setDefaultMarkerColumn = function () {
      this.markerColumn = defaultMarkerColumn;
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
            if (newValue === null && column.name.match(coordinateRegExps[type])) {
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
