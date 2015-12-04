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
  .factory('FoundersManagerFactory', function (FoundersManager, FoundersFactory) {
    var Factory = {
      create: function (founders, selectedItems, filterStates, sortStates) {
        return new FoundersManager(founders, selectedItems, filterStates, sortStates);
      },
      createFromJson: function (json) {
        var founders = FoundersFactory.createFromJson(json.founders);
        return Factory.create(founders, json.selectedItems, json.filterStates, json.sortStates);
      }
    };

    return Factory;
  })

  .factory('FoundersManager', function (SelectHandler, FilterHandler, SortHandler, SortStates) {
    var FoundersManager = function (founders, selectedItems, filterStates, sortStates) {
      this.founders = founders;

      this.selectedItems = selectedItems || SelectHandler.selectAll(founders.items || []);
      this.filterStates = filterStates || FilterHandler.resetFilters();
      this.sortStates = sortStates || SortHandler.resetSorts();
    };

    //selection
    FoundersManager.prototype.allSelected = function () {
      return SelectHandler.allSelected(this.founders.items || [], this.selectedItems);
    };

    FoundersManager.prototype.isSelected = function (item) {
      var key = (this.founders.items || []).indexOf(item);

      if (key !== -1) {
        return SelectHandler.isSelected(this.selectedItems, key);
      }
    };

    FoundersManager.prototype.toggleAllSelection = function () {
      this.selectedItems = SelectHandler.toggleAllSelection(this.founders.items || [], this.selectedItems);
    };

    FoundersManager.prototype.toggleSelection = function (item) {
      var key = (this.founders.items || []).indexOf(item);

      if (key !== -1) {
        this.selectedItems = SelectHandler.toggleSelection(this.selectedItems, key);
        return true;
      } else {
        return false;
      }
    };

    //filtering
    FoundersManager.prototype.setFilter = function (column, value) {
      var key = this.founders.header.indexOf(column);

      if (key !== -1) {
        this.filterStates = FilterHandler.setFilter(this.filterStates, key, value);
        return true;
      } else {
        return false;
      }
    };

    FoundersManager.prototype.getFilter = function (column) {
      var key = this.founders.header.indexOf(column);

      if (key !== -1) {
        return FilterHandler.getFilter(this.filterStates, key);
      }
    };

    FoundersManager.prototype.resetFilters = function () {
      this.filterStates = FilterHandler.resetFilters();
    };

    FoundersManager.prototype.passesFilter = function (item) {
      return FilterHandler.passesFilter(this.filterStates, item);
    };

    //sorting
    FoundersManager.prototype.getSort = function (column) {
      var key = this.founders.header.indexOf(column);

      if (key !== -1) {
        return SortHandler.getSortState(this.sortStates, key);
      }
    };

    FoundersManager.prototype.applySort = function (column, state) {
      this.sortStates = SortHandler.resetSorts(); //support only one column sort
      var key = this.founders.header.indexOf(column);

      if (key !== -1) {
        this.sortStates = SortHandler.applySort(this.sortStates, state, key);
        return true;
      } else {
        return false;
      }
    };

    FoundersManager.prototype.getSortConfig = function () {
      var key = SortHandler.getSortKeys(this.sortStates)[0]; //support only one column sort

      if (typeof key === 'undefined' || this.sortStates[key] === SortStates.NONE) {
        return {
          predicate: undefined,
          reverse: false
        };
      }

      return {
        predicate: key,
        reverse: this.sortStates[key] === SortStates.DESC
      };
    };

    FoundersManager.prototype.resetSorts = function () {
      this.sortStates = SortHandler.resetSorts();
    };

    //other
    FoundersManager.prototype.toJson = function () {
      return {
        founders: this.founders.toJson(),
        filterStates: this.filterStates,
        selectedItems: this.selectedItems,
        sortStates: this.sortStates
      };
    };

    return FoundersManager;
  });
