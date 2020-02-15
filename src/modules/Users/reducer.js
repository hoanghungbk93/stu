import { handleActions } from 'redux-actions'
// import I18n from 'i18n-js'
// import * as RNLocalize from 'react-native-localize'
// import RequestHandler from 'utils/RequestHandler'
import Model from './model'
// import { Authen } from '../../api'
// import TokenStore from 'utils/TokenStore'
// import Helpers from 'utils/Helpers'

import {
  LOADING,
  setLoading,
  ADD_USER_SUCCESS,
  EDIT_USER_SUCCESS,
  LIST_USER,
  setAddUserSuccess,
  setEditUserSuccess,
  setListUser
} from './action-type'
// import Constants from 'utils/Constants'
// import Storage from 'utils/Storage'
// import AsyncStorage from '@react-native-community/async-storage'

// const locales = RNLocalize.getLocales()

// I18n.locale = locales[0].languageTag

// I18n.fallbacks = true
// I18n.missingBehaviour = 'guess'
// I18n.defaultLocale = 'en'

const initialState = Model(null)

export const addUser = (header, params) => async dispatch => {
  // const data = await fetch('http://b8b12af8.ngrok.io/api/stuuser')
  dispatch(setAddUserSuccess(true))
}
export const editUser = (header, params) => async dispatch => {
  // const data = await fetch('http://b8b12af8.ngrok.io/api/stuuser')
  dispatch(setEditUserSuccess(true))
}
export const getListUser = (header, params) => async dispatch => {
  // const data = await fetch('http://b8b12af8.ngrok.io/api/stuuser')
  dispatch(setListUser([]))
}


const actions = {
  [LOADING]: (state, action) => state.setLoading(action.payload),
  [ADD_USER_SUCCESS]: (state, action) => state.setAddUserSuccess(action.payload),
  [EDIT_USER_SUCCESS]: (state, action) => state.setEditUserSuccess(action.payload),
  [LIST_USER]: (state, action) => state.setListUser(action.payload),
}

export default handleActions(actions, initialState)
