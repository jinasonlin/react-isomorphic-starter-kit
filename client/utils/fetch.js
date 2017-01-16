import fetch from 'isomorphic-fetch';

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

/**
 * fetch json accept api
 * 仅支持json规范接口调用，如非json规范，请使用isomorphic-fetch
 */
export const fetchAPI = (options) => {
  const {
    url,
    host = '',
    path = '',
    isFormData = false,   // POST/PUT 表单提交方式
    isSecret,             // 限制 http或https
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

  // 配置请求地址
  let protocol;
  if (typeof location === 'object') {
    protocol = location.protocol;
  }
  if (typeof isSecret !== 'undefined') {
    protocol = isSecret ? 'https:' : 'http';
  }

  let _url = url ? url : `${protocol}//${host}${path}`;

  // 配置请求cookies携带
  if (isInclude) {
    opts.credentials = 'include';
  }

  // 配置请求头和请求体
  if (!!~['POST', 'PUT'].indexOf(method)) {
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
    if (!!~['POST', 'PUT'].indexOf(method)) {
      opts.body = JSON.stringify(data);
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
