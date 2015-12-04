'use strict';

describe('Service: FoundersFactory', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.foundersManager'));

  // instantiate service
  var FoundersFactory,
    Column,
    Founders;
  beforeEach(inject(function (_FoundersFactory_, _Column_, _Founders_) {
    FoundersFactory = _FoundersFactory_;
    Column = _Column_;
    Founders = _Founders_;
  }));

  it('should exist', function () {
    expect(!!FoundersFactory).toBe(true);
  });

  it('should create a Founders from parameters', function () {
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

    var latitudeColumn = 1;
    var longitudeColumn = 2;
    var markerColumn = 1;

    var founders = FoundersFactory.create(header, items, delimiter, latitudeColumn, longitudeColumn, markerColumn);

    expect(founders.header).toBe(header);
    expect(founders.items).toBe(items);
    expect(founders.delimiter).toBe(delimiter);

    expect(founders.latitudeColumn).toBe(latitudeColumn);
    expect(founders.longitudeColumn).toBe(longitudeColumn);
    expect(founders.markerColumn).toBe(markerColumn);
    expect(founders instanceof Founders);
  });


  it('should create a Founders from json', function () {
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

    var latitudeColumn = 1;
    var longitudeColumn = 2;
    var markerColumn = 1;

    var founders = FoundersFactory.createFromJson({
      header: header,
      items: items,
      delimiter: delimiter,
      latitudeColumn: latitudeColumn,
      longitudeColumn: longitudeColumn,
      markerColumn: markerColumn
    });

    expect(founders.header.length).toBe(3);
    expect(founders.items).toBe(items);
    expect(founders.delimiter).toBe(delimiter);

    expect(founders.latitudeColumn).toBe(latitudeColumn);
    expect(founders.longitudeColumn).toBe(longitudeColumn);
    expect(founders.markerColumn).toBe(markerColumn);
    expect(founders instanceof Founders);
  });

  it('should create a Founders from json without header', function () {
    var items = [
      [1, 2, 3],
      [4, 5, 6]
    ];
    var delimiter = ';';

    var latitudeColumn = 1;
    var longitudeColumn = 2;
    var markerColumn = 1;

    var founders = FoundersFactory.createFromJson({
      items: items,
      delimiter: delimiter,
      latitudeColumn: latitudeColumn,
      longitudeColumn: longitudeColumn,
      markerColumn: markerColumn
    });

    expect(founders.header.length).toBe(0);
    expect(founders.items).toBe(items);
    expect(founders.delimiter).toBe(delimiter);

    expect(founders.latitudeColumn).toBe(latitudeColumn);
    expect(founders.longitudeColumn).toBe(longitudeColumn);
    expect(founders.markerColumn).toBe(markerColumn);
    expect(founders instanceof Founders);
  });

  it('should create a Founders from raw csv', function () {
    var delimiter = ';';

    var latitudeColumn = 1;
    var longitudeColumn = 2;
    var markerColumn = 1;
    var founders = FoundersFactory.createFromRaw('a;b;c\n1;2;3\n4;5;6', delimiter, latitudeColumn, longitudeColumn, markerColumn);

    expect(founders.header.length).toBe(3);
    expect(founders.items).toEqual([['1', '2', '3'], ['4', '5', '6']]);
    expect(founders.delimiter).toEqual(';');

    expect(founders.latitudeColumn).toBe(latitudeColumn);
    expect(founders.longitudeColumn).toBe(longitudeColumn);
    expect(founders.markerColumn).toBe(markerColumn);
    expect(founders instanceof Founders);
  });

  it('should clone a Founders', function () {
    var founders = FoundersFactory.createFromRaw('a;b;c\n1;2;3\n4;5;6');
    var clone = FoundersFactory.clone(founders);

    expect(founders instanceof Founders);
    expect(clone instanceof Founders);

    expect(founders).not.toBe(clone);
    expect(founders.toJson()).toEqual(clone.toJson());
  });

});

