import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import routes from './route';

ReactDOM.render(
  <Router routes={routes} history={browserHistory} />,
  document.getElementById('app')
);
