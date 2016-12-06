import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import TodoAppConnected from './todoapp.jsx'

import configureStore from './store';
const store = configureStore()

render(
  <Provider store={store}>
    <TodoAppConnected/>
  </Provider>,
  document.querySelector("#app")
)

if (module && module.hot) {
  module.hot.accept('./todoapp.jsx', () => {
    const TodoAppConnected = require('./todoapp.jsx').default
    render(
      <Provider store={store}>
        <TodoAppConnected/>
      </Provider>,
      document.querySelector("#app")
    )
  })
}

