'use strict';

describe('Service: FoundersManagerFactory', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.foundersManager'));

  // instantiate service
  var FoundersManagerFactory,
    FoundersFactory,
    FoundersManager;

  beforeEach(inject(function (_FoundersManagerFactory_, _FoundersManager_, _FoundersFactory_) {
    FoundersManagerFactory = _FoundersManagerFactory_;
    FoundersFactory = _FoundersFactory_;
    FoundersManager = _FoundersManager_;
  }));

  it('should exist', function () {
    expect(!!FoundersManagerFactory).toBe(true);
  });

  it('should create a FoundersManager from parameters', function () {
    var founders = FoundersFactory.create();
    var foundersManager = FoundersManagerFactory.create(founders);


    expect(foundersManager.founders).toBe(founders);
    expect(foundersManager.allSelected()).toBe(true);
    expect(Object.keys(foundersManager.filterStates).length).toBe(0);
    expect(Object.keys(foundersManager.sortStates).length).toBe(0);
  });


  it('should create a Founders from json', function () {
    var foundersJson = FoundersFactory.create().toJson();
    var foundersManager = FoundersManagerFactory.createFromJson({
      founders: foundersJson
    });

    expect(foundersManager.founders.toJson()).toEqual(foundersJson);
    expect(foundersManager.allSelected()).toBe(true);
    expect(Object.keys(foundersManager.filterStates).length).toBe(0);
    expect(Object.keys(foundersManager.sortStates).length).toBe(0);
  });
});

