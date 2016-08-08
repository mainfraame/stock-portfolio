'use strict';

import angular from 'angular';
import '@angular/router/angular1/angular_1_router';

import './assets/style.scss';
import './components/index';
import './services/index';
import './views/index';

angular.module('app', ['ngComponentRouter', 'components', 'services', 'views'])
    .component('app', {
        template: `<ng-outlet></ng-outlet>`,
        $routeConfig: [
            {
                path: '/portfolio',
                name: 'Portfolio',
                component: 'portfolio',
                useAsDefault: true
            }
        ]
    })
    .value('$routerRootComponent', 'app')
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(false);
    }]).run();