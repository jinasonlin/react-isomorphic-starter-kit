import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

function getDevTools() {
  let DevTools;
  let DevToolsInstrument;
  let DevToolsInner = true;
  if (__DEVELOPMENT__ && __DEVTOOLS__) {
    DevTools = createDevTools(
      <DockMonitor defaultIsVisible={false} toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
        <LogMonitor theme="tomorrow" preserveScrollTop={false} />
      </DockMonitor>,
    );
  }
  if (DevTools) {
    if (__CLIENT__ && window.devToolsExtension) {
      DevToolsInstrument = window.devToolsExtension();
      DevToolsInner = false;
    } else {
      DevToolsInstrument = DevTools.instrument();
    }
  }
  return { DevTools, DevToolsInstrument, DevToolsInner };
}

const { DevTools, DevToolsInstrument, DevToolsInner } = getDevTools();

export { DevTools, DevToolsInner };

export function configureStore(history, initialState) {
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [reduxRouterMiddleware, thunkMiddleware];

  let finalCreateStore;
  if (DevToolsInstrument) {
    finalCreateStore = compose(applyMiddleware(...middleware), DevToolsInstrument)(createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(createStore);
  }

  const reducers = require('./reducers');
  const store = finalCreateStore(reducers, initialState);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers'));
    });
  }

  return store;
}
