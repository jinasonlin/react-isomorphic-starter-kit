import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import { API } from 'config';

promise.polyfill();

const servies = new Set(Object.keys(API));

function _checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function _parseJSON(response) {
  return response.json();
}

// TODO(优化路径正则匹配)
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
  const _host = servies.has(server) ? API[server].host : '';
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

/**
 * fetch json accept api
 * json规范接口调用，如非json规范，请使用isomorphic-fetch
 * 默认允许跨域请求和cookies跨域携带
 */
export const fetchAPI = (options) => {
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
    method,
  };
  if (mode) {
    opts.mode = mode;
  }

  // 配置请求地址
  const { _url, _cors } = _getURL({ url, server, path });
  if (!_url) {
    throw new Error('Missing request address');
  }
  if (_cors && !mode) {
    opts.mode = 'cors';
  }

  // 配置请求cookies携带
  if (withCredentials) {
    opts.credentials = 'include';
  }

  // 配置请求头和请求体
  if (~['POST', 'PUT'].indexOf(method)) {
    opts.body = data;
  }
  if (!isFormData) {
    // 耦合的接口配置默认请求头，非必需
    // if (!url) {
    //   opts.headers = {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   };
    // }
    if (headers) {
      opts.headers = Object.assign({}, opts.headers, headers);
    }
    if (~['POST', 'PUT'].indexOf(method)) {
      opts.body = JSON.stringify(opts.body);
    }
  }

  __DEBUG__ && console.debug(_url, opts);

  return fetch(_url, opts)
    .then(_checkStatus)
    .then(_parseJSON)
    .then(
      (json) => {
        typeof success === 'function' && success(json);
        return json;
      },
      (e) => {
        typeof error === 'function' && error(e);
        throw e;
      },
    );
};

export const getURL = (...args) => {
  const { _url } = _getURL(...args);
  return _url;
};
