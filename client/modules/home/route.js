const rootRoute = {
  path: '/home',
  component: require('../../components/App'),
  indexRoute: {
    component: require('./pages/Dashboard'),
  },
  childRoutes: [
    {
      path: 'client-render',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/ClientRender'));
        });
      },
    },
    {
      path: 'server-render',
      component: require('./pages/ServerRender'),
    },
    {
      path: 'tool',
      component: require('./pages/Tool'),
    },
    {
      path: '*',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/NotFoundPage'));
        });
      },
      // onEnter: (nextState, replace) => location.replace('/404')
    },
  ],
};

export default rootRoute;
