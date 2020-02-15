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
  APPROVE,
  CANCEL,
  setApprove,
  setCancel
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

export const approve = (header, params) => async dispatch => {
  const data = await fetch('http://b8b12af8.ngrok.io/api/stuuser')
  dispatch(setApprove(true))
}
export const cancel = (header, params) => async dispatch => {
  const data = await fetch('http://b8b12af8.ngrok.io/api/stuuser')
  dispatch(setCancel(data))
}


const actions = {
  [LOADING]: (state, action) => state.setLoading(action.payload),
  [APPROVE]: (state, action) => state.setApprove(action.payload),
  [CANCEL]: (state, action) => state.setCancel(action.payload),
}

export default handleActions(actions, initialState)
