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
  setLogin,
  LOGIN
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

export const login = () => async dispatch => {
  //login success
  // try{
  //   let response = await fetch('http://40b15634.ngrok.io/api/stuuser');
  //   if (response.ok) { // if HTTP-status is 200-299
  //     // get the response body (the method explained below)
  //     let json = await response.json();
  //     console.log('json', json)
  //   } else {
  //     alert("HTTP-Error: " + response.status);
  //   }
  //   // const data = fetch('http://b8b12af8.ngrok.io/api/stuuser').then(response => {
  //   //   console.log('response', response)
  //   // }).catch(
  //   //   err=> {
  //   //     console.log('errr', err)
  //   //   }
  //   // )
  //   // debugger
  //   dispatch(setLogin(true))
  //   // dispatch(setLoading(true))
  // } catch(err){
  //   console.log('err', err)
  // }
  dispatch(setLogin(true))
}


const actions = {
  [LOADING]: (state, action) => state.setLoading(action.payload),
  [LOGIN]: (state, action) => state.setLogin(action.payload),
}

export default handleActions(actions, initialState)
