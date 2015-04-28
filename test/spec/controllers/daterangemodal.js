'use strict';

describe('Controller: DaterangemodalCtrl', function () {

  // load the controller's module
  beforeEach(module('AngularGridApp'));

  var DaterangemodalCtrl, scope,
    dateRange = {
      dateFilterStart: new Date(2015, 3, 20),
      dateFilterEnd: new Date(2015, 3, 21)
    },
    modalInstance = jasmine.createSpyObj('modalInstance', ['close', 'dismiss']);

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DaterangemodalCtrl = $controller('DaterangemodalCtrl', { $scope: scope, $modalInstance: modalInstance, dateRange : dateRange });
  }));

  it('should set default values', function(){
    var minDate = new Date(2014, 0, 1);
    expect(scope.dateFormat).toBe('yyyy-MM-dd');
    expect(scope.minDate.getTime()).toEqual(minDate.getTime());
  });

  it('should close the modal and pass the dates when clicking the "OK" button', function(){
    scope.ok();
    expect(modalInstance.close).toHaveBeenCalled();
    expect(modalInstance.close).toHaveBeenCalledWith({
      dateStart: scope.dateFilterStart,
      dateEnd: scope.dateFilterEnd
    });
  });

  it('should change the dates for the range when clicking the "OK" button ',function(){
      var dateStart = new Date(2015, 3, 20),
        dateEnd = new Date(2015, 3, 21);

      scope.ok();
      expect(scope.dateFilterStart.getTime()).toEqual(dateStart.getTime());
      expect(scope.dateFilterEnd.getTime()).toEqual(dateEnd.getTime());
  });

  it('should close the modal when clicking the "Cancel" button', function(){
      scope.cancel();
      expect(modalInstance.dismiss).toHaveBeenCalled();
      expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
  });

  it('should not pass the dates when the modal was closed through the "Cancel" button', function(){
      scope.cancel();
      expect(scope.dateFilterStart).toBeNull();
      expect(scope.dateFilterEnd).toBeNull();
  });

  it('should set the dates to NULL when clicking the "Clear" button', function(){
    scope.clear();
    expect(scope.dateFilterStart).toBeNull();
    expect(scope.dateFilterEnd).toBeNull();
  });

});
