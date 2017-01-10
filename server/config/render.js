import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

/**
 * data
 * 仅测试
 */

function proxyRender({ page, data }, req, res) {
  const assets = webpackIsomorphicTools.assets();

  let style = '';
  if (assets.styles[page]) {
    style = `<link rel=stylesheet href="${assets.styles[page]}" />`;
  }

  let script = '';
  if (data) {
    script = `window.__data = ${JSON.stringify(data)};`;
  }

  let scripts = '';
  if (assets.javascript.vendors) {
    scripts = `<script type="text/javascript" src="${assets.javascript.vendors}"></script>`;
  }
  if (assets.javascript[page]) {
    scripts = `${scripts}<script type="text/javascript" src="${assets.javascript[page]}"></script>`;
  }

  const view = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,minimal-ui">
        <meta name="format-detection" content="telephone=no, email=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-touch-fullscreen" content="yes">
        <title>众安在线</title>
        ${style}
      </head>
      <body>
        <div id="app"></div>
        <script type="text/javascript">${script}</script>
        ${scripts}
      </body>
    </html>
  `;
  res.send(view);
}

function pageRender({ page, data }, req, res) {
  if (__ALLOW_ISOMORPHIC_PROXY__) {
    return proxyRender({ page, data }, req, res);
  }

  let script = '';
  if (data) {
    script = `window.__data = ${JSON.stringify(data)};`;
  }
  res.render(page, {
    script
  });
}

function serverRouteRender({ page, store, routes, data }, req, res) {
  if (__ALLOW_ISOMORPHIC_PROXY__) {
    return pageRender({ page, data }, req, res);
  }

  let script = '';
  if (data) {
    script = `window.__data = ${JSON.stringify(data)};`;
  }

  let html = '';
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      if (store) {
        html = renderToString(
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>
        );
      } else {
        html = renderToString(<RouterContext {...props} />);
      }
      res.render(page, { html, script });
    } else {
      res.redirect('/404');
    }
  });
}

function serverStaticRender({ page, component, data }, req, res) {
  let script = '';
  if (data) {
    script = `window.__data = ${JSON.stringify(data)};`;
  }

  res.render(page, {
    html: component,
    script
  });
}

export { pageRender, serverRouteRender, serverStaticRender };
