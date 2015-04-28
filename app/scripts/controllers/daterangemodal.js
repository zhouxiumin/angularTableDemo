'use strict';

/**
 * @ngdoc function
 * @name AngularGridApp.controller:DaterangemodalCtrl
 * @description
 * # DaterangemodalCtrl manages a modal window
 * # Contains 2 Datepickers for selecting a date range
 * @param {Object} $scope The scope of the controller
 * @param {Object} $modalInstance The instance of the bootstrap-ui modal window
 * @param {Object} dateRange The selected date range passed when opening the modal
 * Controller of the AngularGridApp
 */
angular.module('AngularGridApp')
  .controller('DaterangemodalCtrl', ['$scope', '$modalInstance', 'dateRange',
            function ($scope, $modalInstance, dateRange) {

        /* Modal variables */
        $scope.dateFormat = 'yyyy-MM-dd';
        $scope.minDate = new Date(2014, 0, 1);
        $scope.maxDate = new Date();
        $scope.dateFilterStart = dateRange.dateFilterStart;
        $scope.dateFilterEnd = dateRange.dateFilterEnd;

        /* Modal button actions */

        /* Button "Ok" */
        $scope.ok = function () {
            $modalInstance.close({
                dateStart: $scope.dateFilterStart,
                dateEnd: $scope.dateFilterEnd
            });
        };
        /* Button "Cancel" */
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        /* Button "Clear" */
        $scope.clear = function(){
            $scope.clearDateFilterStart();
            $scope.clearDateFilterEnd();
        };

        /* Bootstrap-ui datepicker widget */

        /* Clearing button for start date */
        $scope.clearDateFilterStart = function () {
            $scope.dateFilterStart = null;
        };
        /* Clearing button for end date */
        $scope.clearDateFilterEnd = function () {
            $scope.dateFilterEnd = null;
        };
        /* Open datepicker for start date */
        $scope.openDateFilterStart = function($event){
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedDateFilterStart = true;
        };
        /* Open datepicker for end date */
        $scope.openDateFilterEnd = function($event){
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedDateFilterEnd = true;
        };
  }]);
