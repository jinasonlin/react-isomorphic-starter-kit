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
global.__ALLOW_ISOMORPHIC_PROXY__ = process.env.ALLOW_ISOMORPHIC_PROXY === 'true';
global.__DEVTOOLS__ = process.env.DEVTOOLS === 'true';
global.__DEBUG__ = process.env.DEBUG === 'true';

// sync DEPLOY_ENV 'prd' with NODE_ENV 'production'
if (global.__ENV__ === 'prd') {
  process.env.NODE_ENV = 'production';
}

var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack/webpack-isomorphic-tools'))
  .server(__dirname, function() {
    require('./server/server');
  });
