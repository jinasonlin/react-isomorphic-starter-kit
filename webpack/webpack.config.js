require('dotenv').config({ silent: true });

// Webpack config for creating the production bundle.
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config.base');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootPath = path.resolve(__dirname, '..');

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

// source-map
config.devtool = 'hidden-source-map';
config.output.sourceMapFilename = 'source-map/[file].map';
config.output.filename = 'js/[name].[chunkhash:8].js';
// config.output.publicPath = 'http://static.zhongan.com/website/health/mobile/assets/';
config.module.rules.push({
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      'postcss-loader',
      'sass-loader',
    ],
  }),
});
config.plugins.push(
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        require('autoprefixer'),
      ],
    },
  })
);
config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['react', ['es2015', { modules: false }], 'stage-0'],
        plugins: [
          'transform-runtime',
          'syntax-dynamic-import',
        ],
      },
    },
  ],
});
config.plugins.push(
  new CleanPlugin([`${rootPath}/assets`], { root: rootPath }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
    output: {
      comments: false,
    },
  })
);
config.plugins.push(
  new ExtractTextPlugin({
    filename: 'css/[name].[contenthash:8].css',
    allChunks: true,
  })
);
config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false,
    __DEBUG__: false,
  })
);
config.plugins.push(
  // webpack-isomorphic-tools
  webpackIsomorphicToolsPlugin
);

module.exports = config;
