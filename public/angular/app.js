'use strict';

import template from 'html!./app.html';

module.exports = {
    template: template,
    $routeConfig: [
        {path: '/portfolio', name: 'Portfolio', component: 'portfolio', useAsDefault: true}
    ]
};