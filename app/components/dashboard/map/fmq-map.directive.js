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

        scope.markers = [];
        scope.markerTemplateUrl = moduleSettings.moduleLocation + 'marker.html';

        var updateMarkers = function () {
          var markers = [];
          angular.forEach(founders.items, function (item, i) {
            if (scope.foundersManager.isSelected(item) && scope.foundersManager.passesFilter(item)) {//FilterHandler.passesFilter(scope.filterStates, item)) {
              if (isNaN(item[founders.latitudeColumn]) || isNaN(item[founders.longitudeColumn])) {
                return true; //continue
              }

              markers.push({
                id: i,
                coords: {
                  latitude: item[founders.latitudeColumn],
                  longitude: item[founders.longitudeColumn]
                },
                window: {
                  title: item[founders.markerColumn]
                }
              });
            }
          });

          scope.markers = markers;
        };

        //watch for changes in foundersManager
        [
          'foundersManager.selectedItems',
          'foundersManager.filterStates',
          'foundersManager.founders.markerColumn'
        ].forEach(function (variable) {
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
              type: founders.detectType(foundMarker.window.title, foundMarker.id)
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
                type: founders.detectType(model.window.title, model.id)
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
