import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import Root from './root';

const rootElement = document.getElementById('app');

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Component history={browserHistory} />
    </AppContainer>,
    rootElement
  );
};

renderApp(Root);

if (module.hot) {
  module.hot.accept('./root', () => renderApp(Root));
}
