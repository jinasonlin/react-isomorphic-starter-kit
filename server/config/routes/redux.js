import { createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// redux plus
import { configureStore } from 'modules/redux/redux/store';
import routes from 'modules/redux/route';
import { decrement } from 'modules/redux/redux/actions';
import { pageRender, serverRouteRender } from '../render';

export default function (app) {
  app.get(['/redux', '/redux/*'], (req, ...args) => {
    const initData = {
      visibilityFilter: 'SHOW_ALL',
      counter: 8,
    };

    if (req.query.static) {
      pageRender({
        page: 'redux',
        data: initData,
      }, req, ...args);
    } else {
      const memoryHistory = createMemoryHistory(req.url);
      const store = configureStore(memoryHistory, initData);
      const history = syncHistoryWithStore(memoryHistory, store);

      store.dispatch(decrement());
      store.dispatch(decrement());

      serverRouteRender({
        page: 'redux',
        routes,
        history,
        store,
        data: store.getState(),
      }, req, ...args);
    }
  });
}
