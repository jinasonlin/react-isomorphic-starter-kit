require('dotenv').config({ silent: true });

// Webpack config for development
const webpack = require('webpack');
const config = require('./webpack.config.base');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) + 1 : 8081;

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

// 加载ALLOW_ISOMORPHIC参数，并配置; 仅基于webpack开发服务器
let hotClient = 'webpack-hot-middleware/client';
let publicPath = '/';
if (process.env.ALLOW_ISOMORPHIC_PROXY === 'true') {
  hotClient = `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`;
  publicPath = `http://${host}:${port}/`;
  config.plugins.push(
    // webpack-isomorphic-tools with development
    webpackIsomorphicToolsPlugin.development()
  );
}

config.devtool = 'eval-source-map';
// 为entry增加热加载
Object.keys(config.entry).forEach((key) => {
  config.entry[key].unshift(hotClient);
});
config.output.publicPath = publicPath;
config.module.rules.push({
  test: /\.scss$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
      },
    },
    'postcss-loader',
    'sass-loader',
  ],
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
  exclude: /(node_modules)/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['react', ['es2015', { modules: false }], 'stage-0', 'react-hmre'],
        plugins: [
          'transform-runtime',
          'syntax-dynamic-import',
        ],
      },
    },
  ],
});
config.plugins.push(
  new webpack.DefinePlugin({
    __DEVELOPMENT__: true,
    __DEVTOOLS__: process.env.DEVTOOLS !== 'false',
    __DEBUG__: process.env.DEBUG !== 'false',
  })
);
config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config;
