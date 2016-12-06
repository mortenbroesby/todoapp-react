import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import TodoMVC from './todomvc.jsx'

const initialState = {
  todos: [{ id: 123, text: 'hello', completed: false }]
}

import configureStore from './store';
const store = configureStore(initialState)

render(
  <Provider store={store}>
    <TodoMVC/>
  </Provider>,
  document.querySelector("#app")
)

if (module && module.hot) {
  module.hot.accept('./todomvc.jsx', () => {
    const TodoMVC = require('./todomvc.jsx').default
    render(
      <Provider store={store}>
        <TodoMVC/>
      </Provider>,
      document.querySelector("#app")
    )
  })
}

