'use strict';

angular
  .module('mymedic', [
    'ngAnimate',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'highcharts-ng'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
      })
      .when('/physical', {
        templateUrl: 'views/physical.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
      })
      .when('/emotional', {
        templateUrl: 'views/emotional.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
      })
      .when('/emotional', {
        templateUrl: 'views/brain.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
      // use the HTML5 History API
      $locationProvider.html5Mode({
      enabled:false,
      requireBase: false});
  });
