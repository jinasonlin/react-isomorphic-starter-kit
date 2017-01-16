import fetch from 'isomorphic-fetch'

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

export const fetchAPI = (options) => {
  const { isFormData = false, isSecret, isInclude = true, url, host = '', path = '', method = 'GET', data, success, error, ...others } = options;

  let opts = {
    method,
    type: 'cors',
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

  // 配置请求内容
  if (!!~['POST', 'PUT'].indexOf(method)) {
    opts.body = data;
  }
  if (!isFormData) {
    opts.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
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
