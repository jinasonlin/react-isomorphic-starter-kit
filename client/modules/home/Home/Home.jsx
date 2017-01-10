import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import API from '../../../config';

class Home extends Component{
  componentDidMount() {
    console.log('API config', API);
  }
  render() {
    return (
      <ul className="page-home">
        <li onClick={() => browserHistory.push('/home/server-render')}>ServerRender</li>
        <li onClick={() => browserHistory.push('/home/client-render')}>ClientRender</li>
      </ul>
    );
  }
}

export default Home;
