'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.SelectHandler
 * @description
 * # SelectHandler
 * Service in the foundersMapQuestApp.
 */
angular.module('foundersMapQuestApp')
  .factory('SelectHandler', function () {
    var service = {
      allSelected: function (items, selectedItems) {
        return Object.keys(selectedItems).length === items.length;
      },
      isSelected: function (selectedItems, key) {
        return typeof selectedItems[key] !== 'undefined';
      },

      toggleSelection: function (items, key, selectedItems) {
        if (service.isSelected(selectedItems, key)) {
          delete selectedItems[key];
        } else {
          selectedItems[key] = true;
        }

        return selectedItems;
      },
      toggleAllSelection: function (items, selectedItems) {
        if (service.allSelected(items, selectedItems)) {
          return service.unselectAll();
        } else {
          return service.selectAll(items);
        }
      },

      selectAll: function (items) {
        var selectedItems = {};
        angular.forEach(items, function (item, key) {
          selectedItems[key] = true;
        });

        return selectedItems;
      },
      unselectAll: function () {
        return {};
      }
    };

    return service;
  });
