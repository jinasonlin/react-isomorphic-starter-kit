require('dotenv').config({ silent: true });

// Webpack config for development
var webpack = require('webpack');
var config = require('./webpack.config.base');

var host = process.env.HOST || 'localhost';
var port = process.env.PORT ? Number(process.env.PORT) + 1 : 8081;

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var babelConfig = require('../babel.json');

var babelrcObjectDevelopment = babelConfig.env && babelConfig.env.development || {};

// merge global and dev-only presets & plugins
var combinedPlugins = babelConfig.plugins || [];
var combinedPresets = babelConfig.presets || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);
combinedPresets = combinedPresets.concat(babelrcObjectDevelopment.presets);

// 加载ALLOW_ISOMORPHIC参数，并配置; 仅基于webpack开发服务器
var hotClient = 'webpack-hot-middleware/client';
var publicPath = '/';
if (process.env.ALLOW_ISOMORPHIC_PROXY === 'true') {
  hotClient = 'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr';
  publicPath = 'http://' + host + ':' + port + '/';
  config.plugins.push(
    // webpack-isomorphic-tools with development
    webpackIsomorphicToolsPlugin.development()
  );
}

var babelLoaderQuery = Object.assign({}, babelConfig, {
  presets: combinedPresets,
  plugins: combinedPlugins
});
delete babelLoaderQuery.env;

config.devtool = 'eval-source-map';
for (var key in config.entry) {
  // 为entry增加热加载
  config.entry[key].unshift(hotClient);
}
config.output.publicPath = publicPath;
config.module.loaders.push({ 
  test: /\.scss$/,
  loader: 'style-loader!css-loader?importLoaders=1!postcss-loader!sass-loader'
});
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: babelLoaderQuery
});
config.plugins.push(
  new webpack.DefinePlugin({
    __DEVELOPMENT__: true,
    __DEVTOOLS__: process.env.DEVTOOLS === 'true',
    __DEBUG__: process.env.DEBUG === 'true'
  })
);
config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config;
