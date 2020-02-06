import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'

const middleware = compose(applyMiddleware(thunk, logger))

export default function configureStore() {
  return createStore(reducer, {}, middleware)
}
