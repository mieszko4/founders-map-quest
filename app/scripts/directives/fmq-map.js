'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.directive:fmqMap
 * @description
 * # fmqMap
 */
angular.module('foundersMapQuestApp')
  .directive('fmqMap', function (FilterHandler) {
    return {
      scope: {
        items: '=',
        markerColumn: '=',
        latitudeColumn: '=',
        longitudeColumn: '=',
        selectedItems: '=',
        filterStates: '=',
        hooks: '='
      },
      templateUrl: 'views/directives/fmq-map.html',
      restrict: 'A',
      link: function (scope) {
        scope.markers = [];

        var updateMarkers = function () {
          var markers = [];
          angular.forEach(scope.items, function (item, i) {
            if (typeof scope.selectedItems[i] !== 'undefined' && FilterHandler.passesFilter(scope.filterStates, item)) {
              if (isNaN(item[scope.latitudeColumn]) || isNaN(item[scope.longitudeColumn])) {
                return true; //continue
              }

              markers.push({
                id: i,
                coords: {
                  latitude: item[scope.latitudeColumn],
                  longitude: item[scope.longitudeColumn]
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
        angular.forEach(['items', 'markerColumn', 'latitudeColumn', 'longitudeColumn', 'selectedItems', 'filterStates'], function (variable) {
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
            scope.map.window.model = foundMarker;
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
              scope.map.window.model = model;
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
