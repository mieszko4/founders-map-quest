'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  console.log('LOADING MODULE,da');
  beforeEach(module('foundersMapQuestApp.dashboard'));

  var DashboardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope,
      foundersData: {}
      // place here mocked dependencies
    });
  }));

  it('should exist', function () {
    expect(!!DashboardCtrl).toBe(true);
  });
});
