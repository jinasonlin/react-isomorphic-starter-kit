import React, { Component, PropTypes } from 'react';

export default class AddTodo extends Component {
  handleClick() {
    const node = this.input;
    const text = node.value.trim();
    this.props.onAddClick(text);
    node.value = '';
  }

  render() {
    return (
      <div>
        <input type="text" ref={(c) => { this.input = c; }} />
        <button onClick={() => this.handleClick()}>
          Add
        </button>
      </div>
    );
  }
}

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired,
};
