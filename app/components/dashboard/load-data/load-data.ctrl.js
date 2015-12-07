'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.loadData.controller:LoadDataCtrl
 * @description
 * # LoadDataCtrl
 * Controller of the foundersMapQuestApp.loadData
 */
angular.module('foundersMapQuestApp.loadData')
  .controller('LoadDataCtrl', function ($scope, $uibModalInstance, founders, supportsFileReader, Csv) {
    var vm = this;

    //set up data
    vm.founders = founders;
    vm.supportsFileReader = supportsFileReader;
    vm.delimiters = Csv.delimiters;
    vm.form = {
      raw: founders.encodeToRaw(),
      delimiter: founders.delimiter,
      latitudeColumn: founders.latitudeColumn,
      longitudeColumn: founders.longitudeColumn
    };

    //detect coordinate column
    var autoApplyCoordinates = function () {
      vm.founders.autoSetCoordinateColumns();
      vm.form.latitudeColumn = vm.founders.latitudeColumn;
      vm.form.longitudeColumn = vm.founders.longitudeColumn;
    };
    autoApplyCoordinates();

    //parse founders on text change or delimiter change
    vm.applyRawData = function (delimiter) {
      var previousHeader = vm.founders.header;
      var parsedData = Csv.parse(
        vm.form.raw,
        delimiter
      );
      vm.founders.header = parsedData.header;
      vm.founders.items = parsedData.items;
      vm.founders.delimiter = parsedData.delimiter;

      vm.form.delimiter = vm.founders.delimiter; //update delimiter

      //auto setup coordinate columns when header changes
      var headersEqual = JSON.stringify(previousHeader) === JSON.stringify(vm.founders.header);
      if (!headersEqual) {
        autoApplyCoordinates();
      }
    };

    //update coordinates
    vm.coordinateSelected = function () {
      vm.founders.latitudeColumn = vm.form.latitudeColumn;
      vm.founders.longitudeColumn = vm.form.longitudeColumn;
    };

    //check if form is valid
    $scope.$watch(function() {
      return vm.founders.items !== null &&
        vm.form.latitudeColumn !== null &&
        vm.form.longitudeColumn !== null &&
        vm.form.latitudeColumn !== vm.form.longitudeColumn
      ;
    }, function (newValue) {
      vm.formValid = newValue;
    });

    //Modal finished
    vm.ok = function () {
      $uibModalInstance.close(vm.founders);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    // get data from uploaded local file
    if (supportsFileReader) {
      $scope.$watch(function () {
        return vm.fileText;
      }, function (newValue) {
        if (newValue) {
          vm.form.raw = vm.fileText;
          vm.applyRawData();
          vm.fileText = '';
        }
      });
    }
  });
