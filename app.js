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
        controller: 'mainCtrl'
        //controllerAs: 'main'
      })
      .when('/physical', {
        templateUrl: 'views/physical.html',
        controller: 'physicalCtrl'
        //controllerAs: 'main'
      })
      .when('/emotional', {
        templateUrl: 'views/emotional.html',
        controller: 'emotionalCtrl'
        //controllerAs: 'main'
      })
      .when('/brain', {
        templateUrl: 'views/brain.html',
        controller: 'brainCtrl'
        //controllerAs: 'main'
      })
      .otherwise({
        redirectTo: "/"
      });
      // use the HTML5 History API
      $locationProvider.html5Mode({
      enabled:true,
      requireBase: true});
  });
