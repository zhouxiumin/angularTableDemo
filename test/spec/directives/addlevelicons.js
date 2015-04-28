'use strict';

describe('Directive: errorLevelIcon', function () {

  // load the directive's module
  beforeEach(module('AngularGridApp'));

  var $rootScope, $compile;

  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));


  it('should replace the <error-level-icon> tag with the appropriate icon content', function(){
    var iconContent = $compile('<error-level-icon></error-level-icon>')($rootScope);
    $rootScope.$digest();
  });

});
