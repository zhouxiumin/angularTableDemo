'use strict';

describe('Controller: GridCtrl', function () {

  // load the controller's module
  beforeEach(module('AngularGridApp'));

  var GridCtrl, scope, $httpBackend, orderByFilter, filterByColumn,
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
            'processRunRef': '2015042414493990200002',
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

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, $filter) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('data/logs.json').respond(logData());
    scope = $rootScope.$new();
    GridCtrl = $controller('GridCtrl', {$scope: scope});
    orderByFilter = $filter('orderBy');
    filterByColumn = $filter('filter');
  }));


  it('should initialize default table variables', function(){
      var watchers = ['userNameFilter', 'errorLevelFilter', 'processRunRefFilter', 'processNameFilter', 'messageFilter', 'dateFilterStart', 'dateFilterEnd', 'logEntries'],
          errorLevels = [{value : 'INFO', icon: 'glyphicon-info-sign'},
            {value : 'DEBUG', icon : 'glyphicon-ok-sign'},
            {value : 'ERROR', icon : 'glyphicon-remove-sign'},
            {value : 'WARN', icon : 'glyphicon-alert'}],
          sorting = { column: 'date', descending: true };

      expect(scope.watcherGroup).toEqual(watchers);
      expect(scope.currentPage).toBe(1);
      expect(scope.numPerPage).toBe(20);
      expect(scope.dateFormat).toBe('yyyy-MM-dd');
      expect(scope.errorLevels).toEqual(errorLevels);
      expect(scope.sorting).toEqual(sorting);
  });

  describe('Grid functionality', function(){

    it('should load the grid data', function () {
        expect(scope.logEntries).toBeUndefined();
        expect(scope.filteredLogEntries).toBeUndefined();
        $httpBackend.flush();
        expect(scope.logEntries.length).toBe(4);
        expect(scope.filteredLogEntries.length).toBe(4);
    });

    it('should set the total number of items', function(){
        expect(scope.totalItems).toBeUndefined();
        $httpBackend.flush();
        expect(scope.totalItems).toBe(4);
    });

    describe('Grid sorting', function(){

      it('should sort the table data by given column', function(){
        $httpBackend.flush();
        expect(scope.filteredLogEntries[0].userName).toBe('system');
        var sortedData = orderByFilter(scope.filteredLogEntries, 'userName');
        expect(sortedData[0].userName).toBe('admin');
      });

      it('should set the class name of the sorting direction icon', function(){
        expect(scope.sorting.column).toBe('date');
        expect(scope.sorting.descending).toBe(true);
        expect(scope.setSortedColumn('date')).toBe('glyphicon-menu-down');
      });

    });

    describe('Grid filtering', function(){

      it('should filter by user name', function(){
        $httpBackend.flush();
        var filteredData = filterByColumn(scope.filteredLogEntries, {'userName':'admin'});
        expect(filteredData.length).toBe(2);
        filteredData = filterByColumn(scope.filteredLogEntries, {'userName':'system'});
        expect(filteredData.length).toBe(2);

      });

      it('should filter by error level', function(){
        $httpBackend.flush();
        var filteredData = filterByColumn(scope.filteredLogEntries, {'logLevel':'WARN'});
        expect(filteredData.length).toBe(1);
        filteredData = filterByColumn(scope.filteredLogEntries, {'logLevel':'ERROR'});
        expect(filteredData.length).toBe(1);
        filteredData = filterByColumn(scope.filteredLogEntries, {'logLevel':'INFO'});
        expect(filteredData.length).toBe(1);
        filteredData = filterByColumn(scope.filteredLogEntries, {'logLevel':'DEBUG'});
        expect(filteredData.length).toBe(1);
      });

      it('should filter by process run reference', function(){
        $httpBackend.flush();
        var filteredData = filterByColumn(scope.filteredLogEntries, {'processRunRef':'2015042414493990200002'});
        expect(filteredData.length).toBe(2);
      });

      it('should filter by process name', function(){
        $httpBackend.flush();
        var filteredData = filterByColumn(scope.filteredLogEntries, {'processName':'LOAD_SAP_MD'});
        expect(filteredData.length).toBe(1);
      });

      it('should filter by message', function(){
        $httpBackend.flush();
        var filteredData = filterByColumn(scope.filteredLogEntries, {'message':'2 receive'});
        expect(filteredData.length).toBe(2);
      });

      it('should filter by multiple filter values', function(){
        $httpBackend.flush();
        var filteredData = filterByColumn(scope.filteredLogEntries, {'message':'2 receive','processName':'MONITOR_MESSAGES', 'userName':'system'});
        expect(filteredData.length).toBe(2);
      });

    });

    describe('Grid pagination', function(){

       it('should paginate all the results in 1 page', function(){
         $httpBackend.flush();
         var logsLength = scope.filteredLogEntries.length;
         expect(logsLength).toBe(4);
         expect(scope.numPerPage).toBe(20);
         expect(scope.paginate(scope.filteredLogEntries[logsLength-1])).toBe(true);
       });

    });
  });
});
