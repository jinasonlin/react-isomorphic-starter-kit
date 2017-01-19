const rootRoute = {
  path: '/redux',
  component: require('../../components/App'),
  indexRoute: {
    component: require('./containers/App'),
  },
  childRoutes: [
    {
      path: 'counter',
      component: require('./containers/Counter'),
    },
  ],
};

export default rootRoute;
