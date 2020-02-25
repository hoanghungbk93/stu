import { combineReducers } from 'redux'
import AuthenReducer from '../modules/Authen/reducer'
import UserReducer from '../modules/Users/reducer'
import ProjectReducer from '../modules/Project/reducer'
import ProductReducer from '../modules/Product/reducer'
import RequirementReducer from '../modules/Home/reducer'

const reducer = combineReducers({
  authen: AuthenReducer,
  user: UserReducer,
  product: ProductReducer,
  project: ProjectReducer,
  requirement: RequirementReducer
})

export default reducer