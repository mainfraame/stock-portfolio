export default {
    bindings: {
        change: '='
    },
    template: `<i ng-class="{
        'glyphicon glyphicon-arrow-up green' : ($ctrl.parseFloat($ctrl.change) > 0),
        'glyphicon glyphicon-arrow-down red' : ($ctrl.parseFloat($ctrl.change) < 0),
    }"></i>`,
    controller () {
        this.parseFloat = parseFloat;
    }
};