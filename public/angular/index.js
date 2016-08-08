'use strict';

import angular from 'angular';
import '@angular/router/angular1/angular_1_router';
import './assets/style.scss';

const app = angular.module('app', ['ngComponentRouter']);

app.component('app', require('./app'));
app.component('indicator', require('components/indicator'));
app.component('portfolio', require('views/portfolio'));
app.component('stockSuggestions', require('components/suggestions'));
app.factory('stocksService', require('services/stocks'));
app.factory('suggestionService', require('services/suggestions'));
app.value('$routerRootComponent', 'app');

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);
}]).run();