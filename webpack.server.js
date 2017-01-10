require('dotenv').config({ silent: true });

var path = require('path');
var Express = require('express');
var webpack = require('webpack');

var webpackConfig = require('./webpack/webpack.config.dev');
var compiler = webpack(webpackConfig);
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var host = process.env.HOST || 'localhost';
var port = process.env.PORT ? Number(process.env.PORT) + 1 : 8081;

var serverOptions = {
  // contentBase: 'http://' + host + ':' + port,
  // quiet: true,
  noInfo: true,
  // hot: true,
  // inline: true,
  // lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  // stats: { colors: true }
};

var app = new Express();

app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));

app.get('*', function (req, res, next) {
  var rootPath = req.path.split('/')[1];
  if (rootPath === 'favicon.ico') {
    return next();
  }
  // 默认路径
  if (!rootPath) {
    rootPath = 'index';
  }
  // 限制路径名字长度，同时过滤类似hashid.hot-update.json等请求
  if (rootPath.length > 20) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'client/views', rootPath + '.html'));
});

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});
