import { handleActions } from 'redux-actions'
// import I18n from 'i18n-js'
// import * as RNLocalize from 'react-native-localize'
// import RequestHandler from 'utils/RequestHandler'
import Model from './model'
// import { Authen } from '../../api'
// import TokenStore from 'utils/TokenStore'
// import Helpers from 'utils/Helpers'
import UserApi from '../../api/User'
import {
  LOADING,
  setLoading,
  ADD_USER_SUCCESS,
  EDIT_USER_SUCCESS,
  LIST_USER,
  DELETE_SUCCESS,
  setDeleteSuccess,
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
  console.log('editUser params', params)
  try {
    fetch(`https://5f93e07a.ngrok.io/api/stuuser/adduser`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        "Content-Type": 'application/json'
      },
      crossDomain:true
    }).then((response) => {
      console.log('responseaa', response)
      if(!response.ok) throw new Error(response.status);
      else return response.json();
    }).then((myJson) => {
      console.log('myJson', myJson)
      if (myJson) {
        dispatch(setAddUserSuccess(true))
        dispatch(setLoading(false))
      } else {
        dispatch(setAddUserSuccess(false))
        dispatch(setLoading(false))
      }
      console.log('myJson', myJson)
    }).catch(
      err => {
        dispatch(setAddUserSuccess(false))
        dispatch(setLoading(false))
        console.log('errr', err)
      }
    )
    // if(data[0].sta)
    // dispatch(setLoading(true))
  } catch (err) {
    dispatch(setAddUserSuccess(false))
    dispatch(setLoading(false))
    console.log('err', err)
  }
}
export const deleteUser = (header, userId) => async dispatch => {
  console.log('deleteUser ', userId)
  try {
    fetch(`https://5f93e07a.ngrok.io/api/stuuser/deleteuser/?id=${userId}`,{
      method: 'DELETE',
    }).then((response) => {
      console.log('responseaa', response)
      if(!response.ok) throw new Error(response.status);
      else return response.json();
    }).then((myJson) => {
      console.log('myJson', myJson)
      if (myJson) {
        dispatch(setDeleteSuccess(true))
        dispatch(setLoading(false))
      } else {
        dispatch(setDeleteSuccess(false))
        dispatch(setLoading(false))
      }
      console.log('myJson', myJson)
    }).catch(
      err => {
        dispatch(setDeleteSuccess(false))
        dispatch(setLoading(false))
        console.log('errr', err)
      }
    )
    // if(data[0].sta)
    // dispatch(setLoading(true))
  } catch (err) {
    dispatch(setDeleteSuccess(false))
    dispatch(setLoading(false))
    console.log('err', err)
  }
}
export const editUser = (header, params) => async dispatch => {
  try {
    fetch(`https://5f93e07a.ngrok.io/api/stuuser/updateuser`, {
      method: 'PUT',
      body: JSON.stringify(params),
      headers: {
        "Content-Type": 'application/json'
      }
    }).then((response) => {
      if(!response.ok) throw new Error(response.status);
      else return response.json();
    }).then((myJson) => {
      console.log('myJson', myJson)
      if (myJson) {
        dispatch(setEditUserSuccess(true))
        dispatch(setLoading(false))
      } else {
        dispatch(setEditUserSuccess(false))
        dispatch(setLoading(false))
      }
      console.log('myJson', myJson)
    }).catch(
      err => {
        dispatch(setEditUserSuccess(false))
        dispatch(setLoading(false))
        console.log('errr', err)
      }
    )
    // if(data[0].sta)
    // dispatch(setLoading(true))
  } catch (err) {
    dispatch(setEditUserSuccess(false))
    dispatch(setLoading(false))
    console.log('err', err)
  }
}
export const resetEditUserSucess = () => async dispatch => {

  dispatch(setEditUserSuccess(null))

}
export const resetDeleteUserSuccess = () => async dispatch => {

  dispatch(setDeleteSuccess(null))

}
export const resetAddUserSucess = () => async dispatch => {

  dispatch(setAddUserSuccess(null))

}
export const getListUser = (header, userId) => async dispatch => {
  // const response = await UserApi.get('/api/stuuser');
  // console.log('getListUser response', response)
  // if(response){
  //   dispatch(setListUser(response))
  // }
  try {

    fetch(`https://5f93e07a.ngrok.io/api/stuuser/getalluser`).then((response) => {
      console.log('response', response)
      return response.json();
    }).then((myJson) => {
      if (myJson[0]) {
        dispatch(setListUser(myJson))
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }
      console.log('myJson', myJson)
    }).catch(
      err => {
        dispatch(setLoading(false))
        console.log('errr', err)
      }
    )
    // if(data[0].sta)
    // dispatch(setLoading(true))
  } catch (err) {
    dispatch(setLoading(false))
    console.log('err', err)
  }
  
}


const actions = {
  [LOADING]: (state, action) => {return {...state, isLoading: action.payload}},
  [ADD_USER_SUCCESS]: (state, action) => {return {...state, addUserSuccess: action.payload}},
  [EDIT_USER_SUCCESS]: (state, action) => {return {...state, editUserSuccess: action.payload}},
  [LIST_USER]: (state, action) => {return {...state, listUser: action.payload}},
  [DELETE_SUCCESS]: (state, action) => {return {...state, deleteSuccess: action.payload}},
}

export default handleActions(actions, initialState)
