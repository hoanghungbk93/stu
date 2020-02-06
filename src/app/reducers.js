import { combineReducers } from 'redux'
import AuthenReducer from '../modules/Authen/reducer'

const reducer = combineReducers({
  authen: AuthenReducer
})

export default reducer