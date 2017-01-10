import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';

const rootRoute = {
  path: '/home',
  component: require('../../components/App'),
  indexRoute: {
    component: require('./Home')
  },
  childRoutes: [
    {
      path: 'client-render',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./ClientRender'));
        });
      }
    },
    {
      path: 'server-render',
      component: require('./ServerRender')
    },
    {
      path: '*',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./NotFoundPage'));
        });
      }
      // onEnter: (nextState, replace) => location.replace('/404')
    }
  ]
}

export default rootRoute;
