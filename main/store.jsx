import { createStore } from 'redux'
import { todoApp } from './reducers.jsx'

const ReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const configureStore = (initialState) => {
  const store = createStore(todoApp, initialState, ReduxDevTools)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
