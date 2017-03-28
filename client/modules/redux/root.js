import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './route';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router routes={routes} history={history} />
      </Provider>
    );
  }
}
