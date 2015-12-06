'use strict';

describe('Service: CsvFactory', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.foundersManager'));

  // instantiate service
  var CsvFactory,
    Column,
    Csv;
  beforeEach(inject(function (_CsvFactory_, _Csv_, _Column_) {
    CsvFactory = _CsvFactory_;
    Column = _Column_;
    Csv = _Csv_;
  }));

  it('should exist', function () {
    expect(!!CsvFactory).toBe(true);
  });

  it('should create a Csv from parameters', function () {
    var header = [
      new Column('a'),
      new Column('b'),
      new Column('c')
    ];
    var items = [
      [1, 2, 3],
      [4, 5, 6]
    ];
    var delimiter = ';';

    var csv = CsvFactory.create(header, items, delimiter);

    expect(csv.header).toBe(header);
    expect(csv.items).toBe(items);
    expect(csv.delimiter).toBe(delimiter);
    expect(csv instanceof Csv);
  });

  it('should create a Csv from json', function () {
    var header = [
      'a',
      'b',
      'c'
    ];
    var items = [
      [1, 2, 3],
      [4, 5, 6]
    ];
    var delimiter = ';';

    var csv = CsvFactory.createFromJson({
      header: header,
      items: items,
      delimiter: delimiter
    });

    expect(csv.header.length).toBe(3);
    expect(csv.items).toBe(items);
    expect(csv.delimiter).toBe(delimiter);
    expect(csv instanceof Csv);
  });

  it('should create a Csv from json without header', function () {
    var items = [
      [1, 2, 3],
      [4, 5, 6]
    ];
    var delimiter = ';';

    var csv = CsvFactory.createFromJson({
      items: items,
      delimiter: delimiter
    });

    expect(csv.header.length).toBe(0);
    expect(csv.items).toBe(items);
    expect(csv.delimiter).toBe(delimiter);
    expect(csv instanceof Csv);
  });

  it('should create a Csv from raw csv', function () {
    var csv = CsvFactory.createFromRaw('a;b;c\n1;2;3\n4;5;6');

    expect(csv.header.length).toBe(3);
    expect(csv.items).toEqual([['1', '2', '3'], ['4', '5', '6']]);
    expect(csv.delimiter).toEqual(';');
    expect(csv instanceof Csv);
  });

  it('should clone a Csv', function () {
    var csv = CsvFactory.createFromRaw('a;b;c\n1;2;3\n4;5;6');
    var clone = CsvFactory.clone(csv);

    expect(csv instanceof Csv);
    expect(clone instanceof Csv);

    expect(csv).not.toBe(clone);
    expect(csv.toJson()).toEqual(clone.toJson());
  });

});

describe('Service: Csv', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.foundersManager'));

  // instantiate service
  var Csv,
    Column;
  beforeEach(inject(function (_Csv_, _Column_) {
    Csv = _Csv_;
    Column = _Column_;
  }));

  it('should exist', function () {
    expect(!!Csv).toBe(true);
  });

  it('should create empty/default Csv', function () {
    var csv = new Csv();

    expect(csv.header).toEqual([]);
    expect(csv.items).toEqual(null);
    expect(csv.delimiter).toEqual(',');

    expect(csv.toJson()).toEqual({
      header: [],
      items: null,
      delimiter: ','
    });

    expect(csv.encodeToRaw()).toEqual('');
  });

  it('should create a Csv', function () {
    var header = [
      new Column('a'),
      new Column('b'),
      new Column('c')
    ];
    var items = [
      [1, 2, 3],
      [4, 5, 6]
    ];
    var delimiter = ';';

    var csv = new Csv(header, items, delimiter);

    expect(csv.header).toEqual(header);
    expect(csv.items).toEqual(items);
    expect(csv.delimiter).toEqual(delimiter);

    expect(csv.toJson()).toEqual({
      header: [{name: 'a'}, {name: 'b'}, {name: 'c'}],
      items: items,
      delimiter: delimiter
    });

    expect(csv.encodeToRaw()).toEqual('a;b;c\n1;2;3\n4;5;6');
  });

  it('should parse raw csv', function () {
    var parseData;

    //without delimiter given
    parseData = Csv.parse('a;b;c\n1;2;3\n4;5;6');
    expect(parseData.header.length).toBe(3);
    expect(parseData.items).toEqual([['1', '2', '3'], ['4', '5', '6']]);
    expect(parseData.delimiter).toEqual(';');

    //with delimiter fiven
    parseData = Csv.parse('a;b;c\n1;2;3\n4;5;6', '\t');
    expect(parseData.header.length).toBe(1);
    expect(parseData.items).toEqual([['1;2;3'], ['4;5;6']]);
    expect(parseData.delimiter).toEqual('\t');

    //with invalid
    parseData = Csv.parse('a;b;c\n1;2;3\n4;5;6;7;8');
    expect(parseData.header.length).toBe(3);
    expect(parseData.items).toEqual(null);
    expect(parseData.delimiter).toEqual(';');
  });

});
