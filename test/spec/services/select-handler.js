'use strict';

describe('Service: SelectHandler', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp'));

  // instantiate service
  var SelectHandler;
  beforeEach(inject(function (_SelectHandler_) {
    SelectHandler = _SelectHandler_;
  }));

  it('should do something', function () {
    expect(!!SelectHandler).toBe(true);
  });

});
