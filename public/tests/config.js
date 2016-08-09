import 'angular';
import 'angular-mocks/angular-mocks';

var context = require.context('./', true, /^\.\/.*\.spec\.js/);
context.keys().forEach(context);