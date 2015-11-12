'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.controller:LoadDataCtrl
 * @description
 * # LoadDataCtrl
 * Controller of the foundersMapQuestApp
 */
angular.module('foundersMapQuestApp')
  .controller('LoadDataCtrl', function ($scope, $uibModalInstance, Founders, state) {
    if (state !== null) {
      $scope.columns = state.header;
      $scope.form = {
        raw: Founders.encode(state.header, state.items, state.delimiter),
        delimiter: state.delimiter,
        latitudeColumn: null,
        longitudeColumn: null
      };
      $scope.data = Founders.decode($scope.form.raw, $scope.form.delimiter);
    } else {
      $scope.columns = [];
      $scope.form = {
        raw: null,
        delimiter: Founders.defaultDelimiter,
        latitudeColumn: null,
        longitudeColumn: null
      };
      $scope.data = {
        header: null,
        items: false
      };
    }

    $scope.parseRawData = function () {
      $scope.data = Founders.decode($scope.form.raw, $scope.form.delimiter);
    };

    $scope.formValid = false;
    $scope.$watch(function() {
      return $scope.data.items !== false &&
        $scope.form.latitudeColumn !== null &&
        $scope.form.longitudeColumn !== null
      ;
    }, function (newValue) {
      $scope.formValid = newValue;
    });

    var firstDataWatch = true; //set up state if available
    $scope.$watch(function() {
      return $scope.data;
    }, function (newValue) {
      var headersEqual = angular.equals($scope.columns, newValue.header);

      if (newValue.items !== false) {
        if (!headersEqual) {
          $scope.form.latitudeColumn = null;
          $scope.form.longitudeColumn = null;
          $scope.columns = newValue.header;
        } else {
          if (firstDataWatch) {
            if (state !== null) {
              $scope.form.latitudeColumn = state.latitudeColumn;
              $scope.form.longitudeColumn = state.longitudeColumn;
            }
          }
        }
      } else if (!headersEqual) {
        $scope.form.latitudeColumn = null;
        $scope.form.longitudeColumn = null;
        $scope.columns = [];
      }
    }, true);

    $scope.ok = function () {
      $uibModalInstance.close({
        header: $scope.data.header,
        items: $scope.data.items,
        delimiter: $scope.form.delimiter,
        latitudeColumn: $scope.form.latitudeColumn,
        longitudeColumn: $scope.form.longitudeColumn
      });
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
