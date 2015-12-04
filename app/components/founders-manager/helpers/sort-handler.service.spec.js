'use strict';

describe('Service: SortHandler', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.foundersManager'));

  // instantiate service
  var SortHandler;
  beforeEach(inject(function (_SortHandler_) {
    SortHandler = _SortHandler_;
  }));

  it('should exist', function () {
    expect(!!SortHandler).toBe(true);
  });

  it('should return state', function () {
    var sortStates = {0: 'state1'};

    expect(SortHandler.getSortState(sortStates, 0)).toBe('state1');
    expect(SortHandler.getSortState(sortStates, 'non-existing')).not.toBeDefined();
  });

  it('should return sort keys', function () {
    var sortStates = {0: 'state1', 1: 'state2'};

    expect(SortHandler.getSortKeys(sortStates)).toEqual(['0', '1']);
  });

  it('should apply sort', function () {
    var sortStates = {0: 'state1', 1: 'state2'};

    expect(SortHandler.applySort(sortStates, 1, 'state1')).toEqual({
      0: 'state1',
      1: 'state1'
    });

    expect(SortHandler.applySort(sortStates, 'non-existing', 'state3')).toEqual({
      0: 'state1',
      1: 'state1',
      'non-existing': 'state3'
    });
  });

  it('should reset sort', function () {
    expect(SortHandler.resetSorts()).toEqual({});
  });
});
