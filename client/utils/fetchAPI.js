import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import qs from 'qs';

promise.polyfill();

let debug = false;
if (typeof __DEBUG__ !== 'undefined') {
  debug = __DEBUG__;
}

/**
 * API格式
 * {
 *   serviceName: {
 *     host: 'your.server.host.com or /your/server/path'
 *   }
 * }
 */
let API = {};
let services = [];

function _setServices(api) {
  const keys = Object.keys(api);
  if (keys.length) {
    services = keys;
    API = api;
  }
}

function _checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  return Promise.reject(error);
}

function _parseResponse(response) {
  return response.json();
}

// TODO 优化路径正则匹配
function _getURL({ url, server, path = '/' }) {
  const PATH = /^\/[0-9a-zA-Z]+/;
  const URL = /^(http:\/\/|https:\/\/|\/\/)/;

  // url为路径，_cors: false
  // url非地址，自动补全“//”。_cors: true
  if (url) {
    if (PATH.test(url)) {
      return {
        _url: url,
        _cors: false,
      };
    }
    if (!URL.test(url)) {
      return {
        _url: `//${url}`,
        _cors: true,
      };
    }
    return {
      _url: url,
      _cors: true,
    };
  }

  let _url;
  let _cors = false;
  const _host = ~services.indexOf(server) ? API[server].host : '';
  if (server && _host) {
    // _host为路径时，不补全
    // _host为地址时，_cors = true
    if (PATH.test(_host)) {
      _url = `${_host}${path}`;
    } else {
      // _host非地址，自动补全“//”
      if (!URL.test(_host)) {
        _url = `//${_host}${path}`;
      }
      _cors = true;
    }
  } else {
    _url = path;
  }

  return {
    _url,
    _cors,
  };
}

export { _setServices as setServices };

export const getURL = (...args) => {
  const { _url } = _getURL(...args);
  return _url;
};

/**
 * fetchAPI
 * 默认json规范接口调用。如非json规范，可以自行定义中间件，或使用isomorphic-fetch
 * 默认允许跨域请求和cookies跨域携带
 * TODO 增加querystring参数配置
 */
const fetchAPI = (options, { checkStatus, parseResponse, middlewares } = {}) => {
  const {
    url,
    server,
    path = '',
    method = 'GET',             // 支持 GET POST PUT ...
    mode,                       // 支持 no-cors(默认), cors, same-origin.
    isFormData = false,         // POST/PUT 表单提交方式
    withCredentials = true,     // 限制 credentials; credentials 支持 omit(默认), include, same-origin
                                // 注意: 这不会影响同站(same-site)请求.
    headers,
    data,
    success,
    error,
  } = options;

  const opts = {
    method: method.toUpperCase(),
  };
  if (mode) {
    opts.mode = mode;
  }

  // 配置请求地址
  const URL = _getURL({ url, server, path });
  let _url = URL._url;
  if (!URL._url) {
    throw new Error('Missing request address');
  }
  if (URL._cors && !mode) {
    opts.mode = 'cors';
  }

  // 配置请求cookies携带
  if (withCredentials) {
    opts.credentials = 'include';
  }

  // 配置请求头和请求体
  if (~['POST', 'PUT'].indexOf(opts.method) && data) {
    opts.body = data;
  }
  if (!isFormData) {
    // 耦合内部的接口配置默认请求头
    if (!url && headers !== false) {
      opts.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }
    if (headers) {
      opts.headers = Object.assign({}, opts.headers, headers);
    }
    if (opts.method === 'GET' && data) {
      const querystring = qs.stringify(data, { arrayFormat: 'repeat' });
      _url = `${URL._url}&${querystring}`.replace(/[&?]{1,2}/, '?');
    } else if (~['POST', 'PUT'].indexOf(opts.method) && data) {
      opts.body = JSON.stringify(opts.body);
    }
  }

  debug && console.debug('fetchAPI', _url, opts);

  let _promise = fetch(_url, opts)
    .then(checkStatus || _checkStatus)
    .then(parseResponse || _parseResponse);

  // 添加中间件
  if (middlewares instanceof Array && middlewares.length) {
    for (let i = 0; i < middlewares.length; i += 1) {
      if (typeof middlewares[i] === 'function') {
        _promise = _promise.then(middlewares[i]);
      }
    }
  }

  _promise = _promise.then(
    (json) => {
      debug && console.debug('fetchAPI _promise success');
      typeof success === 'function' && success(json);
      return json;
    },
    (reason) => {
      debug && console.debug('fetchAPI _promise fail', reason);
      typeof error === 'function' && error(reason);
      return Promise.reject(reason);
    },
  );

  return _promise;
};

['get', 'post', 'put'].forEach((method) => {
  fetchAPI[method] = (url, data, opts) => {
    if (typeof url === 'string') {
      return fetchAPI({
        method: method.toUpperCase(),
        url,
        data,
        ...opts,
      });
    }
    if (typeof url === 'object') {
      return fetchAPI({
        method: method.toUpperCase(),
        ...url,
      });
    }
    throw new Error('params error; need (url, data, opts) or (setting)');
  };
});

export { fetchAPI };

export const createFetchAPI = ({ options = {}, checkStatus, parseJSON, middlewares } = {}) => (opts) => {
  if (!(middlewares instanceof Array)) {
    middlewares = [middlewares];
  }
  return fetchAPI(Object.assign({}, options, opts), { checkStatus, parseJSON, middlewares });
};

// default fetch
export { fetch };
