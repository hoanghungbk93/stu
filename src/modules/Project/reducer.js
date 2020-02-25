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
  ADD_PROJECT_SUCCESS,
  EDIT_PROJECT_SUCCESS,
  LIST_PROJECT,
  DELETE_SUCCESS,
  setDeleteSuccess,
  setAddProjectSuccess,
  setEditProjectSuccess,
  setListProject
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

export const addProject = (header, params) => async dispatch => {
  console.log('addProject params', params)
  try {
    debugger
    fetch(`https://7be50d96.ngrok.io/api/studa/addnewda`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        "Content-Type": 'application/json'
      },
      crossDomain:true
    }).then((response) => {
      debugger
      console.log('responseaa', response)
      if(!response.ok) throw new Error(response.status);
      else return response.json();
    }).then((myJson) => {
      console.log('myJson', myJson)
      if (myJson) {
        dispatch(setAddProjectSuccess(true))
        dispatch(setLoading(false))
      } else {
        dispatch(setAddProjectSuccess(false))
        dispatch(setLoading(false))
      }
      console.log('myJson', myJson)
    }).catch(
      err => {
        dispatch(setAddProjectSuccess(false))
        dispatch(setLoading(false))
        console.log('errr', err)
      }
    )
    // if(data[0].sta)
    // dispatch(setLoading(true))
  } catch (err) {
    dispatch(setAddProjectSuccess(false))
    dispatch(setLoading(false))
    console.log('err', err)
  }
}
export const deleteProject = (header, projectId) => async dispatch => {
  console.log('deleteProject ', projectId)
  try {
    debugger
    fetch(`https://7be50d96.ngrok.io/api/studa/deleteda/?id=${projectId}`,{
      method: 'DELETE',
    }).then((response) => {
      debugger
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
export const editProject = (header, params) => async dispatch => {
  try {
    debugger
    fetch(`https://7be50d96.ngrok.io/api/studa/updateda`, {
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
        dispatch(setEditProjectSuccess(true))
        dispatch(setLoading(false))
      } else {
        dispatch(setEditProjectSuccess(false))
        dispatch(setLoading(false))
      }
      console.log('myJson', myJson)
    }).catch(
      err => {
        dispatch(setEditProjectSuccess(false))
        dispatch(setLoading(false))
        console.log('errr', err)
      }
    )
    // if(data[0].sta)
    // dispatch(setLoading(true))
  } catch (err) {
    dispatch(setEditProjectSuccess(false))
    dispatch(setLoading(false))
    console.log('err', err)
  }
}
export const resetEditProjectSucess = () => async dispatch => {

  dispatch(setEditProjectSuccess(null))

}
export const resetDeleteProjectSuccess = () => async dispatch => {

  dispatch(setDeleteSuccess(null))

}
export const resetAddProjectSucess = () => async dispatch => {

  dispatch(setAddProjectSuccess(null))

}
export const getListProject = (header, projectuserId) => async dispatch => {
  try {

    fetch(`https://7be50d96.ngrok.io/api/studa/getallda`).then((response) => {
      console.log('response', response)
      return response.json();
    }).then((myJson) => {
      if (myJson[0]) {
        dispatch(setListProject(myJson))
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
  } catch (err) {
    dispatch(setLoading(false))
    console.log('err', err)
  }
  
}


const actions = {
  [LOADING]: (state, action) => state.setLoading(action.payload),
  [ADD_PROJECT_SUCCESS]: (state, action) => state.setAddProjectSuccess(action.payload),
  [EDIT_PROJECT_SUCCESS]: (state, action) => state.setEditProjectSuccess(action.payload),
  [LIST_PROJECT]: (state, action) => state.setListProject(action.payload),
  [DELETE_SUCCESS]: (state, action) => state.setDeleteSuccess(action.payload),
}

export default handleActions(actions, initialState)
