'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.loadData.directive:fmqFileReader
 * @description
 * # fmqFileReader
 * Code inspired by https://github.com/itslenny/angular-bootstrap-file-field/blob/master/src/angular-bootstrap-file-field.js
 */
angular.module('foundersMapQuestApp.loadData')
  .directive('fmqFileReader', function (FMQ_COMPONENTS_PATH) {
    return {
      restrict: 'A',
      scope: {text: '=', reset: '='},
      link: function (scope, element) {
        var fileField = element.find('input');

        fileField.bind('change', function (event) {
          scope.$evalAsync(function () {
            var reader = new FileReader();
            reader.onload = function (e) {
              scope.$evalAsync(function () {
                scope.text = e.target.result;
                if (scope.reset) {
                  fileField.val('');
                }
              });
            };
            reader.readAsText(event.target.files[0]);
          });
        });

        fileField.bind('click', function (e){
          e.stopPropagation();
        });
        element.bind('click', function (e){
          e.preventDefault();
          fileField[0].click();
        });
      },
      templateUrl: FMQ_COMPONENTS_PATH + 'load-data/fmq-file-reader.html',
      replace: true,
      transclude: true
    };
  });
