'use strict';

/**
 * @ngdoc overview
 * @name mymedic
 * @Angel hack
 *
 *
 * Main module of the application.
 */
angular
  .module('angGraderApp', [
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
        controller: 'MainCtrl',
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
