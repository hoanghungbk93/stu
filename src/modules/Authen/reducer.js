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
  setUserInfo,
  USER_INFO,
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

export const login = (header, param) => async dispatch => {
  console.log('param', param)
  dispatch(setLoading(true))
  const params = JSON.stringify({
    _name : param.userName,
    _pass: param.password
  })
  
  try{
    
    fetch(`http://89061351.ngrok.io/api/stuuser/login?_name=${param.userName}&_pass=${param.password}`).then((response) => {
      if(!response.ok) throw new Error(response.status);
      else return response.json();
    }).then((myJson) => {
      if(myJson[0]){
        dispatch(setUserInfo(myJson[0]))
        dispatch(setLoading(false))
        dispatch(setLogin(true))
      } else{
        dispatch(setLogin(false))
        dispatch(setLoading(false))
      }
      console.log('myJson', myJson)
    }).catch(
      err=> {
        dispatch(setLogin(false))
        dispatch(setLoading(false))
        console.log('errr', err)
      }
    )
    // if(data[0].sta)
    // dispatch(setLoading(true))
  } catch(err){
    dispatch(setLogin(false))
    dispatch(setLoading(false))
    console.log('err', err)
  }
}


const actions = {
  [LOADING]: (state, action) => state.setLoading(action.payload),
  [LOGIN]: (state, action) => state.setLogin(action.payload),
  [USER_INFO]: (state, action) => state.setUserInfo(action.payload),
}

export default handleActions(actions, initialState)