describe('Service: FoundersManager', function () {
  function createFounders() {
    var header = [
      new Column('a'),
      new Column('b'),
      new Column('c')
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

    return new Founders(header, items, delimiter, latitudeColumn, longitudeColumn, markerColumn);
  }

  // load the service's module
  beforeEach(module('foundersMapQuestApp.foundersManager'));

  // instantiate service
  var FoundersManager,
    Column,
    SortStates,
    Founders;

  beforeEach(inject(function (_FoundersManager_, _Founders_, _Column_, _SortStates_) {
    FoundersManager = _FoundersManager_;
    Column = _Column_;
    SortStates = _SortStates_;
    Founders = _Founders_;
  }));

  it('should exist', function () {
    expect(!!FoundersManager).toBe(true);
  });

  it('should create empty/default FoundersManager', function () {
    var founders = new Founders();
    var foundersManager = new FoundersManager(founders);

    expect(foundersManager.founders).toEqual(founders);
    expect(foundersManager.selectedItems).toEqual({});
    expect(foundersManager.filterStates).toEqual({});
    expect(foundersManager.sortStates).toEqual({});

    expect(foundersManager.toJson()).toEqual({
      founders: founders.toJson(),
      selectedItems: {},
      filterStates: {},
      sortStates: {}
    });

    expect(foundersManager instanceof FoundersManager);
  });

  it('should create a FoundersManager', function () {
    var founders = createFounders();
    var foundersManager = new FoundersManager(founders);

    expect(foundersManager.founders).toEqual(founders);
    expect(foundersManager.allSelected()).toBe(true);
    expect(Object.keys(foundersManager.filterStates).length).toBe(0);
    expect(Object.keys(foundersManager.sortStates).length).toBe(0);

    expect(foundersManager instanceof FoundersManager);

    expect(foundersManager.toJson()).toEqual({
      founders: founders.toJson(),
      selectedItems: {0: true, 1: true, 2: true},
      filterStates: {},
      sortStates: {}
    });
  });

  it('should manage selection', function () {
    var founders = createFounders();
    var foundersManager = new FoundersManager(founders);

    //test all
    expect(foundersManager.allSelected()).toBe(true);

    foundersManager.toggleAllSelection();
    expect(foundersManager.allSelected()).toBe(false);

    //test single
    expect(foundersManager.isSelected(foundersManager.founders.items[0])).toBe(false);
    expect(foundersManager.isSelected(foundersManager.founders.items[1])).toBe(false);
    expect(foundersManager.isSelected(foundersManager.founders.items[2])).toBe(false);

    foundersManager.toggleSelection(foundersManager.founders.items[0]);
    expect(foundersManager.isSelected(foundersManager.founders.items[0])).toBe(true);
    expect(foundersManager.isSelected(foundersManager.founders.items[1])).toBe(false);
    expect(foundersManager.isSelected(foundersManager.founders.items[2])).toBe(false);
    expect(foundersManager.allSelected()).toBe(false);

    foundersManager.toggleSelection(foundersManager.founders.items[1]);
    foundersManager.toggleSelection(foundersManager.founders.items[2]);
    expect(foundersManager.isSelected(foundersManager.founders.items[0])).toBe(true);
    expect(foundersManager.isSelected(foundersManager.founders.items[1])).toBe(true);
    expect(foundersManager.isSelected(foundersManager.founders.items[2])).toBe(true);
    expect(foundersManager.allSelected()).toBe(true);
  });

  it('should manage filtering', function () {
    var founders = createFounders();
    var foundersManager = new FoundersManager(founders);

    //all empty filters
    expect(foundersManager.getFilter(foundersManager.founders.header[0])).not.toBeDefined();
    expect(foundersManager.getFilter(foundersManager.founders.header[1])).not.toBeDefined();
    expect(foundersManager.getFilter(foundersManager.founders.header[2])).not.toBeDefined();

    //all pass
    expect(foundersManager.passesFilter(foundersManager.founders.items[0])).toBe(true);
    expect(foundersManager.passesFilter(foundersManager.founders.items[1])).toBe(true);
    expect(foundersManager.passesFilter(foundersManager.founders.items[2])).toBe(true);

    //set passing filter
    foundersManager.setFilter(foundersManager.founders.header[0], '4');
    expect(foundersManager.getFilter(foundersManager.founders.header[0])).toBe('4');
    expect(foundersManager.passesFilter(foundersManager.founders.items[0])).toBe(false);
    expect(foundersManager.passesFilter(foundersManager.founders.items[1])).toBe(true);
    expect(foundersManager.passesFilter(foundersManager.founders.items[2])).toBe(false);

    //all pass
    foundersManager.resetFilters();
    expect(foundersManager.passesFilter(foundersManager.founders.items[0])).toBe(true);
    expect(foundersManager.passesFilter(foundersManager.founders.items[1])).toBe(true);
    expect(foundersManager.passesFilter(foundersManager.founders.items[2])).toBe(true);
  });

  it('should manage sorting', function () {
    var founders = createFounders();
    var foundersManager = new FoundersManager(founders);

    //initial - undefined
    expect(foundersManager.getSort(foundersManager.founders.header[0])).not.toBeDefined();
    expect(foundersManager.getSort(foundersManager.founders.header[1])).not.toBeDefined();
    expect(foundersManager.getSort(foundersManager.founders.header[2])).not.toBeDefined();

    expect(foundersManager.getSortConfig()).toEqual({
      predicate: undefined,
      reverse: false
    });

    //asc
    foundersManager.applySort(foundersManager.founders.header[0], SortStates.ASC);
    expect(foundersManager.getSort(foundersManager.founders.header[0])).toBe(SortStates.ASC);
    expect(foundersManager.getSort(foundersManager.founders.header[1])).not.toBeDefined();
    expect(foundersManager.getSort(foundersManager.founders.header[2])).not.toBeDefined();

    expect(foundersManager.getSortConfig()).toEqual({
      predicate: '0',
      reverse: false
    });

    //desc another
    foundersManager.applySort(foundersManager.founders.header[1], SortStates.DESC);
    expect(foundersManager.getSort(foundersManager.founders.header[0])).not.toBeDefined();
    expect(foundersManager.getSort(foundersManager.founders.header[1])).toBe(SortStates.DESC);
    expect(foundersManager.getSort(foundersManager.founders.header[2])).not.toBeDefined();

    expect(foundersManager.getSortConfig()).toEqual({
      predicate: '1',
      reverse: true
    });

    //reset same
    foundersManager.applySort(foundersManager.founders.header[1], SortStates.NONE);
    expect(foundersManager.getSort(foundersManager.founders.header[0])).not.toBeDefined();
    expect(foundersManager.getSort(foundersManager.founders.header[1])).toBe(SortStates.NONE);
    expect(foundersManager.getSort(foundersManager.founders.header[2])).not.toBeDefined();

    expect(foundersManager.getSortConfig()).toEqual({
      predicate: undefined,
      reverse: false
    });

    //asc same
    foundersManager.applySort(foundersManager.founders.header[1], SortStates.ASC);
    expect(foundersManager.getSort(foundersManager.founders.header[0])).not.toBeDefined();
    expect(foundersManager.getSort(foundersManager.founders.header[1])).toBe(SortStates.ASC);
    expect(foundersManager.getSort(foundersManager.founders.header[2])).not.toBeDefined();

    expect(foundersManager.getSortConfig()).toEqual({
      predicate: '1',
      reverse: false
    });

    //reset
    foundersManager.resetSorts();
    expect(foundersManager.getSort(foundersManager.founders.header[0])).not.toBeDefined();
    expect(foundersManager.getSort(foundersManager.founders.header[1])).not.toBeDefined();
    expect(foundersManager.getSort(foundersManager.founders.header[2])).not.toBeDefined();

    expect(foundersManager.getSortConfig()).toEqual({
      predicate: undefined,
      reverse: false
    });
  });

});
