'use strict';

describe('Service: CsvFactory', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.foundersManager'));

  // instantiate service
  var CsvFactory;
  beforeEach(inject(function (_CsvFactory_) {
    CsvFactory = _CsvFactory_;
  }));

  it('should exist', function () {
    expect(!!CsvFactory).toBe(true);
  });

});

describe('Service: Csv', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.foundersManager'));

  // instantiate service
  var Csv;
  beforeEach(inject(function (_Csv_) {
    Csv = _Csv_;
  }));

  it('should exist', function () {
    expect(!!Csv).toBe(true);
  });

});
