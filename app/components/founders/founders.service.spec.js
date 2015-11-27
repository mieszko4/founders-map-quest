'use strict';

describe('Service: FoundersFactory', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.founders'));

  // instantiate service
  var FoundersFactory;
  beforeEach(inject(function (_FoundersFactory_) {
    FoundersFactory = _FoundersFactory_;
  }));

  it('should exist', function () {
    expect(!!FoundersFactory).toBe(true);
  });

});

describe('Service: Founders', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.founders'));

  // instantiate service
  var Founders;
  beforeEach(inject(function (_Founders_) {
    Founders = _Founders_;
  }));

  it('should exist', function () {
    expect(!!Founders).toBe(true);
  });

});
