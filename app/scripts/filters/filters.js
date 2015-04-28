'use strict';

/**
 * @ngdoc filter
 * @name AngularGridApp.filter:filters
 * @function
 * @description
 * # truncateString Filter
 * @param {String} input Value to be truncated
 * @returns {String} Truncated value or input
 * Filter in the AngularGridApp.
 */
var gridFilters = angular.module('gridFilters', []);

gridFilters.filter('truncateString', ['$filter', function ($filter) {
  return function (input) {
      //limit the input to 60 characters
      return (input !== undefined && input.length > 60) ? $filter('limitTo')(input, 60, 0) + '...' : input;
  };
}]);

/**
 * @ngdoc filter
 * @name AngularGridApp.filter:filters
 * @function
 * @description
 * # dateRange Filter
 * # Method filters a given Array of objects, that have a date property,
 * # by checking if this property is found between 2 given dates
 * @param {Array[Object]} items Items to be filtered
 * @param {String} startDate Start of the date range
 * @param {String} endDate End of the date range
 * @returns {Array[Object]} filtered items
 * Filter in the AngularGridApp.
 */
gridFilters.filter('dateRange', function () {
    return function (items, startDate, endDate) {
        var output = [];
        angular.forEach(items, function(item){
            //check if dates are set and filter items
            if(startDate !== undefined && startDate !== null &&
                endDate !== undefined && endDate !== null &&
                item.date !== undefined && item.date !== null){

                //workaround to avoid test error "Invalid date", due to Phantomjs issue
                var changedDate = item.date.split(' ')[0];
                changedDate = changedDate + 'T00:00:00Z';

                //create date objects, remove time for comparison
                var entryDate = new Date(changedDate);
                entryDate.setHours(0,0,0,0);

                if(typeof startDate !== Date){
                    startDate = new Date(startDate);
                }

                if(typeof endDate !== Date){
                    endDate = new Date(endDate);
                }

                //compare dates
                if(entryDate >= startDate && entryDate <= endDate) {
                    output.push(item);
                }
            //dates are not set -> show all items
            }else{
                output.push(item);
            }

        });
        return output;
    };
});

/**
 * @ngdoc filter
 * @name AngularGridApp.filter:filters
 * @function
 * @description
 * # formatDisplayedDateRange Filter
 * # Method is formatting 2 given dates into a String, adding "-" between them
 * @param {Object} dateStart First date from the range
 * @param {Object} dateEnd Last date from the range
 * @returns {String} formatted date range
 * Filter in the AngularGridApp.
 */
gridFilters.filter('formatDisplayedDateRange', ['$filter', function ($filter) {
    return function (dateStart, dateEnd) {
        //check if dates are set and format them
        if(dateStart !== undefined && dateStart !== null &&
            dateEnd !== undefined && dateEnd !== null) {

            return $filter('date')(dateStart, 'yyyy-MM-dd') + ' - ' +
                $filter('date')(dateEnd, 'yyyy-MM-dd');
        //dates not set -> return empty string
        }else{
            return '';
        }
    };
}]);