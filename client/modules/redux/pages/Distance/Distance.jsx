import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Form, Input, Button, Alert } from 'dragon-ui';
import { calculate } from '../../redux/actions';
import './Distance.scss';

class Distance extends Component {
  constructor(props) {
    super(props);
    this.key = '627e2eacaaaa1b97b1e5712a007d8a58';
    this.state = {
      alert: false,
      work: '',
      home: '',
    };
  }

  onClick() {
    if (!this.state.work || !this.state.home) {
      this._onClickOpen();
      return;
    }
    this.props.calculate({
      key: this.key,
      work: this.state.work,
      home: this.state.home,
    });
  }

  _onClickOpen() {
    this.setState({
      alert: true,
    });
  }

  _onClickClose() {
    this.setState({
      alert: false,
    });
  }

  render() {
    const { distance } = this.props;
    return (
      <div className="container-distance">
        <Alert
          theme="warning"
          visible={this.state.alert}
          message="请输入要计算的地址"
          onClose={() => this._onClickClose('alert')}
          />
        <Form type="horizontal">
          <Form.Item
            label="思念的距离"
            labelCol="col-sm-2"
            controlCol="col-sm-8">
            「{distance}」
          </Form.Item>
          <Form.Item
            label="工作城市"
            labelCol="col-sm-2"
            controlCol="col-sm-8">
            <Input placeholder="请输入..." value={this.state.work} onChange={(e) => { this.setState({ work: e.target.value }); }} />
          </Form.Item>
          <Form.Item
            label="家乡"
            labelCol="col-sm-2"
            controlCol="col-sm-8">
            <Input placeholder="请输入..." value={this.state.home} onChange={(e) => { this.setState({ home: e.target.value }); }} />
          </Form.Item>
          <Form.Item
            label
            labelCol="col-sm-2"
            controlCol="col-sm-8">
            <Button theme="info" onClick={() => this.onClick()}>计算</Button>
          </Form.Item>
          <Form.Item
            label
            labelCol="col-sm-2"
            controlCol="col-sm-8">
            <Link to="/redux"><Button theme="success">TODO</Button></Link>
            <Link to="/redux/counter"><Button theme="warning">Counter</Button></Link>
          </Form.Item>
        </Form>
      </div>
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

