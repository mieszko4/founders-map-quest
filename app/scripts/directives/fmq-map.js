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
        markerColumnIndex: '=',
        latitudeColumnIndex: '=',
        longitudeColumnIndex: '='
      },
      templateUrl: 'views/directives/fmq-map.html',
      restrict: 'A',
      link: function (scope) {
        scope.markers = [];

        scope.$watchGroup(['items', 'markerColumnIndex', 'latitudeColumnIndex', 'longitudeColumnIndex'], function () {
          scope.markers = [];
          angular.forEach(scope.items, function (item, i) {
            scope.markers.push({
              id: i,
              coords: {
                latitude: item[scope.latitudeColumnIndex],
                longitude: item[scope.longitudeColumnIndex]
              },
              window: {
                title: item[scope.markerColumnIndex]
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
