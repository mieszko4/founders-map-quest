'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.founders.Founders
 * @description
 * # FoundersManager
 * Service in the foundersMapQuestApp.founders.
 * foundersManager *has a* founders
 */
angular.module('foundersMapQuestApp.foundersManager')
  .factory('FoundersManagerFactory', function (FoundersManager) {
    var Factory = {
      create: function (founders) {
        return new FoundersManager(founders);
      }
    };

    return Factory;
  })

  .factory('FoundersManager', function (SelectHandler, FilterHandler) {
    var FoundersManager = function (founders) {
      this.founders = founders;

      //TODO: pass state with params
      this.selectedItems = SelectHandler.selectAll(founders.items || []);
      this.filterStates = FilterHandler.resetFilters();
    };

    //marker
    FoundersManager.prototype.chooseAsMarker = function (column) {
      this.founders.markerColumn = this.founders.header.indexOf(column);
    };

    //selection
    FoundersManager.prototype.allSelected = function () {
      return SelectHandler.allSelected(this.founders.items || [], this.selectedItems);
    };

    FoundersManager.prototype.isSelected = function (item) {
      return SelectHandler.isSelected(this.selectedItems, (this.founders.items || []).indexOf(item));
    };

    FoundersManager.prototype.toggleAllSelection = function () {
      this.selectedItems = SelectHandler.toggleAllSelection(this.founders.items || [], this.selectedItems);
    };

    FoundersManager.prototype.toggleSelection = function (item) {
      return SelectHandler.toggleSelection(this.founders.items || [], (this.founders.items || []).indexOf(item), this.selectedItems);
    };

    //filtering
    FoundersManager.prototype.setFilter = function (column, value) {
      this.filterStates = FilterHandler.setFilter(this.filterStates, this.founders.header.indexOf(column), value);
    };
    
    FoundersManager.prototype.resetFilters = function () {
      this.filterStates = FilterHandler.resetFilters();
    };

    FoundersManager.prototype.passesFilter = function (item) {
      return FilterHandler.passesFilter(this.filterStates, item);
    };

    //sorting
    //TODO

    //other
    FoundersManager.prototype.toJson = function () {
      //TODO: manager properties
      return {
        founders: this.founders.toJson(),
        selectedItems: this.selectedItems
      };
    };

    return FoundersManager;
  });
