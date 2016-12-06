import { createStore } from 'redux'
import { todoApp } from './reducers.jsx'
import { persistStore, autoRehydrate } from 'redux-persist'

const ReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const configureStore = () => {

  // Switch to Redux DevTools
  // const store = createStore(todoApp, undefined, ReduxDevTools)

  const store = createStore(todoApp, undefined, autoRehydrate())

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  persistStore(store)

  // Purge persistance using below:
  // persistStore(store).purge()

  return store
}

export default configureStore
