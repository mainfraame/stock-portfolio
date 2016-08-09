import angular from 'angular';
import routes from 'json!./routes.json';
import '@angular/router/angular1/angular_1_router';
import './assets/style.scss';
import './components/index';
import './services/index';
import './views/index';

angular.module('app', ['ngComponentRouter', 'components', 'services', 'views'])
    .component('app', {
        template: `<ng-outlet></ng-outlet>`,
        $routeConfig: routes
    })
    .value('$routerRootComponent', 'app')
    .run();