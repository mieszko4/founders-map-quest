'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.founders.Founders
 * @description
 * # Column
 * Service in the foundersMapQuestApp.founders.
 */
angular.module('foundersMapQuestApp.foundersManager')
  .factory('ColumnFactory', function (Column) {
    var Factory = {
      create: function (name) {
        return new Column(name);
      },
      createFromJson: function (json) {
        return Factory.create(json.name);
      }
    };

    return Factory;
  })

  .factory('Column', function () {
    var Column = function (name) {
      this.name = name;
    };

    Column.prototype.toJson = function () {
      return {
        name: this.name
      };
    };

    return Column;
  });
