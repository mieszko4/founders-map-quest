'use strict';

describe('Filter: decimal2dms', function () {

  // load the filter's module
  beforeEach(module('foundersMapQuestApp.visualize'));

  // initialize a new instance of the filter before each test
  var decimal2dms;
  beforeEach(inject(function ($filter) {
    decimal2dms = $filter('decimal2dms');
  }));

  it('should transform for positive latitude', function () {
    expect(decimal2dms(55.751667, true)).toBe('55° 45′ 06″ N');
  });

  it('should transform for positive longitude', function () {
    expect(decimal2dms(55.751667, false)).toBe('55° 45′ 06″ E');
  });

  it('should transform for negative latitude', function () {
    expect(decimal2dms(-55.751667, true)).toBe('55° 45′ 06″ S');
  });

  it('should transform for negative longitude', function () {
    expect(decimal2dms(-55.751667, false)).toBe('55° 45′ 06″ W');
  });

  it('should transform without padding', function () {
    expect(decimal2dms(10.99, false)).toBe('10° 59′ 24″ E');
  });

  it('should transform with padding', function () {
    expect(decimal2dms(10.084, false)).toBe('10° 05′ 02″ E');
  });

  //edge cases
  it('should transform for 0 latitude', function () {
    expect(decimal2dms(0, true)).toBe('0° 00′ 00″ N');
  });

  it('should transform for 0 longitude', function () {
    expect(decimal2dms(0, false)).toBe('0° 00′ 00″ E');
  });

  it('should transform for 180 latitude', function () {
    expect(decimal2dms(180, true)).toBe('180° 00′ 00″ N');
  });

  it('should transform for 180 longitude', function () {
    expect(decimal2dms(180, false)).toBe('180° 00′ 00″ E');
  });

  it('should transform for -180 latitude', function () {
    expect(decimal2dms(-180, true)).toBe('180° 00′ 00″ S');
  });

  it('should transform for -180 longitude', function () {
    expect(decimal2dms(-180, false)).toBe('180° 00′ 00″ W');
  });

  it('should return empty for exceeding or not number', function () {
    expect(decimal2dms(200, false)).toBe('');
    expect(decimal2dms('string', false)).toBe('');
  });

});
