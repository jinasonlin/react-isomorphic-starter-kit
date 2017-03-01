import { createStore } from 'redux';
import { createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// redux
import routes from 'modules/redux/route';
import reducers from 'modules/redux/reducers';
import { increment } from 'modules/redux/actions';
// redux plus
import { configureStore } from 'modules/reduxPlus/redux/store';
import * as plusRoutes from 'modules/reduxPlus/route';
import { decrement } from 'modules/reduxPlus/redux/actions';
import { pageRender, serverRouteRender } from '../render';

export default function (app) {
  app.get(['/redux', '/redux/*'], (req, ...args) => {
    const initData = {
      todos: [{
        text: '1',
        completed: false,
      }],
      visibilityFilter: 'SHOW_ALL',
      counter: 8,
    };

    if (req.query.static) {
      pageRender({
        page: 'redux',
        data: initData,
      }, req, ...args);
    } else {
      const store = createStore(reducers, initData);

      store.dispatch(increment());

      serverRouteRender({
        page: 'redux',
        routes,
        store,
        data: store.getState(),
      }, req, ...args);
    }
  });
  app.get(['/reduxPlus', '/reduxPlus/*'], (req, ...args) => {
    const initData = {
      todos: [{
        text: '1',
        completed: false,
      }],
      visibilityFilter: 'SHOW_ALL',
      counter: 8,
    };

    if (req.query.static) {
      pageRender({
        page: 'reduxPlus',
        data: initData,
      }, req, ...args);
    } else {
      const memoryHistory = createMemoryHistory(req.url);
      const store = configureStore(memoryHistory, initData);
      const history = syncHistoryWithStore(memoryHistory, store);

      store.dispatch(decrement());

      serverRouteRender({
        page: 'reduxPlus',
        routes: plusRoutes,
        history,
        store,
        data: store.getState(),
      }, req, ...args);
    }
  });
}
