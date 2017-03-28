import React, { Component, PropTypes } from 'react';
import { Alert, Form, Input, Button } from 'dragon-ui';

export default class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      input: '',
    };
  }

  handleClick() {
    if (!this.state.input) {
      this._onClickOpen();
      return;
    }
    this.props.onAddClick(this.state.input);
    this.setState({
      input: '',
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
    return (
      <div>
        <Alert
          theme="warning"
          visible={this.state.alert}
          message="TODO something?"
          onClose={() => this._onClickClose('alert')}
          />
        <Form>
          <Form.Item>
            <Input value={this.state.input} onChange={(e) => { this.setState({ input: e.target.value }); }} />
          </Form.Item>
          <Form.Item>
            <Button theme="info" onClick={() => this.handleClick()}>Add</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired,
};
