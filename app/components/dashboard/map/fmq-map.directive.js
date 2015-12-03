'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.map.directive:fmqMap
 * @description
 * # fmqMap
 */
angular.module('foundersMapQuestApp.map')
  .directive('fmqMap', function (FMQ_MODULE_SETTINGS) {
    var moduleSettings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.map'];

    return {
      scope: {
        foundersManager: '='
      },
      templateUrl: moduleSettings.moduleLocation + 'fmq-map.html',
      restrict: 'EA',
      controllerAs: 'vm',
      bindToController: true,
      controller: function ($scope, $rootScope, $state, $stateParams, $uiViewScroll, $element, $window) {
        var vm = this;
        var founders = vm.foundersManager.founders;

        //initial setup of map
        vm.markers = [];
        vm.markerTemplateUrl = moduleSettings.moduleLocation + 'marker.html';
        vm.center = {latitude: 0, longitude: 0};
        vm.zoom = 4;
        vm.markersEvents = {
          click: function (marker, eventName, model) {
            vm.showMarkerWindow(model);
          }
        };

        vm.showMarkerWindow = function (model) {
          vm.markerWindow.model = model;
          vm.markerWindow.show = true;
        };
        vm.closeMarkerWindow = function () {
          vm.markerWindow.show = false;
        };

        vm.markerWindow = {
          model: null,
          show: false
        };

        var updateMarkers = function () {
          var markers = [];
          founders.items.forEach(function (item, i) {
            if (vm.foundersManager.isSelected(item) && vm.foundersManager.passesFilter(item)) {
              if (isNaN(item[founders.latitudeColumn]) || isNaN(item[founders.longitudeColumn])) {
                return true; //continue
              }

              markers.push({
                id: i,
                item: item,
                coords: {
                  latitude: item[founders.latitudeColumn],
                  longitude: item[founders.longitudeColumn]
                },
                content: item[founders.markerColumn],
                type: founders.getMarkerContentType(item)
              });
            }
          });

          vm.markers = markers;
        };
        updateMarkers();

        //watch for changes in foundersManager
        var firstWatch = true;
        $scope.$watch(function () {
          return JSON.stringify(vm.foundersManager.selectedItems) +
            JSON.stringify(vm.foundersManager.filterStates) +
            JSON.stringify(vm.foundersManager.founders.markerColumn);
        }, function () {
          if (firstWatch) {
            firstWatch = false;
            return;
          }

          vm.closeMarkerWindow();
          updateMarkers();
        });


        //open marker for specified item
        var openMarker = function (item) {
          //$anchorScroll('fmq-map'); TODO: enable
          //find right marker
          var foundMarker = null;
          vm.markers.forEach(function (marker) {
            if (foundMarker === null && marker.item === item) {
              foundMarker = marker;
            }
          });

          if (foundMarker !== null) {
            vm.showMarkerWindow(foundMarker);
          } else {
            vm.closeMarkerWindow();
          }
        };

        var applyMapState = function (state, params) {
          if (state.name !== FMQ_MODULE_SETTINGS['foundersMapQuestApp.map'].routes.map) {
            return;
          }

          $uiViewScroll($element).then(function () {
            angular.element($window).one('scroll', function () {
              $state.go('^');
            });
          });
          openMarker(params.item);
        };
        applyMapState($state.current, $stateParams);

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
          applyMapState(toState, toParams);
        });
      }
    };
  });
