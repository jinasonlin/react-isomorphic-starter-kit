import path from 'path';

import dev from '../../config/env/dev';
import test from '../../config/env/test';
import pre from '../../config/env/pre';
import prd from '../../config/env/prd';

const defaults = {
  root: path.join(__dirname, '/../..'),
};

const configs = {
  dev: Object.assign({}, dev, defaults),
  test: Object.assign({}, test, defaults),
  pre: Object.assign({}, pre, defaults),
  prd: Object.assign({}, prd, defaults),
};

const config = configs[process.env.DEPLOY_ENV || 'dev'];

export default config;
