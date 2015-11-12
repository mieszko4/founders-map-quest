'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.directive:fmqMap
 * @description
 * # fmqMap
 */
angular.module('foundersMapQuestApp')
  .directive('fmqMap', function () {
    return {
      scope: {
        items: '=',
        markerColumn: '=',
        latitudeColumn: '=',
        longitudeColumn: '='
      },
      templateUrl: 'views/directives/fmq-map.html',
      restrict: 'A',
      link: function (scope) {
        scope.markers = [];

        scope.$watchGroup(['items', 'markerColumn', 'latitudeColumn', 'longitudeColumn'], function () {
          scope.markers = [];
          angular.forEach(scope.items, function (item, i) {
            scope.markers.push({
              id: i,
              coords: {
                latitude: item[scope.latitudeColumn],
                longitude: item[scope.longitudeColumn]
              },
              window: {
                title: item[scope.markerColumn]
              }
            });
          });
        }, true);

        //TODO: calculate bound based on markers and zoom in?

        scope.map = {
          center: { latitude: 39.8282, longitude: -98.5795 },
          zoom: 4,
          markersEvents: {
            click: function(marker, eventName, model) {
              scope.map.window.model = model;
              scope.map.window.show = true;
            }
          },
          window: {
              marker: {},
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
