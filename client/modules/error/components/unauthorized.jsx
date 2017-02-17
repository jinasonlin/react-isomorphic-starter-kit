import React, { Component, PropTypes } from 'react';
import './index.scss';

class UnauthorizedView extends Component {
  render() {
    return (
      <div className="error-tips">
        403 - unauthorized
      </div>
    );
  }
}

export default UnauthorizedView;
