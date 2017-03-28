import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import config from 'config';

class Dashboard extends Component {
  componentDidMount() {
    console.info('API config', config.API);
  }

  render() {
    return (
      <ul className="page-dashboard">
        <li onClick={() => browserHistory.push('/home/tool')}>Tool</li>
        <li onClick={() => browserHistory.push('/home/server-render')}>ServerRender</li>
        <li onClick={() => browserHistory.push('/home/client-render')}>ClientRender</li>
      </ul>
    );
  }
}

export default Dashboard;
