import { combineReducers } from 'redux'
import AuthenReducer from '../modules/Authen/reducer'
import UserReducer from '../modules/Users/reducer'

const reducer = combineReducers({
  authen: AuthenReducer,
  user: UserReducer
})

export default reducer