'use strict';

describe('Directive: fmqVisualize', function () {

  // load the directive's module
  beforeEach(module('foundersMapQuestApp.visualize'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fmq-visualize></fmq-visualize>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
