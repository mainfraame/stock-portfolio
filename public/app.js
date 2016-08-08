'use strict';

module.exports = {
    template: '<ng-outlet class="col-md-12"></ng-outlet>',
    $routeConfig: [
        {path: '/portfolio', name: 'Portfolio', component: 'portfolio', useAsDefault: true}
    ]
};