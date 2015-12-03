'use strict';

describe('Directive: fmqShowImage', function () {
  var $state = {
    go: jasmine.createSpy('$state.go')
  };

  // load the directive's module
  beforeEach(module('templates'));
  beforeEach(module('foundersMapQuestApp.showImage', function ($provide) {
    $provide.value('$state', $state);
  }));

  var element,
    $scope;

  var links = [
    '<a class="jpeg" href="http://milosz.ch/1.jpeg">1</a>',
    '<a class="png" href="http://milosz.ch/2.jpeg">2</a>',
    '<a class="jpeg" href="http://milosz.ch/3.jpeg">3</a>'
  ];
  var selector = '.jpeg';

  beforeEach(inject(function ($rootScope) {
    $scope = $rootScope.$new();
  }));

  it('should change state for selected elements', inject(function ($compile, FMQ_MODULE_SETTINGS) {
    element = angular.element('<div fmq-show-image="' + selector + '">' + links.join('') + '</div>');
    element = $compile(element)($scope);
    $scope.$apply();

    expect(element.find('a').length).toBe(3);
    expect(element.find(selector).length).toBe(2);

    $state.go.calls.reset();
    element.find('.png:eq(0)').trigger('click');
    expect($state.go).not.toHaveBeenCalled();

    $state.go.calls.reset();
    element.find('.jpeg:eq(0)').trigger('click');
    expect($state.go).toHaveBeenCalledWith(FMQ_MODULE_SETTINGS['foundersMapQuestApp.showImage'].routes['show-image'], {
      image: 'http://milosz.ch/1.jpeg'
    });

    $state.go.calls.reset();
    element.find('.jpeg:eq(1)').trigger('click');
    expect($state.go).toHaveBeenCalledWith(FMQ_MODULE_SETTINGS['foundersMapQuestApp.showImage'].routes['show-image'], {
      image: 'http://milosz.ch/3.jpeg'
    });
  }));

  it('should not change state for elements outside of parent', inject(function ($compile) {
    element = angular.element('<div>' + links.join('') + '<div fmq-show-image="' + selector + '"></div></div>');
    element = $compile(element)($scope);
    $scope.$apply();

    expect(element.find('a').length).toBe(3);
    expect(element.find(selector).length).toBe(2);

    $state.go.calls.reset();
    element.find('.png:eq(0)').trigger('click');
    expect($state.go).not.toHaveBeenCalled();

    $state.go.calls.reset();
    element.find('.jpeg:eq(0)').trigger('click');
    expect($state.go).not.toHaveBeenCalled();

    $state.go.calls.reset();
    element.find('.jpeg:eq(1)').trigger('click');
    expect($state.go).not.toHaveBeenCalled();
  }));

  it('should prevent default click event', inject(function ($compile) {
    element = angular.element('<div fmq-show-image="' + selector + '">' + links.join('') + '</div>');
    element = $compile(element)($scope);
    $scope.$apply();

    expect(element.find('a').length).toBe(3);
    expect(element.find(selector).length).toBe(2);

    var event = angular.element.Event('click');
    element.find('.jpeg:eq(0)').trigger(event);
    expect(event.isDefaultPrevented()).toBeTruthy();
  }));
});
