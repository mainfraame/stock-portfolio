export default {
    bindings: {
        symbol: '='
    },
    template: `<img class="stock-logo" ng-src="{{$ctrl.src}}"/>`,
    controller: ['$http', function ($http) {

        $http.jsonp('http://www.xignite.com/xLogos.json/GetLogo?IdentifierType=Symbol&Identifier=' + this.symbol + '&_callback=JSON_CALLBACK')
            .then((response) => {
                this.src = response.data.URL;
            });
    }]
};