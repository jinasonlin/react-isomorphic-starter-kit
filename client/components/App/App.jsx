import React, { Component, PropTypes } from 'react';
import Header from '../Header';
import Menu from '../Menu';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Header />
        <Menu />
        <div className="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
