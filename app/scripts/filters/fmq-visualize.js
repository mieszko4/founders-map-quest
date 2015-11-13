'use strict';

/**
 * @ngdoc filter
 * @name foundersMapQuestApp.filter:fmqVisualize
 * @function
 * @description
 * # fmqVisualize
 * Filter in the foundersMapQuestApp.
 */
angular.module('foundersMapQuestApp')
  .filter('fmqVisualize', function ($sce) {
    var linkRegExp = new RegExp(/https?:\/\/(.+)/);
    var imageRegExp = new RegExp(/.+\.(jpg|jpeg|png|gif|svg|bmp)$/);

    return function (input) {
      var output = input;
      if (linkRegExp.test(input)) {
        if (imageRegExp.test(input)) {
          output = '<a class="show-image" href="' + input + '"><img src="' + input + '" alt=""/></a>';
        } else {
          output = '<a target="_blank" href="' + input + '">' + input + '</a>';
        }
      } else {
        //encode html entities
        output = angular.element('<div />').text(input).html();
      }

      output = $sce.trustAsHtml(output);
      return output;
    };
  });
