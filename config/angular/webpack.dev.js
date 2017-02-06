var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');

// Some helpers I use for all projects, don't really need them for this.
var PORT = process.env.CLIENT_PORT ? process.env.CLIENT_PORT : 3000;
var API_PORT = process.env.API_PORT ? process.env.API_PORT : 8081;
var API_BASE = `http://localhost:${API_PORT}/api`;

var webroot = path.join(path.resolve(__dirname), '..', '..', 'www', 'angular');
var srcroot = path.join(path.resolve(__dirname), '..', '..', 'src', 'angular');
var indexFilename = 'index.html';

var baseConfig = {
    context: srcroot,
    entry: {
        vendor: './app/vendor.ts',
        main: `./app/main.${process.env.NODE_ENV}.ts`
    },
    output: {
        path: webroot,
        filename: 'js/[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
        modulesDirectories: ['src', 'node_modules'],
        alias: {
            styles: 'styles'
        }
    },
    module: {
        preLoaders: [
            { test: /\.ts?$/, loader: 'angular2-template-loader' }
        ],
        loaders: [
            {
                test: /\.ts?$/,
                loader: 'ts',
                query: {

                    transpileOnly: true,
                    isolatedModules: true,
                    silent: true
                }
            },
            {
                test: /\.html$/,
                loader: 'html',
                exclude: [
                    /index\.html$/,
                    /index\.template\.html$/
                ]
            },
            // File loader will need to be reconfigured once we being loading assets beyond css
            {
                test: /\.(png|jpe?g|gif|woff|woff2|ttf|eot|ico|svg)$/,
                // loader: 'file?name=assets/[name].[hash].[ext]'
                loader: 'file?name=assets/[name].[ext]'
            },
            {
                test: /\.(svg)$/,
                loader: 'raw'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass')
            }
        ]
    },
    devServer: {
        port: PORT,
        host: '0.0.0.0',
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        outputPath: webroot
    },
    htmlLoader: {
        minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true,
        customAttrSurround: [
            [/#/, /(?:)/],
            [/\*/, /(?:)/],
            [/\[?\(?/, /(?:)/]
        ],
        customAttrAssign: [/\)?\]?=/],
        attrs: false
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),
        new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'vendor']
        }),
        new HtmlWebpackPlugin({
            template: './index.template.html',
            filename: indexFilename,
            port: PORT,
            apiPort: API_PORT,
            apiBase: API_BASE
        }),
    ]
}

var buildScripts = {
    start: path.join(path.resolve(__dirname),'webpack.on-build-start.sh'),
    end: path.join(path.resolve(__dirname),'webpack.on-build-end.sh'),
    exit: path.join(path.resolve(__dirname),'webpack.on-build-exit.sh'),
}
baseConfig.plugins.push(new WebpackShellPlugin({
    onBuildStart: [
        'echo "Webpack Start"',
        `sh ${buildScripts.start}`,
    ],
    onBuildEnd: [
        `sh ${buildScripts.end}`,
    ],
    onBuildExit: [
        `sh ${buildScripts.exit}`,
        'echo "Webpack Exit"',
    ]
}))

module.exports = baseConfig;