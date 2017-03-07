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

// 测试和预发开启source-map
if (!!~['test', 'pre'].indexOf(process.env.DEPLOY_ENV)) {
  config.devtool = 'source-map';
  config.output.sourceMapFilename = 'source-map/[file].map';
}
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
          importLoaders: 1
        }
      },
      'postcss-loader',
      'sass-loader'
    ]
  })
});
config.plugins.push(
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        require('autoprefixer')
      ]
    }
  })
);
config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        "presets": ["react", ["es2015", { "modules": false }], "stage-0"],
        "plugins": [
          "transform-runtime",
          "syntax-dynamic-import"
        ]
      }
    }
  ]
});
config.plugins.push(
  new CleanPlugin([rootPath + '/assets'], { root: rootPath }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false,
    }
  })
);
config.plugins.push(
  new ExtractTextPlugin({
    filename: 'css/[name].[contenthash:8].css',
    allChunks: true 
  })
);
config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    },
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false,
    __DEBUG__: false
  })
);
config.plugins.push(
  // webpack-isomorphic-tools
  webpackIsomorphicToolsPlugin
);

module.exports = config;
