'use strict';

describe('Service: FoundersManagerFactory', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.foundersManager'));

  // instantiate service
  var FoundersManagerFactory;
  beforeEach(inject(function (_FoundersManagerFactory_) {
    FoundersManagerFactory = _FoundersManagerFactory_;
  }));

  it('should exist', function () {
    expect(!!FoundersManagerFactory).toBe(true);
  });

});

describe('Service: FoundersManager', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.foundersManager'));

  // instantiate service
  var FoundersManager;
  beforeEach(inject(function (_FoundersManager_) {
    FoundersManager = _FoundersManager_;
  }));

  it('should exist', function () {
    expect(!!FoundersManager).toBe(true);
  });

});
