'use strict';

describe('Module: foundersMapQuestApps.error', function () {
  function goTo(url) {
    $location.url(url);
    $rootScope.$digest();
  }

  var $location,
    settings,
    rootState,
    rootUrl,
    $state,
    $rootScope;

  // load the directive's module
  beforeEach(module('templates'));
  beforeEach(module('foundersMapQuestApp.constants', function (FMQ_MODULE_SETTINGS, FMQ_ROOT_URL, FMQ_ROOT_STATE) {
    settings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.error'];
    rootUrl = FMQ_ROOT_URL;
    rootState = FMQ_ROOT_STATE;
  }));
  beforeEach(module('foundersMapQuestApp.error'));

  beforeEach(inject(function (_$location_, _$rootScope_, _$state_) {
    $location = _$location_;
    $rootScope = _$rootScope_;
    $state = _$state_;
  }));

  it('should go to error page', function () {
    var nonExistingUrl = '/non-existing';

    goTo(nonExistingUrl);
    expect($state.current.name).toEqual(settings.routes['not-found']);
  });
  it('should not change url', function () {
    var nonExistingUrl = '/non-existing';

    goTo(nonExistingUrl);
    expect($location.url()).toEqual(nonExistingUrl);
  });
});
