import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { browserHistory, Router } from 'react-router';
import routes from './route';
import todoApp from './reducers'

let initState;
if (window.__data) {
  initState = window.__data;
}
let store = createStore(todoApp, initState)

let rootElement = document.getElementById('app')
render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  rootElement
)