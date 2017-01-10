import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';

const rootRoute = {
  path: '/m',
  component: require('../../components/App'),
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./AboutUs'));
      });
    }
  },
  childRoutes: [
    {
      path: 'aboutus',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./AboutUs'));
        });
      }
    },
    {
      path: '*',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./NotFoundPage'));
        });
      }
    }
  ]
}

export default rootRoute;
