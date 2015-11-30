'use strict';

describe('Service: SortHandler', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.foundersManager'));

  // instantiate service
  var SortHandler;
  beforeEach(inject(function (_SortHandler_) {
    SortHandler = _SortHandler_;
  }));

  it('should do something', function () {
    expect(!!SortHandler).toBe(true);
  });

});
