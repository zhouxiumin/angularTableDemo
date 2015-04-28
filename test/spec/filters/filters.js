'use strict';

describe('Custom Filters', function () {

  // load the filter's module
  beforeEach(module('AngularGridApp'));

  // initialize a new instance of the filter before each test
  var GridCtrl, $httpBackend, scope, truncateString, filterByDateRange, formatDisplayedDateRange,
      logData = function(){
        return {'data': [
          {
            'logLevel': 'INFO',
            'date': '2015-04-20 14:49:40',
            'processName': 'MONITOR_MESSAGES',
            'userName': 'system',
            'processRunRef': '2015042414493990200002',
            'message': '2 receive queue(s) running: [ws266-AppDH (TechAckCapacity=100 RunnerCapacity=5)] [E2net-Dev (TechAckCapacity=100 RunnerCapacity=5)] ',
            'hasErrorLogs': false,
            'errorLog': null
          },
          {
            'logLevel': 'ERROR',
            'date': '2015-04-21 13:26:19',
            'processName': 'LOAD_SAP_MD',
            'userName': 'admin',
            'processRunRef': '2015042413261873000012',
            'message': 'FAILURE executing LOAD_SAP_MD',
            'hasErrorLogs': true,
            'errorLog': null
          },
          {
            'logLevel': 'DEBUG',
            'date': '2015-04-24 13:24:08',
            'processName': 'LOAD_SAP_ROC',
            'userName': 'admin',
            'processRunRef': '2015042413240867200009',
            'message': 'LOAD_SAP_ROC parameters: Message = PreProcessHook = null, PostProcessHook = null, DataFilter = null',
            'hasErrorLogs': false,
            'errorLog': null
          },
          {
            'logLevel': 'WARN',
            'date': '2015-04-24 12:02:18',
            'processName': 'MONITOR_MESSAGES',
            'userName': 'system',
            'processRunRef': '2015042412021821200002',
            'message': '2 receive queue(s) running: [ws266-AppDH (TechAckCapacity=100 RunnerCapacity=5)] [E2net-Dev (TechAckCapacity=100 RunnerCapacity=5)] ',
            'hasErrorLogs': false,
            'errorLog': null
          }]};
      };

  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('data/logs.json').respond(logData());
    scope = $rootScope.$new();
    GridCtrl = $controller('GridCtrl', {$scope: scope});
  }));

  describe('truncateString Filter', function(){

    beforeEach(inject(function ($filter) {
      truncateString = $filter('truncateString');
    }));

    it('should truncate a string bigger than 60 characters', function(){
      var bigString = '2 receive queue(s) running: [ws266-AppDH (TechAckCapacity=100 RunnerCapacity=5)] [E2net-Dev (TechAckCapacity=100 RunnerCapacity=5)]';
      expect(truncateString(bigString).length).toBe(63);
    });

    it('should not truncate a string smaller than 60 characters', function(){
      var smallString = '2 receive queue(s) running',
          lengthOfString = smallString.length;
      expect(truncateString(smallString).length).toBe(lengthOfString);
    });

  });

  describe('filterByDateRange Filter', function(){

    beforeEach(inject(function ($filter) {
      filterByDateRange = $filter('dateRange');
    }));

    it('should filter by date range', function(){
      var dateStart = new Date(2015,3,20),
          dateEnd = new Date(2015,3,21);
      $httpBackend.flush();
      expect(scope.filteredLogEntries.length).toBe(4);
      var filteredData = filterByDateRange(scope.filteredLogEntries, dateStart, dateEnd);
      expect(filteredData.length).toBe(2);
    });

  });

  describe('formatDisplayedDateRange Filter', function(){

    beforeEach(inject(function ($filter) {
      formatDisplayedDateRange = $filter('formatDisplayedDateRange');
    }));

    it('should format 2 dates as a string with a "-" character between', function(){
      var dateStart = new Date(2015,3,20),
          dateEnd = new Date(2015,3,21),
          formattedRange = formatDisplayedDateRange(dateStart, dateEnd);
      expect(formattedRange).toMatch('2015-04-20 - 2015-04-21');
    });

  });

});
