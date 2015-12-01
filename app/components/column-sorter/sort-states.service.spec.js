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

});
