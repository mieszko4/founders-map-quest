'use strict';

describe('Controller: ShowImageCtrl', function () {

  // load the controller's module
  beforeEach(module('foundersMapQuestApp.showImage'));

  var vm,
    $scope,
    $controller,
    modalInstance;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, _$controller_) {
    $scope = $rootScope.$new();
    modalInstance = {                    // Create a mock object using spies
      close: jasmine.createSpy('modalInstance.close'),
      dismiss: jasmine.createSpy('modalInstance.dismiss'),
      opened: {
        then: function (callback) {
          callback.call(null);
        }
      }
    };

    $controller = _$controller_;
  }));

  var image = 'http://milosz.ch/self.jpg';

  it('should exist and set image', function () {
    vm = $controller('ShowImageCtrl', {
      $scope: $scope,
      $uibModalInstance: modalInstance,
      image: image
    });
    $scope.$digest();

    expect(!!vm).toBe(true);
    expect(vm.image).toBe(image);
  });

  it('should have exit method from dialog', function () {
    vm = $controller('ShowImageCtrl', {
      $scope: $scope,
      $uibModalInstance: modalInstance,
      image: image
    });
    $scope.$digest();

    vm.ok();
    expect(modalInstance.close).toHaveBeenCalled();
  });

  it('should close dialog when image is null', function () {
    vm = $controller('ShowImageCtrl', {
      $scope: $scope,
      $uibModalInstance: modalInstance,
      image: null
    });
    $scope.$digest();

    expect(modalInstance.close).toHaveBeenCalled();
  });
});
