'use strict';

describe('Directive: fmqTable', function () {

  // load the directive's module
  beforeEach(module('templates'));
  beforeEach(module('foundersMapQuestApp.table'));

  var element,
    callbacks,
    foundersManager,
    $scope;

  beforeEach(inject(function ($rootScope, ColumnFactory, FoundersFactory, FoundersManagerFactory) {
    var header = [
      ColumnFactory.create('a'),
      ColumnFactory.create('b'),
      ColumnFactory.create('c')
    ];
    var items = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    var delimiter = ';';
    var latitudeColumn = 1;
    var longitudeColumn = 2;
    var markerColumn = 1;

    var founders = FoundersFactory.create(header, items, delimiter, latitudeColumn, longitudeColumn, markerColumn);
    foundersManager = FoundersManagerFactory.create(founders);

    callbacks = {
      viewItem: function () {}
    };

    spyOn(callbacks, 'viewItem');
    $scope = $rootScope.$new();
    $scope.foundersManager = foundersManager;

    $scope.viewItemCallback = callbacks.viewItem;

    element = angular.element('<fmq-table view-item="viewItemCallback(item)" founders-manager="foundersManager"></fmq-table>');
  }));

  it('should handle marker column set and check', inject(function ($compile) {
    element = $compile(element)($scope);
    $scope.$apply();

    var vm = element.isolateScope().vm;
    expect(vm.founders).toBe(foundersManager.founders);

    expect(vm.isMarker(foundersManager.founders.header[0])).toBe(false);
    expect(vm.isMarker(foundersManager.founders.header[1])).toBe(true);
    expect(vm.isMarker(foundersManager.founders.header[2])).toBe(false);

    //choose another
    vm.chooseAsMarker(foundersManager.founders.header[0]);
    expect(vm.isMarker(foundersManager.founders.header[0])).toBe(true);
    expect(vm.isMarker(foundersManager.founders.header[1])).toBe(false);
    expect(vm.isMarker(foundersManager.founders.header[2])).toBe(false);
  }));

  it('should handle item selection', inject(function ($compile) {
    element = $compile(element)($scope);
    $scope.$apply();

    var vm = element.isolateScope().vm;
    expect(vm.founders).toBe(foundersManager.founders);

    expect(vm.isSelected(foundersManager.founders.items[0])).toBe(true);
    expect(vm.isSelected(foundersManager.founders.items[1])).toBe(true);
    expect(vm.isSelected(foundersManager.founders.items[2])).toBe(true);
    expect(vm.allSelected).toBe(true);

    //unselect all
    vm.toggleAllSelection();
    $scope.$apply();
    expect(vm.isSelected(foundersManager.founders.items[0])).toBe(false);
    expect(vm.isSelected(foundersManager.founders.items[1])).toBe(false);
    expect(vm.isSelected(foundersManager.founders.items[2])).toBe(false);
    expect(vm.allSelected).toBe(false);

    //select single
    vm.toggleSelection(foundersManager.founders.items[0]);
    $scope.$apply();
    expect(vm.isSelected(foundersManager.founders.items[0])).toBe(true);
    expect(vm.isSelected(foundersManager.founders.items[1])).toBe(false);
    expect(vm.isSelected(foundersManager.founders.items[2])).toBe(false);
    expect(vm.allSelected).toBe(false);

    //unselect single
    vm.toggleSelection(foundersManager.founders.items[0]);
    $scope.$apply();
    expect(vm.isSelected(foundersManager.founders.items[0])).toBe(false);
    expect(vm.isSelected(foundersManager.founders.items[1])).toBe(false);
    expect(vm.isSelected(foundersManager.founders.items[2])).toBe(false);
    expect(vm.allSelected).toBe(false);

    //select two
    vm.toggleSelection(foundersManager.founders.items[0]);
    vm.toggleSelection(foundersManager.founders.items[1]);
    $scope.$apply();
    expect(vm.isSelected(foundersManager.founders.items[0])).toBe(true);
    expect(vm.isSelected(foundersManager.founders.items[1])).toBe(true);
    expect(vm.isSelected(foundersManager.founders.items[2])).toBe(false);
    expect(vm.allSelected).toBe(false);
  }));

  it('should handle item filtering', inject(function ($compile) {
    function getFilterStates () {
      return foundersManager.founders.header.map(function (column) {
        return foundersManager.getFilter(column);
      });
    }

    element = $compile(element)($scope);
    $scope.$apply();

    var vm = element.isolateScope().vm;
    expect(vm.founders).toBe(foundersManager.founders);

    expect(vm.passesFilter(foundersManager.founders.items[0])).toBe(true);
    expect(vm.passesFilter(foundersManager.founders.items[1])).toBe(true);
    expect(vm.passesFilter(foundersManager.founders.items[2])).toBe(true);
    expect(vm.filterStates).toEqual(getFilterStates());

    //filter single
    vm.setFilter(foundersManager.founders.header[0], '4');
    $scope.$apply();
    expect(vm.passesFilter(foundersManager.founders.items[0])).toBe(false);
    expect(vm.passesFilter(foundersManager.founders.items[1])).toBe(true);
    expect(vm.passesFilter(foundersManager.founders.items[2])).toBe(false);
    expect(vm.filterStates).toEqual(getFilterStates());

    //unfilter single
    vm.setFilter(foundersManager.founders.header[0], '');
    $scope.$apply();
    expect(vm.passesFilter(foundersManager.founders.items[0])).toBe(true);
    expect(vm.passesFilter(foundersManager.founders.items[1])).toBe(true);
    expect(vm.passesFilter(foundersManager.founders.items[2])).toBe(true);
    expect(vm.filterStates).toEqual(getFilterStates());

    //filter two
    vm.setFilter(foundersManager.founders.header[0], '4');
    vm.setFilter(foundersManager.founders.header[1], '5');
    $scope.$apply();
    expect(vm.passesFilter(foundersManager.founders.items[0])).toBe(false);
    expect(vm.passesFilter(foundersManager.founders.items[1])).toBe(true);
    expect(vm.passesFilter(foundersManager.founders.items[2])).toBe(false);
    expect(vm.filterStates).toEqual(getFilterStates());

    vm.resetFilters();
    $scope.$apply();
    expect(vm.passesFilter(foundersManager.founders.items[0])).toBe(true);
    expect(vm.passesFilter(foundersManager.founders.items[1])).toBe(true);
    expect(vm.passesFilter(foundersManager.founders.items[2])).toBe(true);
    expect(vm.filterStates).toEqual(getFilterStates());
  }));

  it('should handle item sorting', inject(function ($compile, SortStates) {
    function getSortStates () {
      return foundersManager.founders.header.map(function (column) {
        return foundersManager.getSort(column) || SortStates.NONE;
      });
    }

    element = $compile(element)($scope);
    $scope.$apply();

    var vm = element.isolateScope().vm;
    expect(vm.founders).toBe(foundersManager.founders);

    expect(vm.sortStates).toEqual(getSortStates());
    expect(vm.sortConfig).toEqual(foundersManager.getSortConfig());


    //sort single
    vm.applySort(foundersManager.founders.header[0], SortStates.ASC);
    $scope.$apply();
    expect(vm.sortStates).toEqual(getSortStates());
    expect(vm.sortConfig).toEqual(foundersManager.getSortConfig());

    //sort single again
    vm.applySort(foundersManager.founders.header[0], SortStates.DESC);
    $scope.$apply();
    expect(vm.sortStates).toEqual(getSortStates());
    expect(vm.sortConfig).toEqual(foundersManager.getSortConfig());

    //sort two
    vm.applySort(foundersManager.founders.header[0], SortStates.DESC);
    vm.applySort(foundersManager.founders.header[1], SortStates.ASC);
    $scope.$apply();
    expect(vm.sortStates).toEqual(getSortStates());
    expect(vm.sortConfig).toEqual(foundersManager.getSortConfig());

    //reset sort
    vm.resetSorts();
    $scope.$apply();
    expect(vm.sortStates).toEqual(getSortStates());
    expect(vm.sortConfig).toEqual(foundersManager.getSortConfig());
  }));

});
