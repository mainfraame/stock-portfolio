const request = require('request');

process.env.NODE_ENV = 'test';

describe('Given the server starts', () => {
    let app;
    let quotes;
    const port = 4000;

    beforeAll((done) => {
        app = require('../../src/app.js').listen(port, done);
    });

    afterAll(() => {
        app.close();
    });

    describe('When localhost:' + port + '/quotes?symbol=aapl GET is called', () => {

        beforeAll((done) => {
            request({
                url: 'http://localhost:' + port + '/quotes?symbol=aapl',
                method: 'GET',
                json: true
            }, (error, response, body) => {
                quotes = body;
                done();
            });
        });

        it('Then returns an array', () => {
            expect(Array.isArray(quotes)).toEqual(true);
        });

        it('Then returns an array with a length of 1', function () {
            expect(quotes.length).toEqual(1);
        });
    });

    describe('When localhost:' + port + '/quotes?symbol=aapl,ab GET is called', () => {

        beforeAll((done) => {
            request({
                url: 'http://localhost:' + port + '/quotes?symbol=aapl,ab',
                method: 'GET',
                json: true
            }, (error, response, body) => {
                quotes = body;
                done();
            });
        });

        it('Then returns an array', () => {
            expect(Array.isArray(quotes)).toEqual(true);
        });

        it('Then returns an array with a length of 1', function () {
            expect(quotes.length).toEqual(2);
        });
    });
});