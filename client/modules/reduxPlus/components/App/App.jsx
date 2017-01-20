import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Mask } from 'dragon-ui';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        {this.props.children}
        <Mask visible={this.props.loading} />
      </div>
    );
  }
}

// export default App;
export default connect(state => ({
  loading: state.loading ? Boolean(state.loading.size) : false,
}))(App);
