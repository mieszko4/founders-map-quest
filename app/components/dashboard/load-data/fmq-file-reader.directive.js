'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.loadData.directive:fmqFileReader
 * @description
 * # fmqFileReader
 * Code inspired by https://github.com/itslenny/angular-bootstrap-file-field/blob/master/src/angular-bootstrap-file-field.js
 */
angular.module('foundersMapQuestApp.loadData')
  .directive('fmqFileReader', function (FMQ_MODULE_SETTINGS, FileReader) {
    var moduleSettings = FMQ_MODULE_SETTINGS['foundersMapQuestApp.loadData'];

    return {
      restrict: 'EA',
      scope: {text: '=', reset: '='},
      link: function (scope, element) {
        if (FileReader === false) {
          return;
        }

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

        fileField.bind('click', function (e) {
          e.stopPropagation();
        });
        element.bind('click', function (e) {
          e.preventDefault();
          fileField[0].click();
        });
      },
      templateUrl: moduleSettings.moduleLocation + 'fmq-file-reader.html',
      replace: true,
      transclude: true
    };
  });
