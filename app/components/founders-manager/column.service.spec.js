'use strict';

describe('Service: ColumnFactory', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.foundersManager'));

  // instantiate service
  var ColumnFactory;
  beforeEach(inject(function (_ColumnFactory_) {
    ColumnFactory = _ColumnFactory_;
  }));

  it('should exist', function () {
    expect(!!ColumnFactory).toBe(true);
  });

});

describe('Service: Column', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.foundersManager'));

  // instantiate service
  var Column;
  beforeEach(inject(function (_Column_) {
    Column = _Column_;
  }));

  it('should exist', function () {
    expect(!!Column).toBe(true);
  });

});
