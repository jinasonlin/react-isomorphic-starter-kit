import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './redux/store';
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
  rootElement
);
