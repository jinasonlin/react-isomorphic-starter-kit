import React, { Component } from 'react';
import { Router } from 'react-router';
import routes from './route';

export default class Root extends Component {
  render() {
    const { history } = this.props;
    return (
      <Router routes={routes} history={history} />
    );
  }
}
