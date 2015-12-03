'use strict';

describe('Directive: fmqMap', function () {
  // load the directive's module
  beforeEach(module('templates'));

  var element,
    foundersManager,
    $rootScope,
    $scope;

  function createElement() {
    inject(function (_$rootScope_, FoundersFactory, FoundersManagerFactory) {
      $scope = _$rootScope_.$new();

      var founders = FoundersFactory.createFromJson({
        header: [{name: 'Id'}, {name: 'Latitude'}, {name: 'Longitude'}, {name: 'Other'}],
        items: [
          [0, 12.2, 14.3, 'http://milosz.ch/'],
          [1, 32.2, 54.3, 'http://milosz.ch/avatar.jpeg'],
          [0, 9.2, 12.3, 'Hello!']
        ],
      });
      foundersManager = FoundersManagerFactory.create(founders);

      $rootScope = _$rootScope_;
    });

    return angular.element('<fmq-map founders-manager="foundersManager"></fmq-map>');
  }

  it('should not have markers when latitude and longitude columns are not defined', function () {
    module('foundersMapQuestApp.map');
    element = createElement();
    $scope.foundersManager = foundersManager;

    inject(function ($compile) {
      element = $compile(element)($scope);
    });
    $scope.$apply();

    var vm = element.isolateScope().vm;

    expect(vm.markers.length).toBe(0);
  });

  it('should open marker window when clicked on marker', function () {
    module('foundersMapQuestApp.map');
    element = createElement();
    $scope.foundersManager = foundersManager;
    foundersManager.founders.latitudeColumn = 1;
    foundersManager.founders.longitudeColumn = 2;

    inject(function ($compile) {
      element = $compile(element)($scope);
      $scope.$apply();

      var vm = element.isolateScope().vm;

      expect(vm.markers.length).toBe(3);

      //simulate marker click
      vm.markersEvents.click.call(null, null, null, vm.markers[0]);

      expect(vm.markerWindow.model).toBe(vm.markers[0]);
      expect(vm.markerWindow.show).toBe(true);
    });
  });

  it('should have markers when latitude and longitude columns are defined', function () {
    module('foundersMapQuestApp.map');
    element = createElement();

    foundersManager.founders.latitudeColumn = 1;
    foundersManager.founders.longitudeColumn = 2;
    $scope.foundersManager = foundersManager;
    inject(function ($compile) {
      element = $compile(element)($scope);
    });
    $scope.$apply();

    var vm = element.isolateScope().vm;

    expect(vm.markers.length).toBe(3);
  });

  it('should open and close window', function () {
    module('foundersMapQuestApp.map');
    element = createElement();

    foundersManager.founders.latitudeColumn = 1;
    foundersManager.founders.longitudeColumn = 2;
    $scope.foundersManager = foundersManager;
    inject(function ($compile) {
      element = $compile(element)($scope);
    });
    $scope.$apply();

    var vm = element.isolateScope().vm;

    expect(vm.markerWindow.model).toBe(null);
    expect(vm.markerWindow.show).toBe(false);

    vm.showMarkerWindow(vm.markers[0]);
    expect(vm.markerWindow.model).toBe(vm.markers[0]);
    expect(vm.markerWindow.show).toBe(true);

    vm.closeMarkerWindow();
    expect(vm.markerWindow.show).toBe(false);
  });

  it('should update markers when foundersManager.selectedItems, foundersManager.filterStates, foundersManager.markerColumn changes', function () {
    module('foundersMapQuestApp.map');
    element = createElement();

    foundersManager.founders.latitudeColumn = 1;
    foundersManager.founders.longitudeColumn = 2;
    $scope.foundersManager = foundersManager;
    inject(function ($compile) {
      element = $compile(element)($scope);
    });
    $scope.$apply();

    var vm = element.isolateScope().vm;

    expect(vm.markers.length).toBe(3);

    //selectedItems
    foundersManager.toggleAllSelection();
    $scope.$apply();
    expect(vm.markers.length).toBe(0);

    //filterStates
    foundersManager.toggleAllSelection();
    foundersManager.setFilter(vm.foundersManager.founders.header[0], '0');
    $scope.$apply();
    expect(vm.markers.length).toBe(2);

    //markerColumn
    foundersManager.resetFilters();
    $scope.$apply();

    var previousMarkerValues = vm.markers.map(function (marker) {
      return marker.content;
    });

    foundersManager.founders.chooseAsMarker(vm.foundersManager.founders.header[1]);
    $scope.$apply();

    var currentMarkerValues = vm.markers.map(function (marker) {
      return marker.content;
    });

    expect(currentMarkerValues.length).toBe(previousMarkerValues.length);
    expect(currentMarkerValues).not.toEqual(previousMarkerValues);
  });

  it('should open marker when state matches', function () {
    var $state = {
      current: {
        name: 'test',
      },
      go: jasmine.createSpy('$state.go')
    };

    module('foundersMapQuestApp.map', function ($provide) {
      $provide.value('$state', $state);

      $provide.constant('FMQ_MODULE_SETTINGS', {
        'foundersMapQuestApp.map': {
          routes: {
            map: 'test'
          },
          moduleLocation: 'components/dashboard/map/'
        }
      });

      $provide.value('$uiViewScroll', function () {
        return {
          then: function (callback) {
            callback.call(null);
          }
        };
      });

      $provide.service('$stateParams', function () {
        this.item = foundersManager.founders.items[0];
      });
    });
    element = createElement();

    foundersManager.founders.latitudeColumn = 1;
    foundersManager.founders.longitudeColumn = 2;
    $scope.foundersManager = foundersManager;
    inject(function ($compile) {
      element = $compile(element)($scope);
    });
    $scope.$apply();

    var vm = element.isolateScope().vm;

    expect(vm.markers.length).toBe(3);
    expect(vm.markerWindow.model).toBe(vm.markers[0]);
    expect(vm.markerWindow.show).toBe(true);

    expect($state.go).not.toHaveBeenCalled();

    angular.element(window).trigger('scroll');
    expect($state.go).toHaveBeenCalledWith('^');
  });

  it('should not open marker when state matches', function () {
    var $state = {
      current: {
        name: 'test',
      },
      go: jasmine.createSpy('$state.go')
    };

    module('foundersMapQuestApp.map', function ($provide) {
      $provide.value('$state', $state);

      $provide.constant('FMQ_MODULE_SETTINGS', {
        'foundersMapQuestApp.map': {
          routes: {
            map: 'test'
          },
          moduleLocation: 'components/dashboard/map/'
        }
      });

      $provide.value('$uiViewScroll', function () {
        return {
          then: function (callback) {
            callback.call(null);
          }
        };
      });

      $provide.service('$stateParams', function () {
        this.item = 'non-existing';
      });
    });
    element = createElement();

    foundersManager.founders.latitudeColumn = 1;
    foundersManager.founders.longitudeColumn = 2;
    $scope.foundersManager = foundersManager;
    inject(function ($compile) {
      element = $compile(element)($scope);
    });
    $scope.$apply();

    var vm = element.isolateScope().vm;

    expect(vm.markers.length).toBe(3);
    expect(vm.markerWindow.show).toBe(false);

    expect($state.go).not.toHaveBeenCalled();

    angular.element(window).trigger('scroll');
    expect($state.go).toHaveBeenCalledWith('^');
  });

  it('should open marker when state changes and matches', function () {
    var $state = {
      current: {
        name: 'root',
      },
      go: jasmine.createSpy('$state.go')
    };

    module('foundersMapQuestApp.map', function ($provide) {
      $provide.value('$state', $state);

      $provide.constant('FMQ_MODULE_SETTINGS', {
        'foundersMapQuestApp.map': {
          routes: {
            map: 'test'
          },
          moduleLocation: 'components/dashboard/map/'
        }
      });

      $provide.value('$uiViewScroll', function () {
        return {
          then: function (callback) {
            callback.call(null);
          }
        };
      });
    });
    element = createElement();

    foundersManager.founders.latitudeColumn = 1;
    foundersManager.founders.longitudeColumn = 2;
    $scope.foundersManager = foundersManager;
    inject(function ($compile) {
      element = $compile(element)($scope);
    });
    $scope.$apply();

    var vm = element.isolateScope().vm;

    expect(vm.markers.length).toBe(3);
    expect(vm.markerWindow.show).toBe(false);

    //simulate change state
    $state.current.name = 'test';
    $rootScope.$broadcast('$stateChangeSuccess', $state.current, {
      item: foundersManager.founders.items[0]
    });

    expect(vm.markerWindow.model).toBe(vm.markers[0]);
    expect(vm.markerWindow.show).toBe(true);
    expect($state.go).not.toHaveBeenCalled();

    angular.element(window).trigger('scroll');
    expect($state.go).toHaveBeenCalledWith('^');
  });
});
