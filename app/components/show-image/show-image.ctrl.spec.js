'use strict';

describe('Controller: ShowImageCtrl', function () {

  // load the controller's module
  console.log('LOADING MODULE,si');
  beforeEach(module('foundersMapQuestApp.showImage'));

  var ShowImageCtrl,
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

    ShowImageCtrl = $controller('ShowImageCtrl', {
      $scope: scope,
      $uibModalInstance: modalInstance,
      image: 'http://milosz.ch/self.jpg'
      // place here mocked dependencies
    });
  }));

  it('should exist', function () {
    expect(!!ShowImageCtrl).toBe(true);
  });
});
