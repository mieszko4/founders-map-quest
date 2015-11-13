'use strict';

/**
 * @ngdoc filter
 * @name foundersMapQuestApp.filter:decimal2dms
 * @function
 * @description
 * # decimal2dms
 * Filter in the foundersMapQuestApp.
 * Code adjusted from: https://www.dougv.com/2012/03/converting-latitude-and-longitude-coordinates-between-decimal-and-degrees-minutes-seconds/
 */
angular.module('foundersMapQuestApp')
  .filter('decimal2dms', function () {
    return function (decimal, isLatitude) {
      var degrees = 0;
      var minutes = 0;
      var seconds = 0;
      var direction = 'X';

      //decimal must be integer or float no larger than 180;
      if (isNaN(decimal) || Math.abs(decimal) > 180) {
        return '';
       }

      //set direction; north assumed
      if (isLatitude && decimal < 0) {
        direction = 'S';
      } else if (!isLatitude && decimal < 0) {
        direction = 'W';
      } else if (!isLatitude) {
        direction = 'E';
      } else {
        direction = 'N';
      }

      //get absolute value of decimal
      var d = Math.abs(decimal);

      //get degrees
      degrees = Math.floor(d);

      //get seconds
      seconds = (d - degrees) * 3600;

      //get minutes
      minutes = Math.floor(seconds / 60);

      //reset seconds
      seconds = Math.floor(seconds - (minutes * 60));

      //pad with 0
      minutes = (minutes < 10) ? '0' + minutes : minutes;
      seconds = (seconds < 10) ? '0' + seconds : seconds;

      return degrees + '° ' + minutes + '′ ' + seconds + '″ ' + direction;
    };
  });
