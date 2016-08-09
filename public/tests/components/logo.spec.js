import angular from 'angular';
import '../../src/components/index';

describe('Given StockLogo component is rendered', () => {
    let element;
    let scope;

    const testSymbol = 'AAPL';
    const response = {
        data: {
            URL: 'http://foo.com/bar.gif'
        }
    };
    const $http = {
        jsonp () {

        }
    };

    const getUrl = (symbol) => {
        return 'http://www.xignite.com/xLogos.json/GetLogo?IdentifierType=Symbol&Identifier=' + symbol + '&_callback=JSON_CALLBACK';
    };

    describe('When StockLogo is rendered with the given symbol property', () => {
        beforeEach(angular.mock.module('components', ($provide) => {
            $provide.value('$http', $http);
        }));
        beforeEach(angular.mock.inject(($rootScope, $compile, $q) => {
            spyOn($http, 'jsonp').and.returnValue($q.when(response));
            scope = angular.extend($rootScope.$new(), {
                symbol: testSymbol
            });
            element = angular.element('<stock-logo symbol="symbol"></stock-logo>');
            element = $compile(element)(scope);
            scope.$digest();
        }));

        it('Then the calls $http.jsonp with the correct url', () => {
            expect($http.jsonp).toHaveBeenCalledWith(getUrl(testSymbol));
        });

        it('Then sets the src on the img element', () => {
            expect(element.find('img').attr('src')).toEqual(response.data.URL);
        });
    });
});