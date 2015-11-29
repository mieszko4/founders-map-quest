'use strict';

describe('Directive: fmqMap', function () {

  // load the directive's module
  beforeEach(module('foundersMapQuestApp.map'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<div fmq-navigation></div>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
