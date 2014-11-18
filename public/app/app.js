'use strict';

var octobluApp = angular.module('octobluDashboard', ['ui.bootstrap', 'ui.router']);

octobluApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/dashboard');

  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      controller: 'dashboardController',
      views: {
        '': {
          templateUrl: '/views/dashboard.html'
        },
        'date-time': {
          controller: 'dateTimeController',
          templateUrl: '/views/date-time.html'
        },
        'messages': {
          controller: 'messagesController',
          templateUrl: '/views/messages.html'
        },
        'status': {
          controller: 'statusController',
          templateUrl: '/views/status.html'
        }
      }
    });

});