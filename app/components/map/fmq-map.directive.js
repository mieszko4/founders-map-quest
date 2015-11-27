'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.map.directive:fmqMap
 * @description
 * # fmqMap
 */
angular.module('foundersMapQuestApp.map')
  .directive('fmqMap', function (FilterHandler, FMQ_COMPONENTS_PATH) {
    return {
      scope: {
        founders: '=',
        markerColumn: '=',
        selectedItems: '=',
        filterStates: '=',
        hooks: '='
      },
      templateUrl: FMQ_COMPONENTS_PATH + 'map/fmq-map.html',
      restrict: 'A',
      link: function (scope) {
        scope.markers = [];

        var updateMarkers = function () {
          var markers = [];
          angular.forEach(scope.founders.items, function (item, i) {
            if (typeof scope.selectedItems[i] !== 'undefined' && FilterHandler.passesFilter(scope.filterStates, item)) {
              if (isNaN(item[scope.founders.latitudeColumn]) || isNaN(item[scope.founders.longitudeColumn])) {
                return true; //continue
              }

              markers.push({
                id: i,
                coords: {
                  latitude: item[scope.founders.latitudeColumn],
                  longitude: item[scope.founders.longitudeColumn]
                },
                window: {
                  title: item[scope.markerColumn]
                }
              });
            }
          });

          scope.markers = markers;
        };

        //register deep watches for couple variables, since $watchGroup does not support deep
        angular.forEach(['founders', 'markerColumn', 'selectedItems', 'filterStates'], function (variable) {
          scope.$watch(variable, function () {
            updateMarkers();
            scope.map.window.show = false;
          }, true);
        });

        //refresh active markers
        scope.hooks = scope.hooks || {};
        scope.hooks.openMarker = function (index) {
          //find right marker
          var foundMarker = null;
          angular.forEach(scope.markers, function (marker) {
            if (marker.id === index) {
              foundMarker = marker;
              return false; //break
            }
          });

          if (foundMarker !== null) {
            scope.map.window.model = {
              data: foundMarker,
              type: scope.founders.detectType(foundMarker.window.title, foundMarker.id)
            };
            scope.map.window.show = true;
          } else {
            scope.map.window.show = false;
          }
        };

        scope.map = {
          center: {latitude: 0, longitude: 0},
          zoom: 4,
          markersEvents: {
            click: function(marker, eventName, model) {
              scope.map.window.model = {
                data: model,
                type: scope.founders.detectType(model.window.title, model.id)
              };
              scope.map.window.show = true;
            }
          },
          window: {
              show: false,
              closeClick: function() {
                scope.map.window.show = false;
              },
              options: {}
          }
        };
      }
    };
  });
