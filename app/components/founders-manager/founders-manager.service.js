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
      createFromRaw: function (json) {
        var founders = FoundersFactory.createFromJson(json.founders);
        Factory.create(founders, json.selectedItems, json.filterStates, json.sortStates);
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

    //marker
    FoundersManager.prototype.chooseAsMarker = function ($index) {
      this.founders.markerColumn = $index;
    };

    FoundersManager.prototype.isMarker = function ($index) {
      return this.founders.markerColumn === $index;
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
    FoundersManager.prototype.setFilter = function ($index, value) {
      this.filterStates = FilterHandler.setFilter(this.filterStates, $index, value);
    };

    FoundersManager.prototype.resetFilters = function () {
      this.filterStates = FilterHandler.resetFilters();
    };

    FoundersManager.prototype.passesFilter = function (item) {
      return FilterHandler.passesFilter(this.filterStates, item);
    };

    //sorting
    FoundersManager.prototype.getSortStateForColumn = function (key) {
      return SortHandler.getSortState(this.sortStates, key);
    };

    FoundersManager.prototype.applySort = function (state, key) {
      this.sortStates = SortHandler.resetSorts(); //support only one column sort
      this.sortStates = SortHandler.applySort(this.sortStates, state, key);
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
