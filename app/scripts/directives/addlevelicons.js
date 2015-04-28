'use strict';

/**
 * @ngdoc directive
 * @name AngularGridApp.directive:addLevelIcons
 * @description
 * # addLevelIcons Directive
 * # Adds an icon to the error level cell
 * @returns {Object} unnamed Containing the template for the icon
 */
angular.module('AngularGridApp')
  .directive('errorLevelIcon', function () {
    return {
      templateUrl: 'views/template-error-level.html',
      restrict: 'AE'
    };
  });
