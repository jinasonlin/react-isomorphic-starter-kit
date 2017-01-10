require('dotenv').config({ silent: true });

// Webpack config for creating the production bundle.
var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.base');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var rootPath = path.resolve(__dirname, '..');

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var babelLoaderQuery = require('../babel.json');
delete babelLoaderQuery.env;

config.devtool = 'source-map';
config.output.filename = 'js/[name].[chunkhash:8].js';
// config.output.publicPath = 'http://static.zhongan.com/website/health/mobile/assets/';
config.module.loaders.push({ 
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader')
});
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: babelLoaderQuery
});
config.plugins.push(
  new CleanPlugin([rootPath + '/assets'], { root: rootPath }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false,
    }
  })
);
config.plugins.push(new ExtractTextPlugin('css/[name].[contenthash:8].css', { allChunks: true }));
config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    },
    __DEVELOPMENT__: false,
    __DEBUG__: false
  })
);
config.plugins.push(
  // webpack-isomorphic-tools
  webpackIsomorphicToolsPlugin
);

module.exports = config;
