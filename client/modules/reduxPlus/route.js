const rootRoute = {
  path: '/reduxPlus',
  component: require('../../components/App'),
  indexRoute: {
    component: require('./containers/Todo'),
  },
  childRoutes: [
    {
      path: 'counter',
      component: require('./containers/Counter'),
    },
    {
      path: 'distance',
      component: require('./containers/Distance'),
    },
  ],
};

export default rootRoute;
