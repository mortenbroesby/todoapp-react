import React from 'react'
import ReactDOM from 'react-dom'
import styles from './index.css'
import { connect } from 'react-redux'

const Todo = ({ onClick, completed, text }) => (
  <li onClick={onClick} >
    <span className={completed ? styles.linethrough : null}>
      {text}
    </span>
  </li>
)

const TodoList = ({ todos, onTodoClick }) => {
  return (
    <div>
      {todos.map(todo =>
        <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
      )}
    </div>
  )
}

const AddTodo = ({ onAddClick }) => {
  let input
  return (
    <div>
      <input ref={node => { input = node }} />
      <button onClick={() => {
        input.value ? onAddClick(input.value) : false
        input.value = ''
      }}>
        ADD
      </button>
    </div>
  )
}

const FilterLink = ({ filter, currentFilter, children, onClick }) => {
  return (
    <button onClick={e => { onClick(filter) }}>
      {children}
    </button>
  )
}

const Footer = ({ visibilityFilter, onFilterClick }) => (
  <div>
    <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter} onClick={onFilterClick}>ALL</FilterLink>
    <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter} onClick={onFilterClick}>ACTIVE</FilterLink>
    <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter} onClick={onFilterClick}>COMPLETED</FilterLink>
  </div>
)

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      )
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      )
  }
}

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

let nextTodoId = 0
const TodoApp = ({ todos, visibilityFilter }) => (
  <div>
    <strong>Todos</strong>
  </div>
)

const TodoMVC = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)

export default TodoMVC
