import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { configureStore, DevTools, DevToolsInner } from './redux/store';
import routes from './route';

let initState;
if (window.__data) {
  initState = window.__data;
}
const store = configureStore(browserHistory, initState);
const history = syncHistoryWithStore(browserHistory, store);

const rootElement = document.getElementById('app');
render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  rootElement,
);

/**
 * TODO
 * 考虑移除redux-devtools依赖。开发时，使用官方提供的浏览器插件。
 */

if (DevTools && DevToolsInner) {
  const devtools = document.getElementById('devtools');
  render(
    <Provider store={store}>
      <DevTools />
    </Provider>,
    devtools,
  );
}
