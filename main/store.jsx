import { createStore } from 'redux'

import { todoApp } from './reducers.jsx'

const configureStore = (initialState) => {
  const store = createStore(todoApp, initialState)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
