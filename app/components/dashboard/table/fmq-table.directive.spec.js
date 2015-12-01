'use strict';

describe('Directive: fmqTable', function () {

  // load the directive's module
  beforeEach(module('foundersMapQuestApp.table'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fmq-table></fmq-table>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
