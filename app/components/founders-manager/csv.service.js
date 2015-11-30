'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.founders.Founders
 * @description
 * # Csv
 * Service in the foundersMapQuestApp.founders.
 */
angular.module('foundersMapQuestApp.foundersManager')
  .factory('CsvFactory', function (Csv, ColumnFactory) {
    var Factory = {
      create: function (header, items, delimiter) {
        return new Csv(header, items, delimiter);
      },
      createFromJson: function (json) {
        var header = json.header;
        if (typeof header !== 'undefined') {
          header = json.header.map(function (columnJson) {
            return ColumnFactory.createFromJson(columnJson);
          });
        }

        return Factory.create(header, json.items, json.delimiter);
      },
      createFromRaw: function (raw, delimiter) {
        var parsedData = Csv.parse(raw, delimiter);
        return Factory.create(parsedData.header, parsedData.items, parsedData.delimiter);
      },

      clone: function (csv) {
        return Factory.createFromJson(JSON.parse(JSON.stringify(csv.toJson())));
      }
    };

    return Factory;
  })

  .factory('Csv', function (Papa, ColumnFactory) {
    var Csv = function (header, items, delimiter) {
      this.header = header || [];
      this.items = items || null;
      this.delimiter = delimiter || ',';
    };

    Csv.prototype.encodeToRaw = function () {
      var header = this.header.map(function (column) {
        return column.name;
      });

      var raw = Papa.unparse([header].concat(this.items || []), {
        newline: '\n',
        delimiter: this.delimiter
      });

      return raw;
    };

    Csv.prototype.toJson = function () {
      var header = this.header.map(function (column) {
        return column.toJson();
      });

      return {
        header: header,
        items: this.items,
        delimiter: this.delimiter
      };
    };

    Csv.parse = function (raw, delimiter) {
      delimiter = typeof delimiter !== 'undefined' ? delimiter : ''; //default is auto

      //Note: this parser has an assumption of unique column names
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
        items = null;
      }

      header = header.map(function (name) {
        return ColumnFactory.create(name);
      });

      return {
        header: header,
        items: items,
        delimiter: csv.meta.delimiter
      };
    };

    //static settings
    Csv.delimiters = [
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

    return Csv;
  });
