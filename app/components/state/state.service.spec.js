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

  it('should set and get a number', function () {
    expect(!!State).toBe(true);

    var state1 = new State('state1');
    var number = 7;

    expect(state1.get()).toBe(null);

    state1.set(number);
    expect(state1.get()).toBe(number);
  });

  it('should save and retrieve a number using storage', function () {
    var state1 = new State('state');
    var number = 7;

    expect(state1.get()).toBe(null);
    state1.set(number).save();

    var state2 = new State('state');
    expect(state1.get()).toBe(number);
    expect(state2.get()).toBe(number);
  });

  it('should save and retrieve a json using storage', function () {
    var state1 = new State('state');
    var obj = {
      a: 1
    };

    state1.set(obj).save();

    var state2 = new State('state');
    expect(state1.get()).toEqual(obj);
    expect(state2.get()).toEqual(obj);
  });

});
