'use strict';

import template from 'html!components/indicator.html';

module.exports = {
    template: template,
    bindings: {
        change: '='
    },
    controller: function () {
        this.parseFloat = parseFloat;
    }
};