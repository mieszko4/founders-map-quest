'use strict';

describe('Module: foundersMapQuestApp.loadData', function () {
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
    return {forModal: function (modalDefinition) {
      return $injector.invoke(modalDefinition.resolve[value]);
    }};
  }

  var $location,
    settings,
    rootState,
    rootUrl,
    $state,
    $stateParams,
    $rootScope,
    $injector,
    $uibModal;

  describe('with FileReader', function () {
    // load the directive's module
    beforeEach(module('templates'));
    beforeEach(function () {
      module('foundersMapQuestApp.constants');
      module(function (FMQ_MODULE_SETTINGS, FMQ_ROOT_URL, FMQ_ROOT_STATE, $provide) {
        //override load-data's route
        FMQ_MODULE_SETTINGS['foundersMapQuestApp.loadData'].routes['load-data'] = 'root.load-data';
        $provide.constant('FMQ_MODULE_SETTINGS', FMQ_MODULE_SETTINGS);

        settings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.loadData'];
        rootUrl = FMQ_ROOT_URL;
        rootState = FMQ_ROOT_STATE;
      });
    });

    beforeEach(function () {
      module('foundersMapQuestApp.loadData', function ($stateProvider) {
        $stateProvider
          .state(rootState, {
            url: rootUrl
          })
        ;
      });
    });

    beforeEach(inject(function (_$location_, _$rootScope_, _$state_, _$stateParams_, _$injector_, _$uibModal_) {
      $location = _$location_;
      $rootScope = _$rootScope_;
      $state = _$state_;
      $stateParams = _$stateParams_;
      $injector = _$injector_;

      spyOn(_$uibModal_, 'open').and.callThrough();
      $uibModal = _$uibModal_;
    }));

    it('should open load-data modal', function () {
      goTo(rootUrl + '/load-data');
      expect($state.current.name).toEqual(settings.routes['load-data']);
      expect($stateParams.founders).toBe(null);
      expect($uibModal.open).toHaveBeenCalled();
    });

    it('should have default founders when null founders passed', inject(function (FoundersFactory) {
      goFrom(rootUrl + '/').toState(settings.routes['load-data'], {founders: null});
      expect($state.current.name).toEqual(settings.routes['load-data']);
      expect($stateParams.founders).toEqual(null);
      expect($uibModal.open).toHaveBeenCalled();

      //resolve
      var modalDefinition = $uibModal.open.calls.mostRecent().args[0];
      var founders = FoundersFactory.create();

      var resolved = resolve('founders').forModal(modalDefinition);
      expect(resolved).toEqual(founders);
    }));

    it('should have founders with default marker when founders passed', inject(function (FoundersFactory) {
      var founders = FoundersFactory.createFromJson({
        header: [{name: 'a'}, {name: 'b'}],
        items: [
          [1, 2],
          [3, 4]
        ],
        markerColumn: 1
      });

      goFrom(rootUrl + '/').toState(settings.routes['load-data'], {founders: founders});
      expect($state.current.name).toEqual(settings.routes['load-data']);
      expect($stateParams.founders).toEqual(founders);
      expect($uibModal.open).toHaveBeenCalled();

      //resolve
      var modalDefinition = $uibModal.open.calls.mostRecent().args[0];

      var resolved = resolve('founders').forModal(modalDefinition);
      expect(resolved).not.toEqual(founders);

      founders.setDefaultMarkerColumn();
      expect(resolved).toEqual(founders);
    }));

    it('should work when FileReader is defined', function () {
      goFrom(rootUrl + '/').toState(settings.routes['load-data'], {founders: null});
      expect($state.current.name).toEqual(settings.routes['load-data']);
      expect($stateParams.founders).toEqual(null);
      expect($uibModal.open).toHaveBeenCalled();

      //resolve
      var modalDefinition = $uibModal.open.calls.mostRecent().args[0];

      var resolved = resolve('supportsFileReader').forModal(modalDefinition);
      expect(resolved).toEqual(true);
    });

    //onExit
    it('should close modal and not return anything when redirect', function () {
      goFrom(rootUrl + '/').toState(settings.routes['load-data'], {founders: null});
      expect($state.current.name).toEqual(settings.routes['load-data']);
      expect($stateParams.founders).toEqual(null);
      expect($uibModal.open).toHaveBeenCalled();

      var modalInstance = $uibModal.open.calls.mostRecent().returnValue;
      spyOn(modalInstance, 'close');

      goFrom(rootUrl + '/load-data').toState(rootState);
      expect(modalInstance.close).toHaveBeenCalled();
      expect($state.current.name).toEqual(rootState);
      expect($stateParams).toEqual({});
    });

    it('should not return anything when dismissed', function () {
      goFrom(rootUrl + '/').toState(settings.routes['load-data'], {founders: null});
      expect($state.current.name).toEqual(settings.routes['load-data']);
      expect($stateParams.founders).toEqual(null);
      expect($uibModal.open).toHaveBeenCalled();

      spyOn($state, 'go').and.callThrough();
      var modalInstance = $uibModal.open.calls.mostRecent().returnValue;
      modalInstance.dismiss();
      $rootScope.$apply();

      expect($state.current.name).toEqual(rootState);
      expect($state.go).toHaveBeenCalledWith('^');
    });

    it('should return founders and reload when closed', inject(function (FoundersFactory) {
      var founders = FoundersFactory.create();

      goFrom(rootUrl + '/').toState(settings.routes['load-data'], {founders: null});
      expect($state.current.name).toEqual(settings.routes['load-data']);
      expect($stateParams.founders).toEqual(null);
      expect($uibModal.open).toHaveBeenCalled();

      spyOn($state, 'go').and.callThrough();
      var modalInstance = $uibModal.open.calls.mostRecent().returnValue;
      modalInstance.close(founders);
      $rootScope.$apply();

      expect($state.current.name).toEqual(rootState);
      expect($state.go).toHaveBeenCalledWith('^', {founders: founders}, {reload: true});
    }));

    afterEach(function () {
      $rootScope.$destroy();
    });
  });

  describe('without FileReader', function () {
    function reloadModuleScripts(name, async) {
      var previousAsync;

      if (async) {
        previousAsync = angular.element.ajaxSetup().async;
        angular.element.ajaxSetup({async: false});
      }

      angular.element('script').filter(function () {
        var src = (angular.element(this).attr('src') || '');
        return src.indexOf(name) !== -1 && src.indexOf('.spec.js') === -1;
      }).each(function () {
        var $element = angular.element(this);
        var src = $element.attr('src'); //.split('?')[0] + '?' + Math.random();

        $element.remove();
        angular.element.getScript(src);
      });

      if (async) {
        angular.element.ajaxSetup({async: previousAsync});
      }
    }

    var previousFileReader;

    beforeAll(function () {
      previousFileReader = window.FileReader;
      window.FileReader = undefined;

      module('foundersMapQuestApp.constants');
      module(function (FMQ_MODULE_SETTINGS, FMQ_ROOT_URL, FMQ_ROOT_STATE, $provide) {
        //override load-data's route
        FMQ_MODULE_SETTINGS['foundersMapQuestApp.loadData'].routes['load-data'] = 'root.load-data';
        $provide.constant('FMQ_MODULE_SETTINGS', FMQ_MODULE_SETTINGS);

        settings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.loadData'];
        rootUrl = FMQ_ROOT_URL;
        rootState = FMQ_ROOT_STATE;
      });

      reloadModuleScripts(settings.moduleLocation, true);
    });

    afterAll(function () {
      window.FileReader = previousFileReader;

      reloadModuleScripts(settings.moduleLocation, true);
    });

    // load the directive's module
    beforeEach(module('templates'));
    beforeEach(module('foundersMapQuestApp.loadData', function ($stateProvider) {
      $stateProvider
        .state(rootState, {
          url: rootUrl
        })
      ;
    }));

    beforeEach(inject(function (_$location_, _$rootScope_, _$state_, _$stateParams_, _$injector_, _$uibModal_) {
      $location = _$location_;
      $rootScope = _$rootScope_;
      $state = _$state_;
      $stateParams = _$stateParams_;
      $injector = _$injector_;

      spyOn(_$uibModal_, 'open').and.callThrough();
      $uibModal = _$uibModal_;
    }));

    it('should work when FileReader is not defined', inject(function () {
      goFrom(rootUrl + '/').toState(settings.routes['load-data'], {founders: null});
      expect($state.current.name).toEqual(settings.routes['load-data']);
      expect($stateParams.founders).toEqual(null);
      expect($uibModal.open).toHaveBeenCalled();

      //resolve
      var modalDefinition = $uibModal.open.calls.mostRecent().args[0];

      var resolved = resolve('supportsFileReader').forModal(modalDefinition);
      expect(resolved).toEqual(false);
    }));
  });
});
