import React from 'react';
import { createStore } from 'redux';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

function getDevTools() {
  let devTools = null;
  if (__DEVELOPMENT__ && __DEVTOOLS__) {
    devTools = createDevTools(
      <DockMonitor defaultIsVisible={false} toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
        <LogMonitor theme="tomorrow" preserveScrollTop={false} />
      </DockMonitor>,
    );
  }
  return devTools;
}

const devTools = getDevTools();

export { devTools as DevTools };

export function configureStore(initialState) {
  let finalCreateStore = createStore;
  if (devTools) {
    finalCreateStore = devTools.instrument()(createStore);
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
