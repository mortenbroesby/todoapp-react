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

// {todos.map(todo =>
//   <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
// )}
const TodoList = ({ todos, onTodoClick }) => {
  if (!todos) return null
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
      return todos.filter(todo => todo.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed)
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
      dispatch({ type: 'TOGGLE_TODO', id })
    },
    onAddClick: (text) => {
      dispatch({ type: 'ADD_TODO', text })
    },
    onFilterClick: (filter) => {
      dispatch({ type: 'SET_VISIBILITY_FILTER', filter })
    }
  }
}

const TodoApp = ({ todos, visibilityFilter, onTodoClick, onAddClick, onFilterClick }) => (
  <div>
    <strong>Todos</strong>
    <TodoList
      todos={todos}
      onTodoClick={id => onTodoClick(id)} />
    <AddTodo onAddClick={text => onAddClick(text)} />
    <Footer
      visibilityFilter={visibilityFilter}
      onFilterClick={filter => onFilterClick(filter)}
    />
  </div>
)

const TodoMVC = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)

export default TodoMVC
