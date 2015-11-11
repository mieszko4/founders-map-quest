'use strict';

describe('Controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(module('foundersMapQuestApp'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('AboutCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should have empty scope', function () {
    expect(Object.keys(AboutCtrl).length).toBe(0);
  });
});
