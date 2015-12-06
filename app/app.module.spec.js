'use strict';

describe('Module: foundersMapQuestApps', function () {
  function goTo(url) {
    $location.url(url);
    $rootScope.$digest();
  }

  var $location,
    $state,
    $rootScope,
    allSettings,
    rootUrl;

  // load the directive's module
  beforeEach(module('templates'));
  beforeEach(function () {
    module('foundersMapQuestApp.constants');
    module(function (FMQ_MODULE_SETTINGS, FMQ_ROOT_URL) {
      allSettings = FMQ_MODULE_SETTINGS;
      rootUrl = FMQ_ROOT_URL;
    });
  });
  beforeEach(module('foundersMapQuestApp'));
  beforeEach(inject(function (_$location_, _$rootScope_, _$state_) {
    $location = _$location_;
    $rootScope = _$rootScope_;
    $state = _$state_;
  }));

  it('should go to dashboard on default', function () {
    goTo(rootUrl);
    expect($state.current.name).toEqual(allSettings['foundersMapQuestApp.dashboard'].routes.dashboard);
  });

  it('should go to dashboard on default with slash', function () {
    goTo(rootUrl + '/');
    expect($state.current.name).toEqual(allSettings['foundersMapQuestApp.dashboard'].routes.dashboard);
  });
});
