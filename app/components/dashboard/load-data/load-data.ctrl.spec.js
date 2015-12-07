'use strict';

describe('Controller: vm', function () {

  // load the controller's module
  beforeEach(module('foundersMapQuestApp.loadData'));

  var vm,
    $scope,
    Csv,
    founders,
    $controller,
    modalInstance;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _Csv_, FoundersFactory) {
    $scope = $rootScope.$new();
    modalInstance = {                    // Create a mock object using spies
      close: jasmine.createSpy('modalInstance.close'),
      dismiss: jasmine.createSpy('modalInstance.dismiss'),
      result: {
        then: jasmine.createSpy('modalInstance.result.then')
      }
    };

    founders = FoundersFactory.createFromJson({
      header: [{name: 'Id'}, {name: 'Latitude'}, {name: 'Longitude'}, {name: 'Other'}],
      items: [
        [0, 12.2, 14.3, 'http://milosz.ch/'],
        [1, 32.2, 54.3, 'http://milosz.ch/avatar.jpeg'],
        [0, 9.2, 12.3, 'Hello!']
      ]
    });

    $controller = _$controller_;
    Csv = _Csv_;
  }));

  it('should exist', function () {
    vm = $controller('LoadDataCtrl', {
      $scope: $scope,
      $uibModalInstance: modalInstance,
      founders: founders,
      supportsFileReader: true,
      Csv: Csv
    });

    expect(!!vm).toBe(true);
  });

  it('should set founders, supportsFileReader, delimiters, form, formValid in scope', function () {
    vm = $controller('LoadDataCtrl', {
      $scope: $scope,
      $uibModalInstance: modalInstance,
      founders: founders,
      supportsFileReader: true,
      Csv: Csv
    });

    $scope.$digest();

    expect(!!vm.founders).toBe(true);
    expect(vm.founders.header.length).toBe(4);
    expect(vm.founders.items.length).toBe(3);

    expect(vm.supportsFileReader).toBe(true);
    expect(vm.delimiters).toBeDefined();
    expect(vm.delimiters).toEqual(Csv.delimiters);

    expect(!!vm.form).toBe(true);
    expect(!!vm.form.raw).toBe(true);
    expect(!!vm.form.latitudeColumn).toBe(true);
    expect(!!vm.form.longitudeColumn).toBe(true);

    expect(vm.formValid).toBe(true);
  });

  it('should apply coordinates automatically', function () {
    vm = $controller('LoadDataCtrl', {
      $scope: $scope,
      $uibModalInstance: modalInstance,
      founders: founders,
      supportsFileReader: true,
      Csv: Csv
    });

    vm.form.latitudeColumn = null;
    vm.form.longitudeColumn = null;
    $scope.$digest();
    expect(vm.formValid).toBe(false);

    vm.form.raw = 'Id;Latitude;Longitude\n0;1;2';

    vm.applyRawData();
    $scope.$digest();

    expect(vm.founders.latitudeColumn).toBe(1);
    expect(vm.founders.longitudeColumn).toBe(2);
    expect(vm.formValid).toBe(true);
  });

  it('should not apply coordinates automatically when header is equal', function () {
    vm = $controller('LoadDataCtrl', {
      $scope: $scope,
      $uibModalInstance: modalInstance,
      founders: founders,
      supportsFileReader: true,
      Csv: Csv
    });

    vm.form.raw = 'Id;Latitude;Longitude\n0;1;2';

    //manually choose and apply for different header
    vm.form.latitudeColumn = 3;
    vm.form.longitudeColumn = 4;

    vm.applyRawData();

    expect(vm.founders.latitudeColumn).toBe(vm.form.latitudeColumn);
    expect(vm.founders.longitudeColumn).toBe(vm.form.longitudeColumn);
    expect(vm.form.latitudeColumn).not.toBe(3);
    expect(vm.form.longitudeColumn).not.toBe(4);

    //manually choose and reapply for the same heaader
    vm.form.latitudeColumn = 3;
    vm.form.longitudeColumn = 4;

    vm.applyRawData();

    expect(vm.founders.latitudeColumn).not.toBe(vm.form.latitudeColumn);
    expect(vm.founders.longitudeColumn).not.toBe(vm.form.longitudeColumn);
    expect(vm.form.latitudeColumn).toBe(3);
    expect(vm.form.longitudeColumn).toBe(4);
  });

  it('should update coordinates in founders', function () {
    vm = $controller('LoadDataCtrl', {
      $scope: $scope,
      $uibModalInstance: modalInstance,
      founders: founders,
      supportsFileReader: true,
      Csv: Csv
    });

    $scope.$apply();

    vm.founders.latitudeColumn = 3;
    vm.founders.latitudeColumn = 4;
    expect(vm.form.latitudeColumn).not.toBe(3);
    expect(vm.form.longitudeColumn).not.toBe(4);

    vm.coordinateSelected();

    expect(vm.founders.latitudeColumn).toBe(vm.form.latitudeColumn);
    expect(vm.founders.longitudeColumn).toBe(vm.form.longitudeColumn);
  });

  it('should change validity based on items, latitude, longitude', function () {
    vm = $controller('LoadDataCtrl', {
      $scope: $scope,
      $uibModalInstance: modalInstance,
      founders: founders,
      supportsFileReader: true,
      Csv: Csv
    });

    $scope.$apply();
    expect(vm.formValid).toBe(true);

    //invalid latitude
    vm.form.latitudeColumn = null;
    $scope.$apply();
    expect(vm.formValid).toBe(false);

    vm.form.latitudeColumn = 1;
    $scope.$apply();
    expect(vm.formValid).toBe(true);

    //invalid longitude
    vm.form.longitudeColumn = null;
    $scope.$apply();
    expect(vm.formValid).toBe(false);

    vm.form.longitudeColumn = 2;
    $scope.$apply();
    expect(vm.formValid).toBe(true);

    //latitude cannot be equal longitude
    vm.form.longitudeColumn = vm.form.latitudeColumn;
    $scope.$apply();
    expect(vm.formValid).toBe(false);

    vm.form.longitudeColumn = 2;
    $scope.$apply();
    expect(vm.formValid).toBe(true);

    //invalid input
    vm.form.raw = 'a;b;c\n1;2';
    vm.applyRawData();
    $scope.$apply();
    expect(vm.founders.items).toBe(null);
    expect(vm.formValid).toBe(false);
  });

  it('should have exit methods from dialog', function () {
    vm = $controller('LoadDataCtrl', {
      $scope: $scope,
      $uibModalInstance: modalInstance,
      founders: founders,
      supportsFileReader: true,
      Csv: Csv
    });

    vm.ok();
    expect(modalInstance.close).toHaveBeenCalledWith(vm.founders);

    vm.cancel();
    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
  });

  it('should parse text from file', function () {
    vm = $controller('LoadDataCtrl', {
      $scope: $scope,
      $uibModalInstance: modalInstance,
      founders: founders,
      supportsFileReader: true,
      Csv: Csv
    });

    vm.fileText = 'Id;Latitude;Longitude\n0;1;2';
    $scope.$apply();

    expect(vm.fileText).toBe('');
    expect(vm.founders.header.length).toBe(3);
    expect(vm.founders.items.length).toBe(1);

    $scope.$apply(); //with empty fileText - ignores
  });

  it('should work with no FileReader', function () {
    vm = $controller('LoadDataCtrl', {
      $scope: $scope,
      $uibModalInstance: modalInstance,
      founders: founders,
      supportsFileReader: false,
      Csv: Csv
    });

    expect(vm.supportsFileReader).toBe(false);
  });
});
