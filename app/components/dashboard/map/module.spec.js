'use strict';

describe('Module: foundersMapQuestApp.map', function () {
  function goTo(url) {
    $location.url(url);
    $rootScope.$digest();
  }

  function goFrom(url) {
    return {toState: function (state, params) {
      $location.replace().url(url);
      $state.go(state, params);
      $rootScope.$digest();
    }};
  }

  var $location,
    settings,
    rootState,
    rootUrl,
    $state,
    $stateParams,
    $rootScope;

  // load the directive's module
  beforeEach(module('templates'));
  beforeEach(function () {
    module('foundersMapQuestApp.constants');
    module(function (FMQ_MODULE_SETTINGS, FMQ_ROOT_URL, FMQ_ROOT_STATE, $provide) {
      //override map's route
      FMQ_MODULE_SETTINGS['foundersMapQuestApp.map'].routes.map = 'root.map';
      $provide.constant('FMQ_MODULE_SETTINGS', FMQ_MODULE_SETTINGS);

      settings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.map'];
      rootUrl = FMQ_ROOT_URL;
      rootState = FMQ_ROOT_STATE;
    });
  });
  beforeEach(module('foundersMapQuestApp.map', function ($stateProvider) {
    $stateProvider
      .state(rootState, {
        url: rootUrl
      })
    ;
  }));

  beforeEach(inject(function (_$location_, _$rootScope_, _$state_, _$stateParams_) {
    $location = _$location_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $stateParams = _$stateParams_;
  }));

  it('should go to map', function () {
    goTo(rootUrl + '/map');
    expect($state.current.name).toEqual(settings.routes.map);
    expect($stateParams.item).toEqual(null);
  });

  it('should have item when item passed', inject(function (FoundersFactory) {
    var founders = FoundersFactory.createFromJson({
      header: [{name: 'a'}, {name: 'b'}],
      items: [
        [1, 2],
        [3, 4]
      ]
    });

    goFrom(rootUrl + '/').toState(settings.routes.map, {item: founders.items[0]});
    expect($state.current.name).toEqual(settings.routes.map);
    expect($stateParams.item).toEqual(founders.items[0]);
  }));
});
