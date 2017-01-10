import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';

const rootRoute = {
  path: '/reduxPlus',
  component: require('../../components/App'),
  indexRoute: {
    component: require('./containers/App')
  },
  childRoutes: [
    {
      path: 'counter',
      component: require('./containers/Counter')
    }
  ]
}

export default rootRoute;
