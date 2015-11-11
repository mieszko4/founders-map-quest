'use strict';

/**
 * @ngdoc function
 * @name foundersMapQuestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the foundersMapQuestApp
 */
angular.module('foundersMapQuestApp')
  .controller('MainCtrl', function ($scope, Founders, $uibModal) {
    $scope.Founders = Founders;

    $scope.openLoadDataForm = function () {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/load-data.html',
        controller: 'LoadDataCtrl',
        resolve: {
          items: function () {
            return $scope.items;
          }
        },
        backdrop: 'static'
      });

      modalInstance.result.then(function (items) {
        Founders.setItems(items);
      }, function () {
        console.log('Gave up on data loading');
      });
    };
  });
