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
    var SortStates = {0: 'state1'};

    expect(SortHandler.getSortState(SortStates, 0)).toBe('state1');
    expect(SortHandler.getSortState(SortStates, 'non-existing')).not.toBeDefined();
  });

  it('should return sort keys', function () {
    var SortStates = {0: 'state1', 1: 'state2'};

    expect(SortHandler.getSortKeys(SortStates)).toEqual(['0', '1']);
  });

  it('should return apply sort', function () {
    var SortStates = {0: 'state1', 1: 'state2'};

    expect(SortHandler.applySort(SortStates, 'state1', 1)).toEqual({
      0: 'state1',
      1: 'state1'
    });

    expect(SortHandler.applySort(SortStates, 'state3', 'non-existing')).toEqual({
      0: 'state1',
      1: 'state1',
      'non-existing': 'state3'
    });
  });

  it('should reset sort', function () {
    expect(SortHandler.resetSorts()).toEqual({});
  });
});
