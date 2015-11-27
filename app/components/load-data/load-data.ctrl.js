'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.loadData.controller:LoadDataCtrl
 * @description
 * # LoadDataCtrl
 * Controller of the foundersMapQuestApp.loadData
 */
angular.module('foundersMapQuestApp.loadData')
  .controller('LoadDataCtrl', function ($scope, $uibModalInstance, state, supportsFileReader, FoundersFactory, Founders) {
    var stateDefaults = {
      header: [],
      items: [],
      delimiter: Founders.defaultDelimiter,
      latitudeColumn: null,
      longitudeColumn: null
    };

    state = angular.extend(stateDefaults, state);
    $scope.data = FoundersFactory.create(
      state.header,
      state.items,
      state.delimiter,
      state.latitudeColumn,
      state.longitudeColumn
    );
    $scope.columns = $scope.data.header;
    $scope.form = {
      raw: $scope.data.encodeToRaw(),
      delimiter: state.delimiter,
      latitudeColumn: state.latitudeColumn,
      longitudeColumn: state.longitudeColumn
    };

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

    $scope.delimiters = Founders.delimiters;
    $scope.parseRawData = function (delimiter) {
      $scope.data = FoundersFactory.createFromRaw($scope.form.raw, delimiter, $scope.form.latitudeColumn, $scope.form.longitudeColumn);
      $scope.form.delimiter = $scope.data.delimiter;
    };

    $scope.formValid = false;
    $scope.$watch(function() {
      return $scope.data.items !== false &&
        $scope.form.latitudeColumn !== null &&
        $scope.form.longitudeColumn !== null &&
        $scope.form.latitudeColumn !== $scope.form.longitudeColumn
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

      //auto setup coordinate columns
      if (newValue.header !== null) {
        $scope.form.latitudeColumn = getAutoAppliedCoordinateColumn(newValue.header, $scope.form.latitudeColumn, /latitude|\blat\b/i);
        $scope.form.longitudeColumn = getAutoAppliedCoordinateColumn(newValue.header, $scope.form.longitudeColumn, /longitude|\blng\b/i);
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

    // upload local file
    $scope.supportsFileReader = supportsFileReader;
    $scope.$watch('fileText', function (newValue) {
      if (newValue) {
        $scope.form.raw = $scope.fileText;
        $scope.parseRawData();
        $scope.fileText = '';
      }
    });
  });
