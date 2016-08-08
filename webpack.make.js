'use strict';


//const webpack = require('webpack');
//const HtmlWebpackPlugin = require('html-webpack-plugin');


//'use strict';

// Modules
const path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function makeWebpackConfig(options) {
    /**
     * Environment type
     * BUILD is for generating minified builds
     * TEST is for generating test builds
     */
    var BUILD = !!options.BUILD;
    var TEST = !!options.TEST;

    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    var config = {
        sassLoader: {
            includePaths: [path.resolve('./node_modules/bootstrap/scss')]
        }
    };

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     * Should be an empty object if it's generating a test build
     * Karma will set this when it's a test build
     */
    if (TEST) {
        config.entry = {};
    } else {
        config.entry = path.resolve('./public/index.js');
    }

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     * Should be an empty object if it's generating a test build
     * Karma will handle setting it up for you when it's a test build
     */
    if (TEST) {
        config.output = {}
    } else {
        config.output = {
            // Absolute output directory
            //path: __dirname + '/dist',

            // Output path from the view of the page
            // Uses webpack-dev-server in development
            //publicPath: BUILD ? '/' : 'http://localhost:8080/',
            path: path.resolve('./dist'),
            filename: 'bundle.js'

            // Filename for entry points
            // Only adds hash in build mode
            //filename: BUILD ? '[name].[hash].js' : '[name].bundle.js',

            // Filename for non-entry points
            // Only adds hash in build mode
            //chunkFilename: BUILD ? '[name].[hash].js' : '[name].bundle.js'
        }
    }

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    if (TEST) {
        config.devtool = 'inline-source-map';
    } else if (BUILD) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'eval';
    }

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */

        // Initialize module
    config.module = {
        preLoaders: [
            //{
            //    test: /\.(js|jsx)$/, exclude: /(node_modules|bower_components|\/public\/tests)/,
            //    loader: 'istanbul-instrumenter'
            //}
        ],
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {test: /\.woff2$/, loader: 'url-loader?limit=10000&minetype=application/font-woff2'},
            {test: /\.woff$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
            {test: /\.ttf$/, loader: 'file-loader'},
            {test: /\.eot$/, loader: 'file-loader'},
            {test: /\.svg$/, loader: 'file-loader'}
        ],
        resolve: {
            alias: {
                controllers: path.resolve('./public/controllers'),
                components: path.resolve('./public/components'),
                services: path.resolve('./public/services'),
                views: path.resolve('./public/views')
            },
            extensions: ['', '.js', '.json', '.html'],
            root: path.resolve(__dirname)
        },
        htmlLoader: {
            ignoreCustomFragments: [/\{\{.*?}}/]
        }
    };

    // ISPARTA LOADER
    // Reference: https://github.com/ColCh/isparta-instrumenter-loader
    // Instrument JS files with Isparta for subsequent code coverage reporting
    // Skips node_modules and files that end with .test.js
    if (TEST) {
        config.module.preLoaders.push({
            test: /\.js$/,
            exclude: [
                /node_modules/,
                /\.test\.js$/,
                /\.spec\.js$/
            ],
            loader: 'isparta-instrumenter'
        })
    }

    // CSS LOADER
    // Reference: https://github.com/webpack/css-loader
    // Allow loading css through js
    //
    // Reference: https://github.com/postcss/postcss-loader
    // Postprocess your css with PostCSS plugins
    //var cssLoader = {
    //    test: /\.css$/,
    //    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    //    // Extract css files in production builds
    //    //
    //    // Reference: https://github.com/webpack/style-loader
    //    // Use style-loader in development for hot-loading
    //    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
    //};

    // Skip loading css in test mode
    //if (TEST) {
    //    // Reference: https://github.com/webpack/null-loader
    //    // Return an empty module
    //    cssLoader.loader = 'null'
    //}
    //
    //// Add cssLoader to the loader list
    //config.module.loaders.push(cssLoader);

    ///**
    // * PostCSS
    // * Reference: https://github.com/postcss/autoprefixer-core
    // * Add vendor prefixes to your css
    // */
    //config.postcss = [
    //    autoprefixer({
    //        browsers: ['last 2 version']
    //    })
    //];

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files
        // Disabled when in test mode or not in build mode
        //new ExtractTextPlugin('[name].[hash].css', {
        //    disable: !BUILD || TEST
        //})
    ];

    // Skip rendering index.html in test mode
    if (!TEST) {
        // Reference: https://github.com/ampedandwired/html-webpack-plugin
        // Render index.html
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        )
    }

    if (TEST) {
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': 'test'
                }
            })
        );
    }

    // Add build specific plugins
    if (BUILD) {
        config.plugins.push(
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            // Only emit files when there are no errors
            new webpack.NoErrorsPlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
            // Dedupe modules in the output
            new webpack.optimize.DedupePlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            // Minify all javascript, switch loaders to minimizing mode
            new webpack.optimize.UglifyJsPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve('./public/index.html')
            })
        )
    }

    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    config.devServer = {
        contentBase: './dist',
        stats: {
            modules: false,
            cached: false,
            colors: true,
            chunk: false
        }
    };

    return config;
};
//
//module.exports = {
//    output: {
//        path: path.resolve('./dist'),
//        filename: 'bundle.js'
//    },
//    module: {
//        //loaders: [
//        //    {
//        //        test: /.jsx?$/,
//        //        loader: 'babel-loader',
//        //        exclude: /node_modules/,
//        //        query: {
//        //            presets: ['es2015']
//        //        }
//        //    },
//        //    {
//        //        test: /\.scss$/,
//        //        loaders: ['style', 'css', 'sass']
//        //    },
//        //    {test: /\.woff2$/, loader: 'url-loader?limit=10000&minetype=application/font-woff2'},
//        //    {test: /\.woff$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
//        //    {test: /\.ttf$/, loader: 'file-loader'},
//        //    {test: /\.eot$/, loader: 'file-loader'},
//        //    {test: /\.svg$/, loader: 'file-loader'}
//        //]
//    },
//    //resolve: {
//    //    alias: {
//    //        controllers: path.resolve('./public/controllers'),
//    //        components: path.resolve('./public/components'),
//    //        services: path.resolve('./public/services'),
//    //        views: path.resolve('./public/views')
//    //    },
//    //    extensions: ['', '.js', '.html'],
//    //    root: path.resolve(__dirname)
//    //},
//    //sassLoader: {
//    //    includePaths: [path.resolve('./node_modules/bootstrap/scss')]
//    //},
//    //entry: path.resolve('./public/index.js'),
//    //plugins: [
//    //    new HtmlWebpackPlugin({
//    //        template: path.resolve('./public/index.html')
//    //    })
//    //],
//    //htmlLoader: {
//    //    ignoreCustomFragments: [/\{\{.*?}}/]
//    //}
//};