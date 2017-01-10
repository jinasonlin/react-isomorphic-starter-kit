import { createStore } from 'redux';
import { pageRender, serverRouteRender } from '../render';
import routes from '../../../client/modules/redux/route';
import todoApp from '../../../client/modules/redux/reducers';
import { increment, decrement } from '../../../client/modules/redux/actions'

export default function (app) {
  app.get('/redux|/redux/*', (req, ...args) => {
    const initData = {
      todos: [{
        text: "1",
        completed: false
      }],
      visibilityFilter: "SHOW_ALL",
      counter: 8
    };

    if (req.query.static) {
      pageRender({
        page: 'redux',
        data: initData
      }, req, ...args);
    } else {
      let store = createStore(todoApp, initData);

      store.dispatch(increment());

      serverRouteRender({
        page: 'redux',
        routes,
        store,
        data: store.getState()
      }, req, ...args);
    }
  });
}
