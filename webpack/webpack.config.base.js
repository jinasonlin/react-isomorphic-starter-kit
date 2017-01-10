// Webpack base config
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var rootPath = path.resolve(__dirname, '..');

var config = {
  context: rootPath,
  entry: {
    'index': [
      './client/modules/home/index.js'
    ],
    'm': [
      './client/modules/m/index.js'
    ],
    'redux': [
      './client/modules/redux/index.js'
    ],
    'reduxPlus': [
      './client/modules/reduxPlus/index.js'
    ],
    'error': [
      './client/modules/error/index.js'
    ]
  },
  output: {
    path: rootPath + '/assets',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: 'file-loader?name=fonts/[name].[hash:8].[ext]'
      },
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors' }),
    // ignore webpack-stats.json with webpack-isomorphic-tools
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(process.env.DEPLOY_ENV || 'dev'),
      __CLIENT__: true,
      __SERVER__: false,
    })
  ]
};

for (var key in config.entry) {
  config.plugins.push(new HtmlWebpackPlugin({
    filename: 'views/' + key + '.html',
    template: './client/views/template.html',
    chunks: ['vendors', key]
  }));
}

module.exports = config;
