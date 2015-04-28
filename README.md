# Angular Table Demo


This application contains a Data table. 

It is implemented with the help of:
 
 * [AngularJs](https://angularjs.org/)
 * [Bootstrap](http://getbootstrap.com/)
 * [Bootstrap-ui](https://angular-ui.github.io/bootstrap/)

The table has the following features:
  
  * Filtering (by 1 column or multiple columns). Most filters are text values that you can enter in the header of the column. In order to filter by date range, you will use a modal window containing 2 Date-picker widgets from Bootstrap-ui.
  * Sorting (by 1 column). Clicking on the header title is triggering the sorting (asc/desc). The table entries are initially sorted by date - descending.
  * Pagination (using the Pagination widget from Bootstrap-ui.

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.11.1.

## Prerequisites

  In order to build this application you need the following:
  
  * [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  * [NodeJs and NPM](https://nodejs.org/download/)
  * [Grunt](http://gruntjs.com/getting-started)
  * [Bower](http://bower.io/)

## Build & development

 Run the following commands in your terminal:

  1. `git clone https://github.com/fchesaru/angularTableDemo.git`
  2. `cd angularTableDemo`
  3. `npm install`
  4. `bower install`
  5. `grunt` for building
  6. `grunt serve` for preview. A new browser tab will open automatically. 

## Testing

Running `grunt test` will run the unit tests with karma.
