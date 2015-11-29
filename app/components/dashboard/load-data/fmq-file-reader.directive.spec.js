'use strict';

describe('Directive: fmqFileReader', function () {

  // load the directive's module
  beforeEach(module('foundersMapQuestApp.loadData'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<span fmq-file-reader></span>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
