'use strict';

describe('Service: FilterHandler', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.foundersManager'));

  // instantiate service
  var FilterHandler;
  beforeEach(inject(function (_FilterHandler_) {
    FilterHandler = _FilterHandler_;
  }));

  it('should exist', function () {
    expect(!!FilterHandler).toBe(true);
  });

  it('should return filter', function () {
    var filterStates = {0: 'value1'};

    expect(FilterHandler.getFilter(filterStates, 0)).toBe('value1');
    expect(FilterHandler.getFilter(filterStates, 'non-existing')).not.toBeDefined();
  });

  it('should set filter', function () {
    var filterStates = {0: 'value1', 1: 'value2'};

    expect(FilterHandler.setFilter(filterStates, 0, 'newValue1')).toEqual({
      0: 'newValue1',
      1: 'value2'
    });

    expect(FilterHandler.setFilter(filterStates, 'non-existing', 'newValue3')).toEqual({
      0: 'newValue1',
      1: 'value2',
      'non-existing': 'newValue3'
    });
  });

  it('should pass filter', function () {
    var item = ['value1', 'valUE2', undefined, ''];

    expect(FilterHandler.passesFilter({0: 'valu', 1: 'val'}, item)).toBe(true);
    expect(FilterHandler.passesFilter({0: 'vaLU', 1: 'vaLUe'}, item)).toBe(true);
    expect(FilterHandler.passesFilter({0: 'VALU', 1: 'ALUE'}, item)).toBe(true);
    expect(FilterHandler.passesFilter({0: 'val', 1: 'ue'}, item)).toBe(true);
    expect(FilterHandler.passesFilter({0: '', 1: ''}, item)).toBe(true);
  });

  it('should not pass filter', function () {
    var item = ['value1', 'valUE2', undefined, ''];

    expect(FilterHandler.passesFilter({0: 'xyz'}, item)).toBe(false);
    expect(FilterHandler.passesFilter({0: 'value1', 1: 'value22'}, item)).toBe(false);
  });

  it('should reset filters', function () {
    expect(FilterHandler.resetFilters()).toEqual({});
  });

});
