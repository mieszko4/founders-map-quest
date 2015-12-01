'use strict';

describe('Directive: fmqColumnSorter', function () {

  // load the directive's module
  beforeEach(module('foundersMapQuestApp.columnSorter'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fmq-column-sorter></fmq-column-sorter>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
