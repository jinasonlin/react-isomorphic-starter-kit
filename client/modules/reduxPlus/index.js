import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { configureStore, DevTools } from './redux/store'
import routes from './route';

let initState;
if (window.__data) {
  initState = window.__data;
}
let store = configureStore(browserHistory, initState)
const history = syncHistoryWithStore(browserHistory, store)

let rootElement = document.getElementById('app')
render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  rootElement
)

if (__DEVELOPMENT__ && __DEVTOOLS__) {
  let devtools = document.getElementById('devtools')
  render(
    <Provider store={store}>
      <DevTools/>
    </Provider>,
    devtools
  )
}
