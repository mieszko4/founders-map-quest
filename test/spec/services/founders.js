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

  it('should decode just header', function () {
    var result = Founders.decode('a,b,c', ',');

    expect(result.header).toEqual(['a', 'b', 'c']);
    expect(result.items).toEqual([]);
  })

  it('should decode header and one row', function () {
    var result = Founders.decode('a,b,c\n1,2,3', ',');

    expect(result.header).toEqual(['a', 'b', 'c']);
    expect(result.items).toEqual([['1', '2', '3']]);
  })

  it('should decode header and one row with extra empty line', function () {
    var result = Founders.decode('a,b,c\n1,2,3\n', ',');

    expect(result.header).toEqual(['a', 'b', 'c']);
    expect(result.items).toEqual([['1', '2', '3']]);
  })

  it('should decode header and more rows', function () {
    var result = Founders.decode('a,b,c\n1,2,3\n4,5,6', ',');

    expect(result.header).toEqual(['a', 'b', 'c']);
    expect(result.items).toEqual([
      ['1', '2', '3'],
      ['4', '5', '6'],
    ]);
  })

  it('should decode header and more rows using ;', function () {
    var result = Founders.decode('a;b;c\n1;2;3\n4;5;6', ';');

    expect(result.header).toEqual(['a', 'b', 'c']);
    expect(result.items).toEqual([
      ['1', '2', '3'],
      ['4', '5', '6'],
    ]);
  })

  it('should decode header and more rows using <tab>', function () {
    var result = Founders.decode('a\tb\tc\n1\t2\t3\n4\t5\t6', '\t');

    expect(result.header).toEqual(['a', 'b', 'c']);
    expect(result.items).toEqual([
      ['1', '2', '3'],
      ['4', '5', '6'],
    ]);
  })

  it('should encode just header', function () {
    var raw = Founders.encode(['a', 'b', 'c'], [], ',');

    expect(raw).toEqual('a,b,c\n');
  })

  it('should encode header and more rows', function () {
    var raw = Founders.encode(
      ['a', 'b', 'c'],
      [
        ['1', '2', '3'],
        ['4', '5', '6'],
      ],
      ','
    );

    expect(raw).toEqual('a,b,c\n1,2,3\n4,5,6');
  })

});
