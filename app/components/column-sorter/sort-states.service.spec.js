'use strict';

describe('Service: SortStates', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.columnSorter'));

  // instantiate service
  var SortStates;
  beforeEach(inject(function (_SortStates_) {
    SortStates = _SortStates_;
  }));

  it('should do something', function () {
    expect(!!SortStates).toBe(true);
  });

  it('should have circular transitions', function () {
    var state = SortStates.NONE;

    state = SortStates.getNextState(state);
    expect(state).toBe(SortStates.ASC);

    state = SortStates.getNextState(state);
    expect(state).toBe(SortStates.DESC);

    state = SortStates.getNextState(state);
    expect(state).toBe(SortStates.NONE);
  });

});
