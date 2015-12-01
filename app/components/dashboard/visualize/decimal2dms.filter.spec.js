'use strict';

describe('Filter: decimal2dms', function () {

  // load the filter's module
  beforeEach(module('foundersMapQuestApp.visualize'));

  // initialize a new instance of the filter before each test
  var decimal2dms;
  beforeEach(inject(function ($filter) {
    decimal2dms = $filter('decimal2dms');
  }));

  it('should return the input prefixed with "decimal2dms filter:"', function () {
    expect(decimal2dms(55.751667, true)).toBe('55° 45′ 06″ N');
  });

});
