'use strict';

describe('Service: ColumnFactory', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.foundersManager'));

  // instantiate service
  var ColumnFactory,
    Column;
  beforeEach(inject(function (_ColumnFactory_, _Column_) {
    ColumnFactory = _ColumnFactory_;
    Column = _Column_;
  }));

  it('should exist', function () {
    expect(!!ColumnFactory).toBe(true);
  });

  it('should create a Column from name', function () {
    var column = ColumnFactory.create('id');

    expect(column.name).toBe('id');
    expect(column instanceof Column);
  });

  it('should create a Column from json', function () {
    var column = ColumnFactory.createFromJson({name: 'id'});

    expect(column.name).toBe('id');
    expect(column instanceof Column);
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

  it('should set a value', function () {
    var column = new Column('id');

    expect(column.name).toBe('id');
  });

  it('should return json', function () {
    var column = new Column('id');

    expect(column.toJson()).toEqual({name: 'id'});
  });

});
