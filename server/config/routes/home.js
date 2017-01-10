import { serverRouteRender, pageRender } from '../render';
import routes from '../../../client/modules/home/route';

export default function (app) {
  app.get('/home', (...args) => {
    serverRouteRender({
      page: 'index',
      routes
    }, ...args);
  });
  app.get('/home/server-render', (...args) => {
    serverRouteRender({
      page: 'index',
      routes
    }, ...args);
  });
  app.get('/home/*', (...args) => {
    pageRender({
      page: 'index'
    }, ...args);
  });
}
