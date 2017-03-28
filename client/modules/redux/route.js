import App from './components/App';
import Todo from './pages/Todo';
import Counter from './pages/Counter';
import Distance from './pages/Distance';

const rootRoute = {
  path: '/redux',
  component: App,
  indexRoute: {
    component: Todo,
  },
  childRoutes: [
    {
      path: 'counter',
      component: Counter,
    },
    {
      path: 'distance',
      component: Distance,
    },
  ],
};

export default rootRoute;
