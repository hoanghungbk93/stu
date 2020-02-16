import { combineReducers } from 'redux'
import AuthenReducer from '../modules/Authen/reducer'
import UserReducer from '../modules/Users/reducer'
import ProjectReducer from '../modules/Project/reducer'

const reducer = combineReducers({
  authen: AuthenReducer,
  user: UserReducer,
  project: ProjectReducer,
})

export default reducer