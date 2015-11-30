'use strict';

describe('Directive: fmqShowImage', function () {

  // load the directive's module
  beforeEach(module('foundersMapQuestApp.showImage'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fmq-show-image></fmq-show-image>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
