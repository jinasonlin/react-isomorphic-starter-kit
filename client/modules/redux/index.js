import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { configureStore, DevTools } from './store';
import routes from './route';

let initState;
if (window.__data) {
  initState = window.__data;
}
const store = configureStore(initState);

const rootElement = document.getElementById('app');
render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  rootElement
);

if (DevTools) {
  const devtools = document.getElementById('devtools');
  render(
    <Provider store={store}>
      <DevTools />
    </Provider>,
    devtools
  );
}
