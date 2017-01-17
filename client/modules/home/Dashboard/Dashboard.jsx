import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import API from 'config';

class Dashboard extends Component{

  componentDidMount() {
    console.log('API config', API);
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
