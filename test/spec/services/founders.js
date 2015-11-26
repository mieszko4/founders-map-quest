'use strict';

describe('Service: Founders', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp'));

  // instantiate service
  var Founders;
  beforeEach(inject(function (_Founders_) {
    Founders = _Founders_;
  }));

  it('should exist', function () {
    expect(!!Founders).toBe(true);
  });

});
