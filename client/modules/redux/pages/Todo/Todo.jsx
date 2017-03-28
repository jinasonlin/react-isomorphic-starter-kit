import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'dragon-ui';
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from '../../redux/actions';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

class Todo extends Component {
  render() {
    const { visibleTodos, visibilityFilter } = this.props;
    const { onAddClick, onTodoClick, onFilterChange } = this.props;
    return (
      <div className="container-todo">
        <AddTodo
          onAddClick={text =>
            onAddClick(text)
          }
          />
        <TodoList
          todos={visibleTodos}
          onTodoClick={id =>
            onTodoClick(id)
          }
          />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            onFilterChange(nextFilter)
          }
          />
        <div className="link">
          <Link to="/redux/counter"><Button theme="success">Counter</Button></Link>
          <Link to="/redux/distance"><Button theme="warning">Distance</Button></Link>
        </div>
      </div>
    );
  }
}

Todo.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE',
  ]).isRequired,
};

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
  }
}

function mapStateToProps(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddClick(text) {
      dispatch(addTodo(text));
    },
    onTodoClick(id) {
      dispatch(toggleTodo(id));
    },
    onFilterChange(nextFilter) {
      dispatch(setVisibilityFilter(nextFilter));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
