import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import counter from './counter';
import { visibilityFilter, todos } from './todos';

export default combineReducers({
  routing: routerReducer,
  counter,
  visibilityFilter,
  todos
});
