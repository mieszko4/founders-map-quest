'use strict';

describe('Controller: LoadDataCtrl', function () {

  // load the controller's module
  beforeEach(module('foundersMapQuestApp'));

  var LoadDataCtrl,
    scope,
    modalInstance;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    modalInstance = {                    // Create a mock object using spies
      close: jasmine.createSpy('modalInstance.close'),
      dismiss: jasmine.createSpy('modalInstance.dismiss'),
      result: {
        then: jasmine.createSpy('modalInstance.result.then')
      }
    };

    LoadDataCtrl = $controller('LoadDataCtrl', {
      $scope: scope,
      $uibModalInstance: modalInstance,
      state: null
      // place here mocked dependencies
    });
  }));

  it('should not have empty scope', function () {
    expect(Object.keys(LoadDataCtrl).length).toBe(0);
  });
});
