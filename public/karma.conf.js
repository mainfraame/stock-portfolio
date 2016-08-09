'use strict';

module.exports = (config) => {
    config.set({
        browsers: ['PhantomJS'],
        coverageReporter: {
            dir: './dist/coverage/',
            type: 'html'
        },
        files: ['./tests/config.js'],
        frameworks: ['jasmine', 'es6-shim'],
        preprocessors: {
            './tests/config.js': ['webpack', 'sourcemap']
        },
        reporters: ['spec', 'coverage'],
        singleRun: true,
        webpack: {
            devtool: 'inline-source-map',
            module: {
                preLoaders: [
                    {
                        test: /\.js$/,
                        exclude: [
                            /node_modules/,
                            /\.spec\.js$/
                        ],
                        loader: 'isparta-instrumenter'
                    }
                ],
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        query: {
                            presets: ['es2015']
                        }
                    }
                ],
                resolve: {
                    extensions: ['', '.js', '.html'],
                    root: './'
                },
                htmlLoader: {
                    ignoreCustomFragments: [/\{\{.*?}}/]
                }
            }
        }
    });
};