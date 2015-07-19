'use strict';

angular
  .module('mymedic', [
    'ngAnimate',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
      // use the HTML5 History API
      $locationProvider.html5Mode({
      enabled:true,
      requireBase: false});
  });
