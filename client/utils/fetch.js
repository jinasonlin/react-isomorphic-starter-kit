import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import { API } from 'config';

promise.polyfill();

const servies = new Set(Object.keys(API));

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

function getURL({ url, server, path = '/' }) {
  if (url) {
    if (!/^(http:\/\/|https:\/\/|\/\/)/.test(url)) {
      return `//${url}`;
    }
    return url;
  }

  let _url;
  const _host = servies.has(server) ? API[server].host : '';
  if (server && _host) {
    const _port = API[server].port ? `:${API[server].port}` : '';
    _url = `//${_host}${_port}${path}`;
  } else {
    _url = path;
  }

  return _url;
}

/**
 * fetch json accept api
 * json规范接口调用，如非json规范，请使用isomorphic-fetch
 */
export const fetchAPI = (options) => {
  const {
    url,
    server,
    path = '',
    isFormData = false,   // POST/PUT 表单提交方式
    isInclude = true,     // 限制 credentials; credentials 支持 omit, same-origin, or include
    method = 'GET',       // 支持 GET POST PUT ...
    mode = 'cors',        // 支持 cors, no-cors, or same-origin.
    headers,
    data,
    success,
    error,
    ...others
  } = options;

  const opts = {
    method,
    mode,
    ...others,
  };

  const _url = getURL({ url, server, path });
  if (!_url) {
    throw new Error('Missing request address');
  }

  // 配置请求cookies携带
  if (isInclude) {
    opts.credentials = 'include';
  }

  // 配置请求头和请求体
  if (~['POST', 'PUT'].indexOf(method)) {
    opts.body = data;
  }
  if (!isFormData) {
    if (!url) {
      opts.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }
    if (headers) {
      opts.headers = Object.assign({}, opts.headers, headers);
    }
    if (~['POST', 'PUT'].indexOf(method)) {
      opts.body = JSON.stringify(opts.body);
    }
  }

  return fetch(_url, opts)
    .then(checkStatus)
    .then(parseJSON)
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
