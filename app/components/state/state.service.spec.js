'use strict';

describe('Service: StateFactory', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.state'));

  // instantiate service
  var StateFactory;
  beforeEach(inject(function (_StateFactory_) {
    StateFactory = _StateFactory_;
  }));

  it('should exist', function () {
    expect(!!StateFactory).toBe(true);
  });

});

describe('Service: State', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.state'));

  // instantiate service
  var State;
  beforeEach(inject(function (_State_) {
    State = _State_;
  }));

  it('should do something', function () {
    expect(!!State).toBe(true);
  });

});
