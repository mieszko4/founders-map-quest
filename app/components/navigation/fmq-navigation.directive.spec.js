'use strict';

describe('Directive: fmqNavigation', function () {

  // load the directive's module
  beforeEach(module('foundersMapQuestApp.navigation'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fmq-navigation></fmq-navigation>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
