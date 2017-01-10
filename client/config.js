import dev from '../config/env/dev';
import test from '../config/env/test';
import pre from '../config/env/pre';
import prd from '../config/env/prd';

const configs = {
  dev: Object.assign({}, dev),
  test: Object.assign({}, test),
  pre: Object.assign({}, pre),
  prd: Object.assign({}, prd),
};

const config = configs[__ENV__ || 'dev'];

export default config;