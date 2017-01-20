import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import loading from './loading';
import counter from './counter';
import { visibilityFilter, todos } from './todos';
import distance from './distance';

export default combineReducers({
  routing: routerReducer,
  loading,
  counter,
  visibilityFilter,
  todos,
  distance,
});
