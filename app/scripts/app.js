'use strict';

/**
 * @ngdoc overview
 * @name AngularGridApp
 * @description
 * # AngularGridApp
 * # Data Grid application
 * # Including: filtering, sorting and pagination
 * Main module of the application.
 */
angular
  .module('AngularGridApp', [
    'ngAnimate',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'gridFilters'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/grid.html',
        controller: 'GridCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
