'use strict';

describe('Service: FilterHandler', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp'));

  // instantiate service
  var FilterHandler;
  beforeEach(inject(function (_FilterHandler_) {
    FilterHandler = _FilterHandler_;
  }));

  it('should do something', function () {
    expect(!!FilterHandler).toBe(true);
  });

});
