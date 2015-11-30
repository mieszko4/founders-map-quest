'use strict';

/**
 * @ngdoc service
 * @name foundersMapQuestApp.founders.Founders
 * @description
 * # FoundersManager
 * Service in the foundersMapQuestApp.founders.
 * foundersManager *has a* founders
 */
angular.module('foundersMapQuestApp.founders')
  .factory('FoundersManagerFactory', function (FoundersManager) {
    var Factory = {
      create: function (founders) {
        return new FoundersManager(founders);
      }
    };

    return Factory;
  })

  .factory('FoundersManager', function () {
    var FoundersManager = function (founders) {
      this.founders = founders;
      //TODO: inital state
    };

    FoundersManager.prototype.toJson = function () {
      //TODO: manager properties
      return {
        founders: this.founders.toJson()
      };
    };

    return FoundersManager;
  });
