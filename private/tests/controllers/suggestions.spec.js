const request = require('request');

process.env.NODE_ENV = 'test';

describe('Given the server starts', () => {
    let app;
    let suggestions;
    const port = 4000;

    beforeAll((done) => {
        app = require('../../src/app.js').listen(port, done);
    });

    afterAll(() => {
        app.close();
    });

    describe('When localhost:' + port + '/suggestions?term=mi GET is called', () => {

        beforeAll((done) => {
            request({
                url: 'http://localhost:' + port + '/suggestions?term=mi',
                method: 'GET',
                json: true
            }, (error, response, body) => {
                suggestions = body;
                done();
            });
        });

        it('Then returns an array of suggestions', () => {
            expect(Array.isArray(suggestions)).toEqual(true);
        });
    });
});