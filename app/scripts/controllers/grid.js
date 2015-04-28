'use strict';

/**
 * @ngdoc function
 * @name AngularGridApp.controller:GridCtrl
 * @description
 * # GridCtrl manages the grid.html view
 * # Contains a Data Grid
 * # Features: sorting, filtering, pagination
 * @param {Object} $scope The scope of the controller
 * @param {Function} $http The Angular http service
 * @param {Function} $filter The Angular filter service
 * @param {Object} $modal The bootstrap-ui modal window object
 * Controller of the AngularGridApp
 */
angular.module('AngularGridApp')
  .controller('GridCtrl', ['$scope', '$http', '$filter', '$modal', function ($scope, $http, $filter, $modal) {
        /* General table variables */
        $scope.watcherGroup = ['userNameFilter', 'errorLevelFilter', 'processRunRefFilter', 'processNameFilter', 'messageFilter', 'dateFilterStart', 'dateFilterEnd'];
        $scope.currentPage = 1;
        $scope.numPerPage = 20;
        $scope.dateFormat = 'yyyy-MM-dd';

        $scope.errorLevels = [
            {value : 'INFO', icon: 'glyphicon-info-sign'},
            {value : 'DEBUG', icon : 'glyphicon-ok-sign'},
            {value : 'ERROR', icon : 'glyphicon-remove-sign'},
            {value : 'WARN', icon : 'glyphicon-alert'}
        ];

        $scope.sorting = {
            column: 'date',
            descending: true
        };

        /* General table actions */
        $scope.retrieveData = function(){
          $http.get('data/logs.json').success(function(result){
              $scope.logEntries = result.data;
              $scope.filteredLogEntries = $scope.logEntries;
              $scope.totalItems = $scope.logEntries.length;
          });
        };

        $scope.selectLevel = function(level){
            $scope.errorLevelFilter = level;
        };

        /* Initial data retrieval */
        $scope.retrieveData();

        /* Table sorting */
        $scope.setSortedColumn = function(column){
            if($scope.sorting.column === column){
              return !$scope.sorting.descending ? 'glyphicon-menu-up' : 'glyphicon-menu-down';
            }
        };

        $scope.sort = function(column){
            var sorting = $scope.sorting;

            if(sorting.column === column){
                sorting.descending = !sorting.descending;
            }else{
                sorting.column = column;
                sorting.descending = false;
            }
        };

      /* Table pagination */
      $scope.paginate = function(value) {
        var begin, end, index;
        begin = ($scope.currentPage - 1) * $scope.numPerPage;
        end = begin + $scope.numPerPage;
        index = $scope.filteredLogEntries.indexOf(value);
        return (begin <= index && index < end);
      };

      /* Watching over data changes when filtering, to update pagination */
      $scope.$watchGroup($scope.watcherGroup, function(newValues){
          $scope.filteredLogEntries = $filter('filter')($scope.logEntries, {userName: newValues[0],
            logLevel : newValues[1],
            processRunRef: newValues[2],
            processName: newValues[3],
            message: newValues[4]});
          $scope.filteredLogEntries = $filter('dateRange')($scope.filteredLogEntries, newValues[5], newValues[6]);
          $scope.totalItems = $scope.filteredLogEntries !== undefined ? $scope.filteredLogEntries.length : 0;
          $scope.currentPage = 1;
      });

     /* Date filter modal window */
      $scope.openModal = function (size) {

        var dateRange = {
          dateFilterStart: $filter('date')($scope.dateFilterStart, $scope.dateFormat),
          dateFilterEnd: $filter('date')($scope.dateFilterEnd, $scope.dateFormat)
        };

        /* Opening modal window and passing the filter variables */
        var modalDateRange = $modal.open({
            templateUrl: 'views/template-modal.html',
            controller: 'DaterangemodalCtrl',
            size: size,
            resolve: {
                dateRange: function(){
                    return dateRange;
                }
            }
        });

        /* Closing modal, with 2 options: "Ok" or "Cancel" button was pressed */
        modalDateRange.result.then(function (result) {
            /* Close through "Ok" button */
            $scope.dateFilterStart = result.dateStart;
            $scope.dateFilterEnd = result.dateEnd;
            $scope.dateFilter = $filter('formatDisplayedDateRange')($scope.dateFilterStart, $scope.dateFilterEnd);
        }, function(reason){
            /* Closed through "Cancel" button */
            if(reason === 'cancel'){
                $scope.dateFilterStart = undefined;
                $scope.dateFilterEnd = undefined;
                $scope.dateFilter = '';
            }
        });
      };

  }]);
