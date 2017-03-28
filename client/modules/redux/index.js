import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './redux/store';
import Root from './root';

let initState;
if (window.__data) {
  initState = window.__data;
}
const store = configureStore(browserHistory, initState);
const history = syncHistoryWithStore(browserHistory, store);

const rootElement = document.getElementById('app');

const renderApp = () => {
  render(
    <AppContainer>
      <Root {...{ store, history }} />
    </AppContainer>,
    rootElement
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./root', () => renderApp());
}
