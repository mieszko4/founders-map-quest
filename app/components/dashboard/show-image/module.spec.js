'use strict';

describe('Module: foundersMapQuestApp.showImage', function () {
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
    $rootScope,
    $uibModal;

  // load the directive's module
  beforeEach(module('templates'));
  beforeEach(function () {
    module('foundersMapQuestApp.constants');
    module(function (FMQ_MODULE_SETTINGS, FMQ_ROOT_URL, FMQ_ROOT_STATE, $provide) {
      //override show-image's route
      FMQ_MODULE_SETTINGS['foundersMapQuestApp.showImage'].routes['show-image'] = 'root.show-image';
      $provide.constant('FMQ_MODULE_SETTINGS', FMQ_MODULE_SETTINGS);

      settings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.showImage'];
      rootUrl = FMQ_ROOT_URL;
      rootState = FMQ_ROOT_STATE;
    });
  });
  beforeEach(module('foundersMapQuestApp.showImage', function ($stateProvider) {
    $stateProvider
      .state(rootState, {
        url: rootUrl
      })
    ;
  }));

  beforeEach(inject(function (_$location_, _$rootScope_, _$state_, _$stateParams_, _$uibModal_) {
    $location = _$location_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $stateParams = _$stateParams_;

    spyOn(_$uibModal_, 'open').and.callThrough();
    $uibModal = _$uibModal_;
  }));

  it('should redirect to root when going to show-image', function () {
    goTo(rootUrl + '/show-image');
    expect($state.current.name).toEqual(rootState);
    expect($stateParams.image).not.toBeDefined();
    expect($uibModal.open).toHaveBeenCalled();
  });

  it('should have item when item passed', function () {
    var image = 'http://milosz.ch/self.jpg';

    //onEnter
    goFrom(rootUrl + '/').toState(settings.routes['show-image'], {image: image});
    expect($state.current.name).toEqual(settings.routes['show-image']);
    expect($stateParams.image).toEqual(image);
    expect($uibModal.open).toHaveBeenCalled();

    //onExit
    var modalInstance = $uibModal.open.calls.mostRecent().returnValue;
    spyOn(modalInstance, 'close');
    goFrom(rootUrl + '/show-image').toState(rootState);
    expect(modalInstance.close).toHaveBeenCalled();
    expect($state.current.name).toEqual(rootState);
  });
});
