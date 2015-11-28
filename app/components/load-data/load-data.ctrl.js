'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.loadData.controller:LoadDataCtrl
 * @description
 * # LoadDataCtrl
 * Controller of the foundersMapQuestApp.loadData
 */
angular.module('foundersMapQuestApp.loadData')
  .controller('LoadDataCtrl', function ($scope, $uibModalInstance, founders, supportsFileReader, FoundersFactory, Founders) {
    //set up data
    $scope.founders = founders;
    $scope.supportsFileReader = supportsFileReader;
    $scope.delimiters = Founders.delimiters;
    $scope.form = {
      raw: founders.encodeToRaw(),
      delimiter: founders.delimiter,
      latitudeColumn: founders.latitudeColumn,
      longitudeColumn: founders.longitudeColumn
    };

    //parse founders on text change or delimiter change
    $scope.parseRawData = function (delimiter) {
      $scope.founders = FoundersFactory.createFromRaw(
        $scope.form.raw,
        delimiter,
        $scope.form.latitudeColumn,
        $scope.form.longitudeColumn
      );

      $scope.form.delimiter = $scope.founders.delimiter; //update delimiter
    };

    //check if form is valid
    $scope.formValid = false;
    $scope.$watch(function() {
      return $scope.founders.items !== false &&
        $scope.form.latitudeColumn !== null &&
        $scope.form.longitudeColumn !== null &&
        $scope.form.latitudeColumn !== $scope.form.longitudeColumn
      ;
    }, function (newValue) {
      $scope.formValid = newValue;
    });

    //TODO: detect coordinate column
    /*
    var getAutoAppliedCoordinateColumn = function (columns, currentValue, regExp) {
      var newValue = currentValue;
      if (newValue === null) {
        angular.forEach(columns, function (column, i) {
          if (column.match(regExp)) {
            newValue = i;
            return false; //break
          }
        });
      }

      return newValue;
    };

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

      //auto setup coordinate columns
      if (newValue.header !== null) {
        $scope.form.latitudeColumn = getAutoAppliedCoordinateColumn(newValue.header, $scope.form.latitudeColumn, /latitude|\blat\b/i);
        $scope.form.longitudeColumn = getAutoAppliedCoordinateColumn(newValue.header, $scope.form.longitudeColumn, /longitude|\blng\b/i);
      }
    }, true);
    */

    //Modal finished
    $scope.ok = function () {
      $uibModalInstance.close($scope.founders);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    // get data from uploaded local file
    $scope.supportsFileReader = supportsFileReader;
    if (supportsFileReader) {
      $scope.$watch('fileText', function (newValue) {
        if (newValue) {
          $scope.form.raw = $scope.fileText;
          $scope.parseRawData();
          $scope.fileText = '';
        }
      });
    }
  });
