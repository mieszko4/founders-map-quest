'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('foundersMapQuestApp.dashboard'));

  var DashboardCtrl,
    scope,
    foundersManagerState,
    tableHelpInfoState;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, StateFactory, FoundersFactory, FoundersManagerFactory) {
    scope = $rootScope.$new();

    foundersManagerState = StateFactory.create('foundersManager');
    var founders = FoundersFactory.create();
    var foundersManager = FoundersManagerFactory.create(founders);

    foundersManagerState.set(foundersManager.toJson());
    tableHelpInfoState = StateFactory.create('tableHelpInfo').set(true);

    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope,
      foundersManagerState: foundersManagerState,
      tableHelpInfoState: tableHelpInfoState
      // place here mocked dependencies
    });
  }));

  it('should exist', function () {
    expect(!!DashboardCtrl).toBe(true);
  });
});
