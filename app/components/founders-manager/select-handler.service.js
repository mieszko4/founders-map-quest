'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.founders.SelectHandler
 * @description
 * # SelectHandler
 * Service in the foundersMapQuestApp.founders.
 */
angular.module('foundersMapQuestApp.foundersManager')
  .factory('SelectHandler', function () {
    var service = {
      //get selection
      allSelected: function (items, selectedItems) {
        return Object.keys(selectedItems).length === items.length;
      },
      isSelected: function (selectedItems, key) {
        return typeof selectedItems[key] !== 'undefined';
      },

      //select
      selectAll: function (items) {
        var selectedItems = {};
        items.forEach(function (item, key) {
          selectedItems[key] = true;
        });

        return selectedItems;
      },
      unselectAll: function () {
        return {};
      },

      //reverse select
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
      }
    };

    return service;
  });
