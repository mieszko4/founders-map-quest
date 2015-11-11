'use strict';

describe('Directive: fmqNavigation', function () {

  // load the directive's module
  beforeEach(module('foundersMapQuestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ul fmq-navigation></ul>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
