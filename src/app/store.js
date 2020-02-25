import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import { createStore, applyMiddleware, compose } from 'redux'
import storage from 'redux-persist/lib/storage'
const middleware = compose(applyMiddleware(thunk, logger))
// const enhancers = [];
// if (isDevelopmentEnvironment()) {
//   const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

//   if (typeof devToolsExtension === 'function') {
//     enhancers.push(devToolsExtension());
//   }
// }
const persistConfig = {
  key: 'root',
  storage,
  version: 0,
  whitelist: ['authen']
}
const persistedReducer = persistReducer(persistConfig, reducer)
export default () => {
  let store = createStore(persistedReducer,undefined, middleware)
  let persistor = persistStore(store)
  return { store : store, persistor: persistor}
}