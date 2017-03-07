// Webpack base config
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var rootPath = path.resolve(__dirname, '..');

var config = {
  context: rootPath,
  entry: {
    'home': [
      './client/modules/home/index.js'
    ],
    'redux': [
      './client/modules/redux/index.js'
    ],
    'reduxPlus': [
      './client/modules/reduxPlus/index.js'
    ],
    'error_403': [
      './client/modules/error/403.js'
    ],
    'error_404': [
      './client/modules/error/404.js'
    ],
    'error_500': [
      './client/modules/error/500.js'
    ]
  },
  output: {
    path: rootPath + '/assets',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(rootPath, 'client'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.scss']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors' }),
    // ignore webpack-stats.json with webpack-isomorphic-tools
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
    })
  ]
};

var entry = process.env.ENTRY ? process.env.ENTRY.split(';') : [];
var entryFilter = process.env.ENTRYFILTER ? process.env.ENTRYFILTER.split(';') : [];

if (entry.length) {
  var _entry = {};
  for (var entryKey in config.entry) {
    if (~entry.indexOf(entryKey)) {
      _entry[entryKey] = config.entry[entryKey];
    }
  }
  config.entry = _entry;
}

if (entryFilter.length) {
  var _entry = {};
  for (var entryFilterKey in config.entry) {
    if (!~entryFilter.indexOf(entryFilterKey)) {
      _entry[entryFilterKey] = config.entry[entryFilterKey];
    }
  }
  config.entry = _entry;
}

for (var key in config.entry) {
  config.plugins.push(new HtmlWebpackPlugin({
    filename: 'views/' + key + '.html',
    template: './client/views/template.html',
    chunks: ['vendors', key]
  }));
}

module.exports = config;
