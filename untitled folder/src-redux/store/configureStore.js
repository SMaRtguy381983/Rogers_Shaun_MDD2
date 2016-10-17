import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'

import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import reducer from '../reducers'
import syncOffline from './syncOffline'

const loggerMiddleware = createLogger({
  predicate: (getState, action) => {
    return __DEV__
  }
})

export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )

  const store = createStore(reducer, initialState, enhancer)

  syncOffline(store)

  return store
}
