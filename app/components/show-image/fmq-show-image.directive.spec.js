'use strict';

describe('Directive: fmqShowImage', function () {

  // load the directive's module
  beforeEach(module('foundersMapQuestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<div fmq-show-image></div>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
