import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './app';
//import TodoMVC from './todomvc.jsx'

import configureStore from './store';
const store = configureStore()

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector("#app")
)

if (module && module.hot) {
  module.hot.accept('./app.jsx', () => {
    const TodoMVC = require('./app.jsx').default
    render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.querySelector("#app")
    )
  })
}

