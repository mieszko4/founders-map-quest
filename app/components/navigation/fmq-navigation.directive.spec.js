'use strict';

describe('Directive: fmqNavigation', function () {

  // load the directive's module
  beforeEach(module('templates'));
  beforeEach(module('foundersMapQuestApp.navigation', function ($stateProvider) {
    $stateProvider
     .state('page1', {
       url: '/page1',
       params: {
         label: 'Page 1'
       }
     }).state('page2', {
       url: '/page2',
       params: {
         label: 'Page 2'
       }
     }).state('page3', {
       url: '/page3'
     }).state('page4', {
       views: {
         main: {}
       }
     });
  }));

  var element,
    $scope;

  beforeEach(inject(function ($rootScope) {
    $scope = $rootScope.$new();
  }));

  it('should render links non-abstract and with label', inject(function ($compile) {
    element = angular.element('<fmq-navigation></fmq-navigation>');
    element = $compile(element)($scope);
    $scope.$digest();

    expect(element.find('li').length).toBe(2);
    expect(element.find('li:eq(0) a').text()).toContain('Page 1');
    expect(element.find('li:eq(0) a').attr('ui-sref')).toBe('page1');
    expect(element.find('li:eq(0) a').attr('href')).toContain('/page1');
    expect(element.find('li:eq(1) a').text()).toContain('Page 2');
    expect(element.find('li:eq(1) a').attr('ui-sref')).toBe('page2');
    expect(element.find('li:eq(1) a').attr('href')).toContain('/page2');
  }));

  it('should show active link when state changes', inject(function ($compile, $state) {
    element = angular.element('<fmq-navigation></fmq-navigation>');
    element = $compile(element)($scope);
    $scope.$digest();

    $state.go('page1');
    $scope.$digest();
    expect(element.find('li:eq(0)').hasClass('active')).toBe(true);
    expect(element.find('li:eq(1)').hasClass('active')).toBe(false);

    $state.go('page2');
    $scope.$digest();
    expect(element.find('li:eq(0)').hasClass('active')).toBe(false);
    expect(element.find('li:eq(1)').hasClass('active')).toBe(true);
  }));
});
