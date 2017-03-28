import App from '../../components/App';
import Dashboard from './pages/Dashboard';
import Server from './pages/ServerRender';
import Tool from './pages/Tool';

const rootRoute = {
  path: '/home',
  component: App,
  indexRoute: {
    component: Dashboard,
  },
  childRoutes: [
    {
      path: 'client-render',
      getComponent(location, cb) {
        import('./pages/ClientRender')
          .then(module => {
            return cb(null, module.default)
          })
          .catch(e => {
            return cb(e);
          });
      },
    },
    {
      path: 'server-render',
      component: Server,
    },
    {
      path: 'tool',
      component: Tool,
    },
    {
      path: '*',
      getComponent(location, cb) {
        import('./pages/NotFoundPage')
          .then(module => {
            return cb(null, module.default)
          })
          .catch(e => {
            return cb(e);
          });
      },
    },
  ],
};

export default rootRoute;
