'use strict';

describe('Module: foundersMapQuestApp.dashboard', function () {
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

  function resolve(value) {
    return {forStateAndView: function (state, view) {
      var viewDefinition = view ? $state.get(state).views[view] : $state.get(state);
      return $injector.invoke(viewDefinition.resolve[value]);
    }};
  }

  function cleanState(key) {
    StateFactory.create(key).set(null).save();
  }

  var $location,
    settings,
    rootState,
    rootUrl,
    $state,
    $stateParams,
    $rootScope,
    $injector,
    StateFactory;

  // load the directive's module
  beforeEach(module('templates'));
  beforeEach(function () {
    module('foundersMapQuestApp.constants');
    module(function (FMQ_MODULE_SETTINGS, FMQ_ROOT_URL, FMQ_ROOT_STATE) {
      settings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.dashboard'];
      rootUrl = FMQ_ROOT_URL;
      rootState = FMQ_ROOT_STATE;
    });
  });
  beforeEach(module('foundersMapQuestApp.dashboard', function ($stateProvider) {
    $stateProvider
      .state(rootState, {
        url: rootUrl
      })
    ;
  }));

  beforeEach(inject(function (_$location_, _$rootScope_, _$state_, _$stateParams_, _$injector_, _StateFactory_) {
    $location = _$location_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $stateParams = _$stateParams_;
    $injector = _$injector_;
    StateFactory = _StateFactory_;
  }));

  it('should go to dashboard', function () {
    goTo(rootUrl + '/dashboard');
    expect($state.current.name).toEqual(settings.routes.dashboard);
    expect($stateParams.founders).toEqual(null);
  });

  it('should have default foundersManagerState when null founders passed and clean state', inject(function (FoundersManagerFactory, FoundersFactory) {
    var key = 'fmq.foundersManager';
    cleanState(key);

    goFrom(rootUrl + '/').toState(settings.routes.dashboard, {founders: null});
    expect($state.current.name).toEqual(settings.routes.dashboard);
    expect($stateParams.founders).toEqual(null);

    //resolve
    cleanState(key);
    var foundersManager = FoundersManagerFactory.create(FoundersFactory.create()); //default

    var resolved = resolve('foundersManagerState').forStateAndView(settings.routes.dashboard, 'main@');
    expect(resolved.get()).toEqual(foundersManager.toJson());
  }));

  it('should have foundersManagerState from state when null founders passed and existing state', inject(function (FoundersManagerFactory, FoundersFactory, StateFactory) {
    var key = 'fmq.foundersManager';
    cleanState(key);

    goFrom(rootUrl + '/').toState(settings.routes.dashboard, {founders: null});
    expect($state.current.name).toEqual(settings.routes.dashboard);
    expect($stateParams.founders).toEqual(null);

    //resolve
    cleanState(key);
    var foundersManager = FoundersManagerFactory.create(FoundersFactory.createFromJson({
      header: [{name: 'a'}, {name: 'b'}]
    }));
    var foundersManagerState = StateFactory.create(key).set(foundersManager);
    foundersManagerState.save();

    var resolved = resolve('foundersManagerState').forStateAndView(settings.routes.dashboard, 'main@');
    expect(resolved.get()).toEqual(foundersManager.toJson());
  }));

  it('should have foundersManagerState not from state when founders', inject(function (FoundersManagerFactory, FoundersFactory) {
    var founders = FoundersFactory.createFromJson({
      header: [{name: 'a2'}, {name: 'b2'}]
    });

    goFrom(rootUrl + '/').toState(settings.routes.dashboard, {founders: founders});
    expect($state.current.name).toEqual(settings.routes.dashboard);
    expect($stateParams.founders).toEqual(founders);

    //resolve
    var foundersManager = FoundersManagerFactory.create(founders);
    var resolved = resolve('foundersManagerState').forStateAndView(settings.routes.dashboard, 'main@');
    expect(resolved.get()).toEqual(foundersManager.toJson());
  }));

  it('should have default tableHelpInfoState when clean state', function () {
    var key = 'fmq.tableHelpInfo';

    //resolve
    cleanState(key);
    var tableHelpInfo = true;

    var resolved = resolve('tableHelpInfoState').forStateAndView(settings.routes.dashboard, 'main@');
    expect(resolved.get()).toEqual(tableHelpInfo);
  });
});