describe('Service: Founders', function () {

  // load the service's module
  beforeEach(module('foundersMapQuestApp.foundersManager'));

  // instantiate service
  var Founders,
    Column,
    Csv;
  beforeEach(inject(function (_Founders_, _Csv_, _Column_) {
    Founders = _Founders_;
    Column = _Column_;
    Csv = _Csv_;
  }));

  it('should exist', function () {
    expect(!!Founders).toBe(true);
  });

  it('should create empty/default Founders', function () {
    var founders = new Founders();

    expect(founders.header).toEqual([]);
    expect(founders.items).toEqual(null);
    expect(founders.delimiter).toEqual(',');
    expect(founders.longitudeColumn).toEqual(null);
    expect(founders.latitudeColumn).toEqual(null);
    expect(founders.markerColumn).toEqual(0);

    expect(founders.toJson()).toEqual({
      header: [],
      items: null,
      delimiter: ',',
      longitudeColumn: null,
      latitudeColumn: null,
      markerColumn: 0
    });

    expect(founders instanceof Csv);
  });

  it('should create a Founders', function () {
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
    var latitudeColumn = 1;
    var longitudeColumn = 2;
    var markerColumn = 1;

    var founders = new Founders(header, items, delimiter, latitudeColumn, longitudeColumn, markerColumn);

    expect(founders.header).toEqual(header);
    expect(founders.items).toEqual(items);
    expect(founders.delimiter).toEqual(delimiter);
    expect(founders.latitudeColumn).toEqual(latitudeColumn);
    expect(founders.longitudeColumn).toEqual(longitudeColumn);
    expect(founders.markerColumn).toEqual(markerColumn);

    expect(founders instanceof Csv);

    var json = founders.toJson();
    expect(json.latitudeColumn).toBe(latitudeColumn);
    expect(json.longitudeColumn).toBe(longitudeColumn);
    expect(json.markerColumn).toBe(markerColumn);
  });

  it('should check/set marker', function () {
    var header = [
      new Column('a'),
      new Column('b'),
      new Column('c')
    ];

    var items = [
      [1.3, 2.4, 'http://milosz.ch/'],
      [1.5, 5.4, 'http://milosz.ch/avatar.jpeg'],
      [1.5, 5.4, 'Hello World']
    ];

    var founders = new Founders(header, items);

    //check
    expect(founders.isMarker(header[0])).toBe(true);
    expect(founders.isMarker(header[1])).toBe(false);
    expect(founders.isMarker(header[2])).toBe(false);
    expect(founders.getMarkerContentType(items[0])).toBe(null);

    //set and check
    founders.chooseAsMarker(header[2]);
    expect(founders.isMarker(header[0])).toBe(false);
    expect(founders.isMarker(header[1])).toBe(false);
    expect(founders.isMarker(header[2])).toBe(true);

    expect(founders.getMarkerContentType(items[0])).toBe('link');

    //set default and check
    founders.setDefaultMarkerColumn();
    expect(founders.isMarker(header[0])).toBe(true);
    expect(founders.getMarkerContentType(items[0])).toBe(null);
  });

  it('should auto detect some item types', function () {
    var header = [
      new Column('Latitude'),
      new Column('Longitude'),
      new Column('Other')
    ];
    var items = [
      [1.3, 2.4, 'http://milosz.ch/'],
      [1.5, 5.4, 'http://milosz.ch/avatar.jpeg'],
      [1.5, 5.4, 'Hello World']
    ];

    var founders = new Founders(header, items);

    founders.autoSetCoordinateColumns();

    expect(founders.detectType(items[0][0], header[0])).toBe('latitude');
    expect(founders.detectType(items[1][1], header[1])).toBe('longitude');
    expect(founders.detectType(items[0][2], header[2])).toBe('link');
    expect(founders.detectType(items[1][2], header[2])).toBe('image');
    expect(founders.detectType(items[2][2], header[2])).toBe(null);
  });

});
