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

app.get('/', function (req, res) {
  res.redirect('/home');
});

app.get('*', function (req, res, next) {
  var paths = req.path.split('/');
  var rootPath = paths[1];
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

  // 页面模版
  var view = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,minimal-ui">
        <meta name="format-detection" content="telephone=no, email=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-touch-fullscreen" content="yes">
        <title>众安在线${rootPath}</title>
        <script>(window.__setFontSize__=function(){document.documentElement.style.fontSize = Math.min(640, Math.max(document.documentElement.clientWidth, 320)) / 320 * 14 + 'px'})()</script>
      </head>
      <body>
        <div id="app"></div>
        <div id="devtools" />
        <script type="text/javascript" src="/js/vendors.js"></script>
        <script type="text/javascript" src="/js/${rootPath}.js"></script>
      </body>
    </html>
  `;
  res.send(view);
});

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});
