// *Some* environments (phantomjs) don't have es5 (Function.prototype.bind)
require('babel-core/polyfill');

console.log('loaded!');
// this regex matches any js files in __tests__ directories
var context = require.context('.', true, /public\/angular\/tests\/.+\.js$/);
context.keys().forEach(context);