'use strict';

/**
 * @ngdoc overview
 * @name foundersMapQuestApp.constants
 * @description
 * # foundersMapQuestApp.constants
 *
 * Constants for main module of the application.
 */
 angular.module('foundersMapQuestApp.constants', [])
  .constant('FMQ_MODULE_SETTINGS', {
    'foundersMapQuestApp.about': {
      routes: {'about': 'root.about'},
      moduleLocation: 'components/about/'
    },
    'foundersMapQuestApp.columnSorter': {
      moduleLocation: 'components/column-sorter/'
    },

    'foundersMapQuestApp.dashboard': {
      routes: {'dashboard': 'root.dashboard'},
      moduleLocation: 'components/dashboard/'
    },
    'foundersMapQuestApp.showImage': {
      routes: {'show-image': 'root.dashboard.show-image'},
      moduleLocation: 'components/dashboard/show-image/'
    },
    'foundersMapQuestApp.loadData': {
      routes: {'load-data': 'root.dashboard.load-data'},
      moduleLocation: 'components/dashboard/load-data/'
    },
    'foundersMapQuestApp.map': {
      routes: {map: 'root.dashboard.map'},
      moduleLocation: 'components/dashboard/map/'
    },
    'foundersMapQuestApp.table': {
      moduleLocation: 'components/dashboard/table/'
    },
    'foundersMapQuestApp.visualize': {
      moduleLocation: 'components/dashboard/visualize/'
    },

    'foundersMapQuestApp.error': {
      routes: {'not-found': 'not-found'},
      moduleLocation: 'components/error/'
    },


    'foundersMapQuestApp.navigation': {
      moduleLocation: 'components/navigation/'
    }
  })
  .constant('FMQ_ROOT_URL', '')
  .constant('FMQ_ROOT_STATE', 'root')
  .constant('FMQ_ANIMATE', true);
