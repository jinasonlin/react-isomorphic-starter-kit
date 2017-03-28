import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

let DevToolsInstrument;

if (__CLIENT__ && window.devToolsExtension) {
  DevToolsInstrument = window.devToolsExtension();
}

export default (history, initialState) => {
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [reduxRouterMiddleware, thunkMiddleware];

  let finalCreateStore;
  if (DevToolsInstrument) {
    finalCreateStore = compose(applyMiddleware(...middleware), DevToolsInstrument)(createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(createStore);
  }

  const store = finalCreateStore(reducers, initialState);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(reducers);
    });
  }

  return store;
};
