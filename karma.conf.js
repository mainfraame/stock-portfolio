var webpackConfig = Object.assign(require('./webpack.config.js'), require('./webpack.angular.config.js'));

module.exports = function (config) {
    config.set({

        // Add any browsers here
        browsers: ['Chrome'],
        frameworks: ['jasmine'],

        // The entry point for our test suite
        basePath: 'dist',
        autoWatch: false,
        files: [
            './webpack.tests.js'
            // all files ending in "_test"
            //{pattern: './webpack.tests.js', watched: false}
            //{pattern: 'test/**/*_test.js', watched: false}
            // each file acts as entry point for the webpack configuration
        ],

        preprocessors: {
            // add webpack as preprocessor
            './webpack.tests.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,
        client: {
            // log console output in our test console
            captureConsole: true
        },

        reporters: ['dots'],
        singleRun: true, // exit after tests have completed

        webpackMiddleware: {
            noInfo: false
        },

        // Webpack takes a little while to compile -- this manifests as a really
        // long load time while webpack blocks on serving the request.
        browserNoActivityTimeout: 60000 // 60 seconds
    });
};