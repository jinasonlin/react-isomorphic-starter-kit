import fetch from 'isomorphic-fetch';
import { API } from 'config';

const servies = new Set(Object.keys(API));

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

function getURL({ url, isSecret, server, path = '/' }) {
  if (url) {
    return url;
  }

  let protocol;
  if (typeof location === 'object') {
    protocol = location.protocol;
  }
  if (typeof isSecret !== 'undefined') {
    protocol = isSecret ? 'https:' : 'http';
  }

  let _url;
  let _host = servies.has(server) ? API[server].host : '';
  if (server && _host) {
    let _port = API[server].port ? `:${API[server].port}` : '';
    _url = `${protocol}//${_host}${_port}${path}`;
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
    isSecret,             // 限制 http或https
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

  let opts = {
    method,
    mode,
    ...others
  };

  const _url = getURL({ url, isSecret, server, path });

  // 配置请求cookies携带
  if (isInclude) {
    opts.credentials = 'include';
  }

  // 配置请求头和请求体
  if (['POST', 'PUT'].includes(method)) {
    opts.body = data;
  }
  if (!isFormData) {
    if (!url) {
      opts.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
    } else {
      opts.headers = headers;
    }
    if (['POST', 'PUT'].includes(method)) {
      opts.body = JSON.stringify(opts.body);
    }
  }

  return fetch(_url, opts)
    .then(checkStatus)
    .then(parseJSON)
    .then(
      function (json) {
        typeof success === 'function' && success(json);
        return json;
      },
      function (e) {
        typeof error === 'function' && error(e);
        throw e;
      }
    );
}
