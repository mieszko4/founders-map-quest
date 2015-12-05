'use strict';

describe('Module: foundersMapQuestApp.about', function () {
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
    settings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.about'];
    rootUrl = FMQ_ROOT_URL;
    rootState = FMQ_ROOT_STATE;
  }));
  beforeEach(module('foundersMapQuestApp.about', function ($stateProvider) {
    $stateProvider
      .state(rootState, {
        url: rootUrl
      })
    ;
  }));

  beforeEach(inject(function (_$location_, _$rootScope_, _$state_) {
    $location = _$location_;
    $rootScope = _$rootScope_;
    $state = _$state_;
  }));

  it('should go to about', function () {
    goTo(rootUrl + '/about');
    expect($state.current.name).toEqual(settings.routes.about);
  });
});
