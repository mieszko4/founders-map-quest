'use strict';

describe('Controller: LoadDataCtrl', function () {

  // load the controller's module
  beforeEach(module('foundersMapQuestApp'));

  var LoadDataCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoadDataCtrl = $controller('LoadDataCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should have empty scope', function () {
    expect(Object.keys(LoadDataCtrl).length).toBe(0);
  });
});
