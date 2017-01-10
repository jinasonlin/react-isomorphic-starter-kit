require('dotenv').config({ silent: true });

// babel registration (runtime transpilation for node)
require('./server.babel');

/**
 * Define isomorphic & server constants
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__ENV__ = process.env.DEPLOY_ENV || 'dev';
global.__DEVELOPMENT__ = global.__ENV__ === 'dev';
global.__ALLOW_ISOMORPHIC_PROXY__ = Boolean(process.env.ALLOW_ISOMORPHIC_PROXY);
global.__DEVTOOLS__ = Boolean(process.env.DEVTOOLS);
global.__DEBUG__ = Boolean(process.env.DEBUG);

var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack/webpack-isomorphic-tools'))
  .server(__dirname, function() {
    require('./server/server');
  });
