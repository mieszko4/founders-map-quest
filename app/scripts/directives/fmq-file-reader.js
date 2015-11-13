'use strict';

/**
 * @ngdoc directive
 * @name foundersMapQuestApp.directive:fmqFileReader
 * @description
 * # fmqFileReader
 * Code inspired by https://github.com/itslenny/angular-bootstrap-file-field/blob/master/src/angular-bootstrap-file-field.js
 */
angular.module('foundersMapQuestApp')
  .directive('fmqFileReader', function () {
    return {
      restrict: 'A',
      scope: {text: '='},
      link: function (scope, element, attrs) {
        var fileField = element.find('input');

        fileField.bind('change', function (event) {
          scope.$evalAsync(function () {
            if (attrs.text) {
              var reader = new FileReader();
              reader.onload = function (e) {
                scope.$evalAsync(function () {
                  scope.text = e.target.result;
                  if (attrs.reset) {
                    fileField.val('');
                  }
                });
              };
              reader.readAsText(event.target.files[0]);
            }
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
      template:'<button type="button"><ng-transclude></ng-transclude><input type="file" style="display:none"></button>',
      replace:true,
      transclude:true
    };
  });
