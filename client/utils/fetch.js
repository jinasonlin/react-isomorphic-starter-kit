import promise from 'es6-promise'
import fetch from 'isomorphic-fetch'
import { Toast } from 'dragon-mobile-ui';

promise.polyfill();

export const fetchJson = (options) => {

  // if (process.env.DEPLOY_ENV || 'dev' == 'dev' && options.url.indexOf('/api/crius/person/resource') > -1) {
  //   options.url = 'https://healthindex.wilddogio.com/' + options.url.replace(/\//g,"_");
  //   if (options.url.indexOf('?') > -1) {
  //     options.url = options.url.replace('?','.json?');
  //   } else {
  //     options.url += '.json'
  //   }
  // }

  const { url, type, data, ...others } = options;

  let opts = {
    ...others,
    method: type || 'get',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if (['POST', 'PUT'].indexOf(opts.method.toUpperCase()) >= 0) {
    opts.body = JSON.stringify(data)
  }

  fetch(url, opts)
    .then(resData => toJson(resData, opts))
    .then(resData => resHandler(resData, opts))
    // .catch(error => errorHandler(error, opts))
}

function toJson(resp, options) {
  if (resp.status >= 400) {
    return errorHandler(null, options, resp.status)
  }
  return resp.json()
}

// 请求成功处理
function resHandler(resData, options) { 

  if (resData.status && resData.status != 200) {
    return errorHandler(resData.error, options, resData.status);
  }

  if (!resData || resData.code > 20000) {
    options.error && options.error(resData)
    Toast.error(resData.message);
  } else {
    options.success && options.success(resData);
  }
}

// 异常处理
function errorHandler(error, options, status) {
  options.error && options.error(error);
  Toast.error(`网络异常，请稍后重试(${status})`)
}
