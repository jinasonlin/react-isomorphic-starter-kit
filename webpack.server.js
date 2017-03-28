require('dotenv').config({ silent: true });

const Express = require('express');
const webpack = require('webpack');

const webpackConfig = require('./webpack/webpack.config.dev');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const compiler = webpack(webpackConfig);
// const host = process.env.HOST || 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) + 1 : 8081;

const serverOptions = {
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

const app = new Express();

app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('*', (req, res, next) => {
  const paths = req.path.split('/');
  let rootPath = paths[1];
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
  const view = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,minimal-ui">
        <meta name="format-detection" content="telephone=no, email=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-touch-fullscreen" content="yes">
        <title>众安在线${rootPath}</title>
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

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});
