import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Form, Input, Button } from 'dragon-ui';
import { calculate } from '../redux/actions';
import './index.scss';

class Distance extends Component {
  constructor(props) {
    super(props);
    this.key = '627e2eacaaaa1b97b1e5712a007d8a58';
    this.state = {
      work: '',
      home: '',
    };
  }

  onClick() {
    this.props.calculate({
      key: this.key,
      work: this.state.work,
      home: this.state.home,
    });
  }

  render() {
    const { distance } = this.props;
    return (
      <Form type="horizontal" className="container-distance">
        <Form.Item
          label="思念的距离"
          labelCol="col-sm-2"
          controlCol="col-sm-10">
          「{distance}」
        </Form.Item>
        <Form.Item
          label="工作城市"
          labelCol="col-sm-2"
          controlCol="col-sm-10">
          <Input placeholder="请输入..." onChange={(e) => { this.setState({ work: e.target.value }); }} />
        </Form.Item>
        <Form.Item
          label="家乡"
          labelCol="col-sm-2"
          controlCol="col-sm-10">
          <Input placeholder="请输入..." onChange={(e) => { this.setState({ home: e.target.value }); }} />
        </Form.Item>
        <Form.Item
          label
          labelCol="col-sm-2"
          controlCol="col-sm-10">
          <Button theme="info" onClick={() => this.onClick()}>计算</Button>
        </Form.Item>
        <Form.Item
          label
          labelCol="col-sm-2"
          controlCol="col-sm-10">
          <Link to="/reduxPlus"><Button theme="success">TODO</Button></Link>
          <Link to="/reduxPlus/counter"><Button theme="warning">Counter</Button></Link>
        </Form.Item>
      </Form>
    );
  }
}

Distance.propTypes = {
  calculate: PropTypes.func.isRequired,
};

export default connect(state => ({
  distance: state.distance,
}), {
  calculate,
})(Distance);

