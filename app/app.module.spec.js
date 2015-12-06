'use strict';

describe('Module: foundersMapQuestApps', function () {
  function goTo(url) {
    $location.url(url);
    $rootScope.$digest();
  }

  var $location,
    $state,
    $rootScope;

  // load the directive's module
  beforeEach(module('templates'));
  beforeEach(module('foundersMapQuestApp'));
  beforeEach(inject(function (_$location_, _$rootScope_, _$state_) {
    $location = _$location_;
    $rootScope = _$rootScope_;
    $state = _$state_;
  }));

  it('should go to dashboard on default', function () {
    goTo('');
    expect($state.current.name).toEqual('root.dashboard');
  });
});
