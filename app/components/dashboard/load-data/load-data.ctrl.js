'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.loadData.controller:LoadDataCtrl
 * @description
 * # LoadDataCtrl
 * Controller of the foundersMapQuestApp.loadData
 */
angular.module('foundersMapQuestApp.loadData')
  .controller('LoadDataCtrl', function ($scope, $uibModalInstance, founders, supportsFileReader, Csv, Founders) {
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

    //detect coordinate column
    var autoApplyCoordinates = function () {
      $scope.founders.autoSetCoordinateColumns();
      $scope.form.latitudeColumn = $scope.founders.latitudeColumn;
      $scope.form.longitudeColumn = $scope.founders.longitudeColumn;
    };
    autoApplyCoordinates();

    //parse founders on text change or delimiter change
    $scope.applyRawData = function (delimiter) {
      var previousHeader = $scope.founders.header;
      var parsedData = Csv.parse(
        $scope.form.raw,
        delimiter
      );
      $scope.founders.header = parsedData.header;
      $scope.founders.items = parsedData.items;
      $scope.founders.delimiter = parsedData.delimiter;

      $scope.form.delimiter = $scope.founders.delimiter; //update delimiter

      //auto setup coordinate columns when header changes
      var headersEqual = JSON.stringify(previousHeader) === JSON.stringify($scope.founders.header);
      if (!headersEqual) {
        autoApplyCoordinates();
      }
    };

    //update coordinates
    $scope.coordinateSelected = function () {
      $scope.founders.latitudeColumn = $scope.form.latitudeColumn;
      $scope.founders.longitudeColumn = $scope.form.longitudeColumn;
    };

    //check if form is valid
    $scope.formValid = false;
    $scope.$watch(function() {
      return $scope.founders.items !== null &&
        $scope.form.latitudeColumn !== null &&
        $scope.form.longitudeColumn !== null &&
        $scope.form.latitudeColumn !== $scope.form.longitudeColumn
      ;
    }, function (newValue) {
      $scope.formValid = newValue;
    });

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
          $scope.applyRawData();
          $scope.fileText = '';
        }
      });
    }
  });
