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

const list = ['dev', 'test,', 'pre', 'prd'];
let env = list[0];

if (__SERVER__) {
  env = __ENV__;
}
if (__CLIENT__) {
  const getCookie = function (name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return 0;
  };
  env = list[getCookie('_e')] || env;
}

const config = configs[env];

export default config;
