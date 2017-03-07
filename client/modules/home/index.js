import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import * as routes from './route';

ReactDOM.render(
  <Router routes={routes} history={browserHistory} />,
  document.getElementById('app'),
);
