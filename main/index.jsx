import React from 'react'
import ReactDOM from 'react-dom'
import styles from './index.css';
import configureStore from './store';

const store = configureStore()

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

let nextTodoId = 0
const TodoMVC = ({ todos, visibilityFilter }) => (
  <div>
    <strong>Todos</strong>
    <TodoList
      todos={
        getVisibleTodos(
          todos,
          visibilityFilter
        )
      }
      onTodoClick={id =>
        store.dispatch({
          type: 'TOGGLE_TODO',
          id
        })
      }
    />
    <AddTodo
      onAddClick={text =>
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text
        })
      }
    />
    <Footer
      visibilityFilter={visibilityFilter}
      onFilterClick={filter =>
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }
    />
  </div>
)

const renderReact = () => {
  ReactDOM.render(
    <TodoMVC {...store.getState()} />,
    document.querySelector("#app")
  )
}

store.subscribe(renderReact)
renderReact()