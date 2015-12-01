'use strict';

describe('Directive: fmqColumnSorter', function () {

  // load the directive's module
  beforeEach(module('templates'));
  beforeEach(module('foundersMapQuestApp.columnSorter'));

  var element,
    callbacks,
    state,
    $scope;

  beforeEach(inject(function ($rootScope) {
    callbacks = {
      change: function () {}
    };

    spyOn(callbacks, 'change');
    $scope = $rootScope.$new();
    $scope.state = state;

    $scope.changeCallback = callbacks.change;
  }));

  it('should make hidden element visible', inject(function ($compile, SortStates) {
    element = angular.element('<fmq-column-sorter state="state" change="changeCallback(state)"></fmq-column-sorter>');
    element = $compile(element)($scope);
    $scope.$digest();

    expect(element.find('span').length).toBe(3);
    expect(element.isolateScope().vm.state).toBe(SortStates.NONE);
    expect(element.find('span.ng-hide').length).toBe(2); //only one visible at the time

    element.trigger('click');
    $scope.$digest();

    expect(callbacks.change).toHaveBeenCalledWith(SortStates.ASC);
    expect(element.isolateScope().vm.state).toBe(SortStates.ASC);
    expect(element.find('span.ng-hide').length).toBe(2);

    element.trigger('click');
    $scope.$digest();

    expect(callbacks.change).toHaveBeenCalledWith(SortStates.DESC);
    expect(element.isolateScope().vm.state).toBe(SortStates.DESC);
    expect(element.find('span.ng-hide').length).toBe(2);

    element.trigger('click');
    $scope.$digest();

    expect(callbacks.change).toHaveBeenCalledWith(SortStates.NONE);
    expect(element.isolateScope().vm.state).toBe(SortStates.NONE);
    expect(element.find('span.ng-hide').length).toBe(2);
  }));
});
