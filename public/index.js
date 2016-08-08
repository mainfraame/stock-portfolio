'use strict';

import angular from 'angular';
import '@angular/router/angular1/angular_1_router';

import './assets/style.scss';
import './components/index';
import './views/index';

const app = angular.module('app', ['ngComponentRouter', 'components', 'views']);

app.component('app', require('./app'));
app.factory('stocksService', require('./services/stocks'));
app.factory('suggestionService', require('./services/suggestions'));
app.value('$routerRootComponent', 'app');

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);
}]).run();