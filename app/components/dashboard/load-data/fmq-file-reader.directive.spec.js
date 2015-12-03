'use strict';

describe('Directive: fmqFileReader', function () {
  var eventListener,
    readAsText;

  // load the directive's module
  beforeEach(module('templates'));
  beforeEach(module('foundersMapQuestApp.loadData', function ($provide) {
    eventListener = jasmine.createSpy();
    readAsText = jasmine.createSpy();
    var dummyFileReader = spyOn(window, 'FileReader').and.returnValue({
      addEventListener: eventListener,
      readAsText: readAsText
    });
    $provide.value('FileReader', dummyFileReader);
  }));

  var element,
    $scope;

  var file = {
    name: 'test.txt',
    size: 100,
    type: 'text/plain'
  };

  it('should get text content from local file with reseting file input', inject(function ($rootScope, $compile) {
    $scope = $rootScope.$new();
    element = angular.element('<fmq-file-reader text="text" reset="reset">Choose file</fmq-file-reader>');

    $scope.text = '';
    $scope.reset  = true;
    element = $compile(element)($scope);
    $scope.$digest();

    var $input = element.find('input');
    spyOn(angular.element.fn, 'val');

    //simulate user selecting file
    element.trigger('click');
    $input.triggerHandler({
      type: 'change',
      target: {
        files: [file]
      }
    });

    $scope.$digest();

    expect(eventListener.calls.mostRecent().args[0]).toEqual('load');
    expect(readAsText.calls.mostRecent().args[0]).toBe(file);

    //simulate loaded file
    eventListener.calls.mostRecent().args[1]({
      target: {
        result: 'a;b;c;d'
      }
    });
    $scope.$apply();

    expect($scope.text).toBe('a;b;c;d');
    expect($input.val.calls.mostRecent().args[0]).toBe('');
  }));

  it('should get text content from local file without reseting file input', inject(function ($rootScope, $compile) {
    $scope = $rootScope.$new();
    element = angular.element('<fmq-file-reader text="text" reset="reset">Choose file</fmq-file-reader>');

    $scope.text = '';
    $scope.reset = false;
    element = $compile(element)($scope);
    $scope.$digest();

    var $input = element.find('input');
    spyOn(angular.element.fn, 'val');

    //simulate user selecting file
    element.trigger('click');
    $input.triggerHandler({
      type: 'change',
      target: {
        files: [file]
      }
    });

    $scope.$digest();

    expect(eventListener.calls.mostRecent().args[0]).toEqual('load');
    expect(readAsText.calls.mostRecent().args[0]).toBe(file);

    //simulate loaded file
    eventListener.calls.mostRecent().args[1]({
      target: {
        result: 'a;b;c;d'
      }
    });
    $scope.$apply();

    expect($scope.text).toBe('a;b;c;d');
    expect($input.val.calls.count()).toBe(0);
  }));

  it('should return when FileReader is unavailable', function () {
    module(function ($provide) {
      $provide.value('FileReader', false);
    });

    inject(function ($compile, $rootScope) {
      $scope = $rootScope.$new();
      element = angular.element('<fmq-file-reader text="text" reset="reset">Choose file</fmq-file-reader>');

      $scope.text = '';
      $scope.reset  = true;
      element = $compile(element)($scope);
      $scope.$digest();

      var $input = element.find('input');

      //simulate user selecting file
      element.trigger('click');
      $input.val(file.name);
      $input.triggerHandler({
        type: 'change',
        target: {
          files: [file]
        }
      });

      $scope.$digest();

      expect(eventListener.calls.count()).toBe(0);
    });
  });
});
