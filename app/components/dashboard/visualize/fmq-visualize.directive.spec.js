'use strict';

describe('Directive: fmqVisualize', function () {

  // load the directive's module
  beforeEach(module('templates'));
  beforeEach(module('foundersMapQuestApp.visualize'));

  var element,
    $scope;

  beforeEach(inject(function ($rootScope) {
    $scope = $rootScope.$new();
  }));

  it('should render unknown type', inject(function ($compile) {
    var data = 'Hello World';
    element = angular.element('<fmq-visualize data="' + data + '" type=""></fmq-visualize>');
    element = $compile(element)($scope);
    $scope.$apply();

    expect(element.hasClass('type-unknown')).toBe(true);
    expect(element.children().length).toBe(1);
    expect(element.children().first().text()).toContain(data);
  }));

  it('should render image type', inject(function ($compile) {
    var data = 'http://milosz.ch/self.jpg';
    element = angular.element('<fmq-visualize data="' + data + '" type="image"></fmq-visualize>');
    element = $compile(element)($scope);
    $scope.$apply();

    expect(element.hasClass('type-image')).toBe(true);
    expect(element.children().length).toBe(1);

    var $a = element.children().first('a');
    expect($a.length).toBe(1);
    expect($a.attr('href')).toBe(data);

    var $img = element.children().first('a').find('img');
    expect($img.length).toBe(1);
    expect($img.attr('src')).toBe(data);
  }));

  it('should render link type', inject(function ($compile) {
    var data = 'http://milosz.ch/';
    element = angular.element('<fmq-visualize data="' + data + '" type="link"></fmq-visualize>');
    element = $compile(element)($scope);
    $scope.$apply();

    expect(element.hasClass('type-link')).toBe(true);
    expect(element.children().length).toBe(1);

    var $a = element.children().first('a');
    expect($a.length).toBe(1);
    expect($a.attr('href')).toBe(data);

    expect($a.text()).toContain(data);
  }));

  it('should render latitude type', inject(function ($compile, decimal2dmsFilter) {
    var data = 55.751667;
    element = angular.element('<fmq-visualize data="' + data + '" type="latitude"></fmq-visualize>');
    element = $compile(element)($scope);
    $scope.$apply();

    expect(element.hasClass('type-latitude')).toBe(true);
    expect(element.children().length).toBe(1);

    var $container = element.children().first();
    expect($container.length).toBe(1);
    expect($container.text()).toContain(decimal2dmsFilter(data, true));
  }));

  it('should render longitude type', inject(function ($compile, decimal2dmsFilter) {
    var data = 55.751667;
    element = angular.element('<fmq-visualize data="' + data + '" type="longitude"></fmq-visualize>');
    element = $compile(element)($scope);
    $scope.$apply();

    expect(element.hasClass('type-longitude')).toBe(true);
    expect(element.children().length).toBe(1);

    var $container = element.children().first();
    expect($container.length).toBe(1);
    expect($container.text()).toContain(decimal2dmsFilter(data, false));
  }));
});
