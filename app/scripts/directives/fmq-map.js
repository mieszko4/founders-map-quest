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
      templateUrl: 'views/directives/fmq-map.html',
      restrict: 'A',
      link: function (scope) {
        //TODO: move to another directive
        //TODO: watch for (selected) items change
        //TODO: watch for markerDescription change
        //TODO: watch for lng/lat column change
        //TODO: calculate bound based on markers
        //TODO: on-change: create markers field

        scope.map = {
          center: { latitude: 39.8282, longitude: -98.5795 },
          zoom: 4
        };
        scope.markers = [
          {
            id: 0,
            coords: {
              latitude: 45.5200,
              longitude: -122.6819
            },
            window: {
              title: 'Portland, OR'
            }
          }
        ];
      }
    };
  });
