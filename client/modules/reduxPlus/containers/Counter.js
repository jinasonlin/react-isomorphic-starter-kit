import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { increment, decrement } from '../redux/actions';

class Counter extends Component {
  incrementIfOdd() {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement();
    }
  }

  incrementAsync() {
    setTimeout(this.props.onIncrement, 1000);
  }

  render() {
    const { value, onIncrement, onDecrement } = this.props;
    return (
      <p>
        Clicked: {value} times
        {' '}
        <button onClick={onIncrement}>
          +
        </button>
        {' '}
        <button onClick={onDecrement}>
          -
        </button>
        <br />
        <button onClick={this.incrementIfOdd}>
          Increment if odd
        </button>
        {' '}
        <button onClick={this.incrementAsync}>
          Increment async
        </button>
        <br />
        <Link to="/reduxPlus">TODO</Link>
      </p>
    );
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    value: state.counter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onIncrement() {
      dispatch(increment());
    },
    onDecrement() {
      dispatch(decrement());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
