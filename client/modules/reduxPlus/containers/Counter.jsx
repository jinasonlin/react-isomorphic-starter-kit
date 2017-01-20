import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Form, Button } from 'dragon-ui';
import { increment, decrement } from '../redux/actions';
import './index.scss';

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
      <Form type="horizontal" className="container-counter">
        <Form.Item
          label="Clicked"
          labelCol="col-sm-2"
          controlCol="col-sm-10">
          {value} times
        </Form.Item>
        <Form.Item
          label="加减"
          labelCol="col-sm-2"
          controlCol="col-sm-10">
          <Button theme="success" onClick={onIncrement}>+</Button>
          <Button theme="success" onClick={onDecrement}>-</Button>
        </Form.Item>
        <Form.Item
          label="附加"
          labelCol="col-sm-2"
          controlCol="col-sm-10">
          <Button theme="success" onClick={() => this.incrementIfOdd()}>Increment if odd</Button>
          <Button theme="success" onClick={() => this.incrementAsync()}>Increment async</Button>
        </Form.Item>
        <Form.Item
          label
          labelCol="col-sm-2"
          controlCol="col-sm-10">
          <Link to="/reduxPlus"><Button theme="success">TODO</Button></Link>
          <Link to="/reduxPlus/distance"><Button theme="warning">Distance</Button></Link>
        </Form.Item>
      </Form>
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
