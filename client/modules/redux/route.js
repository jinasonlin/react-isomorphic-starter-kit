const rootRoute = {
  path: '/redux',
  component: require('./components/App'),
  indexRoute: {
    component: require('./pages/Todo'),
  },
  childRoutes: [
    {
      path: 'counter',
      component: require('./pages/Counter'),
    },
    {
      path: 'distance',
      component: require('./pages/Distance'),
    },
  ],
};

export default rootRoute;
