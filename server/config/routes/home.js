import routes from 'modules/home/route';
import { serverRouteRender, pageRender } from '../render';

export default function (app) {
  app.get('/', (req, res) => res.redirect('/home'));
  app.get('/home', (...args) => {
    serverRouteRender({
      page: 'home',
      routes,
    }, ...args);
  });
  app.get('/home/server-render', (...args) => {
    serverRouteRender({
      page: 'home',
      routes,
    }, ...args);
  });
  app.get('/home/*', (...args) => {
    pageRender({
      page: 'home',
    }, ...args);
  });
}
