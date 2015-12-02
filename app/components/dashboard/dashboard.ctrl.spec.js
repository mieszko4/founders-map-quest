'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  //beforeEach(module('templates'));
  beforeEach(module('foundersMapQuestApp.dashboard', function ($stateProvider) {
    $stateProvider
      .state('root', {
        url: ''
      });
  }));

  var vm,
    $scope,
    $state,
    SortStates,
    FMQ_MODULE_SETTINGS,
    foundersManagerState,
    emptyFoundersManager,
    tableHelpInfoState;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, StateFactory, FoundersFactory, FoundersManagerFactory, _SortStates_, _$state_, _FMQ_MODULE_SETTINGS_) {
    $scope = $rootScope.$new();

    foundersManagerState = StateFactory.create('foundersManager');
    var founders = FoundersFactory.createFromJson({
      header: [{name: 'Id'}, {name: 'Latitude'}, {name: 'Longitude'}, {name: 'Other'}],
      items: [
        [0, 12.2, 14.3, 'http://milosz.ch/'],
        [1, 32.2, 54.3, 'http://milosz.ch/avatar.jpeg'],
        [0, 9.2, 12.3, 'Hello!']
      ]
    });
    var foundersManager = FoundersManagerFactory.create(founders);

    emptyFoundersManager = FoundersManagerFactory.create(FoundersFactory.create());

    foundersManagerState.set(foundersManager.toJson());
    tableHelpInfoState = StateFactory.create('tableHelpInfo').set(true);

    spyOn(_$state_, 'go');

    vm = $controller('DashboardCtrl', {
      $scope: $scope,
      $state: _$state_,
      foundersManagerState: foundersManagerState,
      tableHelpInfoState: tableHelpInfoState
    });

    SortStates = _SortStates_;

    $state = _$state_;

    FMQ_MODULE_SETTINGS = _FMQ_MODULE_SETTINGS_;
  }));

  it('should exist', function () {
    expect(!!vm).toBe(true);
  });

  it('should set foundersManager, founders, tableHelpInfo in scope', function () {
    expect(!!vm.foundersManager).toBe(true);

    expect(!!vm.founders).toBe(true);
    expect(vm.founders.header.length).toBe(4);
    expect(vm.founders.items.length).toBe(3);
    expect(vm.founders.items[2][3]).toBe('Hello!');

    expect(vm.founders).toBe(vm.foundersManager.founders);

    expect(!!vm.tableHelpInfo).toBe(true);
    expect(vm.tableHelpInfo).toBe(true);
  });

  it('should apply state when markerColumn is modified', function () {
    var value = JSON.stringify(foundersManagerState.get().founders.markerColumn);
    $scope.$digest(); //first time is ignored

    expect(value).toBe(JSON.stringify(foundersManagerState.get().founders.markerColumn));

    value = JSON.stringify(foundersManagerState.get().founders.markerColumn);
    vm.founders.chooseAsMarker(vm.founders.header[1]);
    $scope.$digest();
    expect(value).not.toBe(JSON.stringify(foundersManagerState.get().founders.markerColumn));
  });

  it('should apply state when selectedItems is modified', function () {
    var value = JSON.stringify(foundersManagerState.get().selectedItems);
    $scope.$digest(); //first time is ignored

    expect(value).toBe(JSON.stringify(foundersManagerState.get().selectedItems));

    value = JSON.stringify(foundersManagerState.get().selectedItems);
    vm.foundersManager.toggleAllSelection();
    $scope.$digest();
    expect(value).not.toBe(JSON.stringify(foundersManagerState.get().selectedItems));
  });

  it('should apply state when filterStates is modified', function () {
    var value = JSON.stringify(foundersManagerState.get().filterStates);
    $scope.$digest(); //first time is ignored

    expect(value).toBe(JSON.stringify(foundersManagerState.get().filterStates));

    value = JSON.stringify(foundersManagerState.get().filterStates);
    vm.foundersManager.setFilter(vm.founders.header[0], 'test');
    $scope.$digest();
    expect(value).not.toBe(JSON.stringify(foundersManagerState.get().filterStates));
  });

  it('should apply state when sortStates is modified', function () {
    var value = JSON.stringify(foundersManagerState.get().sortStates);
    $scope.$digest(); //first time is ignored

    expect(value).toBe(JSON.stringify(foundersManagerState.get().sortStates));

    value = JSON.stringify(foundersManagerState.get().sortStates);
    vm.foundersManager.applySort(vm.founders.header[0], SortStates.DESC);
    $scope.$digest();
    expect(value).not.toBe(JSON.stringify(foundersManagerState.get().sortStates));
  });

  it('should apply state when tableHelpInfo is modified', function () {
    var value = JSON.stringify(tableHelpInfoState.get());
    vm.tableHelpInfo = false;
    $scope.$digest(); //first time is not ignored
    expect(value).not.toBe(JSON.stringify(tableHelpInfoState.get()));
  });

  it('should invoke $state.go when loadData is clicked', function () {
    vm.loadData();
    expect($state.go).toHaveBeenCalledWith(FMQ_MODULE_SETTINGS['foundersMapQuestApp.loadData'].routes['load-data'], {founders: vm.founders});
  });

  it('should invoke open marker', function () {
    var item = vm.founders.items[0];

    vm.viewOnMap(item);
    expect($state.go).toHaveBeenCalledWith(FMQ_MODULE_SETTINGS['foundersMapQuestApp.map'].routes.map, {item: item});
  });
});
