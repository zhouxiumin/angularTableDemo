"use strict";angular.module("AngularGridApp",["ngAnimate","ngMessages","ngResource","ngRoute","ngSanitize","ui.bootstrap","gridFilters"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/grid.html",controller:"GridCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("AngularGridApp").controller("GridCtrl",["$scope","$http","$filter","$modal",function(a,b,c,d){a.watcherGroup=["userNameFilter","errorLevelFilter","processRunRefFilter","processNameFilter","messageFilter","dateFilterStart","dateFilterEnd"],a.currentPage=1,a.numPerPage=20,a.dateFormat="yyyy-MM-dd",a.errorLevels=[{value:"INFO",icon:"glyphicon-info-sign"},{value:"DEBUG",icon:"glyphicon-ok-sign"},{value:"ERROR",icon:"glyphicon-remove-sign"},{value:"WARN",icon:"glyphicon-alert"}],a.sorting={column:"date",descending:!0},a.retrieveData=function(){b.get("data/logs.json").success(function(b){a.logEntries=b.data,a.filteredLogEntries=a.logEntries,a.totalItems=a.logEntries.length})},a.selectLevel=function(b){a.errorLevelFilter=b},a.retrieveData(),a.setSortedColumn=function(b){return a.sorting.column===b?a.sorting.descending?"glyphicon-menu-down":"glyphicon-menu-up":void 0},a.sort=function(b){var c=a.sorting;c.column===b?c.descending=!c.descending:(c.column=b,c.descending=!1)},a.paginate=function(b){var c,d,e;return c=(a.currentPage-1)*a.numPerPage,d=c+a.numPerPage,e=a.filteredLogEntries.indexOf(b),e>=c&&d>e},a.$watchGroup(a.watcherGroup,function(b){a.filteredLogEntries=c("filter")(a.logEntries,{userName:b[0],logLevel:b[1],processRunRef:b[2],processName:b[3],message:b[4]}),a.filteredLogEntries=c("dateRange")(a.filteredLogEntries,b[5],b[6]),a.totalItems=void 0!==a.filteredLogEntries?a.filteredLogEntries.length:0,a.currentPage=1}),a.openModal=function(b){var e={dateFilterStart:c("date")(a.dateFilterStart,a.dateFormat),dateFilterEnd:c("date")(a.dateFilterEnd,a.dateFormat)},f=d.open({templateUrl:"views/template-modal.html",controller:"DaterangemodalCtrl",size:b,resolve:{dateRange:function(){return e}}});f.result.then(function(b){a.dateFilterStart=b.dateStart,a.dateFilterEnd=b.dateEnd,a.dateFilter=c("formatDisplayedDateRange")(a.dateFilterStart,a.dateFilterEnd)},function(b){"cancel"===b&&(a.dateFilterStart=void 0,a.dateFilterEnd=void 0,a.dateFilter="")})}}]),angular.module("AngularGridApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);var gridFilters=angular.module("gridFilters",[]);gridFilters.filter("truncateString",["$filter",function(a){return function(b){return void 0!==b&&b.length>60?a("limitTo")(b,60,0)+"...":b}}]),gridFilters.filter("dateRange",function(){return function(a,b,c){var d=[];return angular.forEach(a,function(a){if(void 0!==b&&null!==b&&void 0!==c&&null!==c&&void 0!==a.date&&null!==a.date){var e=a.date.split(" ")[0];e+="T00:00:00Z";var f=new Date(e);f.setHours(0,0,0,0),typeof b!==Date&&(b=new Date(b)),typeof c!==Date&&(c=new Date(c)),f>=b&&c>=f&&d.push(a)}else d.push(a)}),d}}),gridFilters.filter("formatDisplayedDateRange",["$filter",function(a){return function(b,c){return void 0!==b&&null!==b&&void 0!==c&&null!==c?a("date")(b,"yyyy-MM-dd")+" - "+a("date")(c,"yyyy-MM-dd"):""}}]),angular.module("AngularGridApp").directive("errorLevelIcon",function(){return{templateUrl:"views/template-error-level.html",restrict:"AE"}}),angular.module("AngularGridApp").controller("DaterangemodalCtrl",["$scope","$modalInstance","dateRange",function(a,b,c){a.dateFormat="yyyy-MM-dd",a.minDate=new Date(2014,0,1),a.maxDate=new Date,a.dateFilterStart=c.dateFilterStart,a.dateFilterEnd=c.dateFilterEnd,a.ok=function(){b.close({dateStart:a.dateFilterStart,dateEnd:a.dateFilterEnd})},a.cancel=function(){b.dismiss("cancel")},a.clear=function(){a.clearDateFilterStart(),a.clearDateFilterEnd()},a.clearDateFilterStart=function(){a.dateFilterStart=null},a.clearDateFilterEnd=function(){a.dateFilterEnd=null},a.openDateFilterStart=function(b){b.preventDefault(),b.stopPropagation(),a.openedDateFilterStart=!0},a.openDateFilterEnd=function(b){b.preventDefault(),b.stopPropagation(),a.openedDateFilterEnd=!0}}]);