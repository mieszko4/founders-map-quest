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
        foundersManager: '=',
        hooks: '='
      },
      templateUrl: moduleSettings.moduleLocation + 'fmq-map.html',
      restrict: 'EA',
      link: function (scope) {
        var founders = scope.foundersManager.founders;

        //initial setup of map
        scope.markers = [];
        scope.markerTemplateUrl = moduleSettings.moduleLocation + 'marker.html';
        scope.center = {latitude: 0, longitude: 0};
        scope.zoom = 4;
        scope.markersEvents = {
          click: function (marker, eventName, model) {
            scope.showMarkerWindow(model);
          }
        };

        scope.showMarkerWindow = function (model) {
          scope.markerWindow.model = model;
          scope.markerWindow.show = true;
        };
        scope.closeMarkerWindow = function () {
          scope.markerWindow.show = false;
        };

        scope.markerWindow = {
          model: null,
          show: false
        };

        var updateMarkers = function () {
          var markers = [];
          founders.items.forEach(function (item, i) {
            if (scope.foundersManager.isSelected(item) && scope.foundersManager.passesFilter(item)) {
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

          scope.markers = markers;
        };
        updateMarkers();

        //watch for changes in foundersManager
        [
          'foundersManager.selectedItems',
          'foundersManager.filterStates',
          'foundersManager.founders.markerColumn'
        ].forEach(function (variable) {
          var firstWatch = true;
          scope.$watch(variable, function () {
            if (firstWatch) {
              firstWatch = false;
              return;
            }

            scope.closeMarkerWindow();
            updateMarkers();
          }, true);
        });

        //Hooks for other directives
        scope.hooks = scope.hooks || {};
        scope.hooks.openMarker = function (item) {
          //find right marker
          var foundMarker = null;
          scope.markers.forEach(function (marker) {
            if (foundMarker === null && marker.item === item) {
              foundMarker = marker;
            }
          });

          if (foundMarker !== null) {
            scope.showMarkerWindow(foundMarker);
          } else {
            scope.closeMarkerWindow();
          }
        };
      }
    };
  });
