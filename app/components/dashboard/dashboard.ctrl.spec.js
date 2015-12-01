'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  //beforeEach(module('templates'));
  beforeEach(module('foundersMapQuestApp.dashboard'));

  var vm,
    $scope,
    foundersManagerState,
    tableHelpInfoState;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, StateFactory, FoundersFactory, FoundersManagerFactory) {
    $scope = $rootScope.$new();

    foundersManagerState = StateFactory.create('foundersManager');
    var founders = FoundersFactory.createFromJson({
      header: ['Id', 'Latitude', 'Longitude', 'Other'],
      items: [
        [0, 12.2, 14.3, 'http://milosz.ch/'],
        [1, 32.2, 54.3, 'http://milosz.ch/avatar.jpeg'],
        [0, 9.2, 12.3, 'Hello!']
      ]
    });
    var foundersManager = FoundersManagerFactory.create(founders);

    foundersManagerState.set(foundersManager.toJson());
    tableHelpInfoState = StateFactory.create('tableHelpInfo').set(true);

    vm = $controller('DashboardCtrl', {
      $scope: $scope,
      foundersManagerState: foundersManagerState,
      tableHelpInfoState: tableHelpInfoState
    });
  }));

  it('should exist', function () {
    expect(!!vm).toBe(true);
  });

  it('should set foundersManager, founders, tableHelpInfo, in scope', function () {
    expect(!!vm.foundersManager).toBe(true);

    expect(!!vm.founders).toBe(true);
    expect(vm.founders.header.length).toBe(4);
    expect(vm.founders.items.length).toBe(3);
    expect(vm.founders.items[2][3]).toBe('Hello!');

    expect(vm.founders).toBe(vm.foundersManager.founders);

    expect(!!vm.tableHelpInfo).toBe(true);
    expect(vm.tableHelpInfo).toBe(true);
  });

});
