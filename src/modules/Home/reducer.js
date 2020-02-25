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
  ADD_REQUIREMENT_SUCCESS,
  EDIT_REQUIREMENT_SUCCESS,
  LIST_REQUIREMENT,
  DELETE_SUCCESS,
  CANCEL_SUCCESS,
  APPROVE_SUCCESS,
  setApproveSuccess,
  setCancelSuccess,
  setDeleteSuccess,
  setAddRequirementSuccess,
  setEditRequirementSuccess,
  setListRequirement
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

export const addRequirement = (header, params) => async dispatch => {
  console.log('addRequirement params', params)
  try {
    debugger
    console.log('addRequirement params', params)
    fetch(`https://39af1d67.ngrok.io/api/stuyc/addyc`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        "Content-Type": 'application/json'
      },
      crossDomain: true
    }).then((response) => {
      debugger
      console.log('responseaa', response)
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    }).then((myJson) => {
      console.log('myJson', myJson)
      if (myJson) {
        dispatch(setAddRequirementSuccess(true))
        dispatch(setLoading(false))
      } else {
        dispatch(setAddRequirementSuccess(false))
        dispatch(setLoading(false))
      }
      console.log('myJson', myJson)
    }).catch(
      err => {
        dispatch(setAddRequirementSuccess(false))
        dispatch(setLoading(false))
        console.log('errr', err)
      }
    )
    // if(data[0].sta)
    // dispatch(setLoading(true))
  } catch (err) {
    dispatch(setAddRequirementSuccess(false))
    dispatch(setLoading(false))
    console.log('err', err)
  }
}
export const deleteRequirement = (header, requirementId) => async dispatch => {
  console.log('deleteRequirement ', requirementId)
  try {
    debugger
    fetch(`https://39af1d67.ngrok.io/api/sturequirement/deleterequirement/?id=${requirementId}`, {
      method: 'DELETE',
    }).then((response) => {
      debugger
      console.log('responseaa', response)
      if (!response.ok) throw new Error(response.status);
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
export const editRequirement = (header, params) => async dispatch => {
  try {
    debugger
    fetch(`https://39af1d67.ngrok.io/api/stuyc/updateyc`, {
      method: 'PUT',
      body: JSON.stringify(params),
      headers: {
        "Content-Type": 'application/json'
      }
    }).then((response) => {
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    }).then((myJson) => {
      console.log('myJson', myJson)
      if (myJson) {
        dispatch(setEditRequirementSuccess(true))
        dispatch(setLoading(false))
      } else {
        dispatch(setEditRequirementSuccess(false))
        dispatch(setLoading(false))
      }
      console.log('myJson', myJson)
    }).catch(
      err => {
        dispatch(setEditRequirementSuccess(false))
        dispatch(setLoading(false))
        console.log('errr', err)
      }
    )
    // if(data[0].sta)
    // dispatch(setLoading(true))
  } catch (err) {
    dispatch(setEditRequirementSuccess(false))
    dispatch(setLoading(false))
    console.log('err', err)
  }
}
export const resetEditRequirementSucess = () => async dispatch => {

  dispatch(setEditRequirementSuccess(null))

}
export const resetDeleteRequirementSuccess = () => async dispatch => {

  dispatch(setDeleteSuccess(null))

}
export const resetAddRequirementSucess = () => async dispatch => {

  dispatch(setAddRequirementSuccess(null))

}

export const resetApproveSucess = () => async dispatch => {

  dispatch(setApproveSuccess(null))

}
export const resetCancleSucess = () => async dispatch => {

  dispatch(setCancelSuccess(null))

}
export const getListRequirement = (header, userId) => async dispatch => {
  // const response = await UserApi.get('/api/stuuser');
  // console.log('getListUser response', response)
  // if(response){
  //   dispatch(setListUser(response))
  // }
  try {

    fetch(`https://39af1d67.ngrok.io/api/stuyc/getallyc`).then((response) => {
      console.log('response', response)
      return response.json();
    }).then((myJson) => {
      if (myJson[0]) {
        dispatch(setListRequirement(myJson))
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

export const approve = (header, params) => async dispatch => {
  console.log('setApproveSuccess params', params)
  try {
    debugger
    fetch(`https://39af1d67.ngrok.io/api/stuyc/updateyc`, {
      method: 'PUT',
      body: JSON.stringify(params),
      headers: {
        "Content-Type": 'application/json'
      },
    }).then((response) => {
      console.log('responseaa', response)
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    }).then((myJson) => {
      console.log('myJson', myJson)
      if (myJson) {
        dispatch(setApproveSuccess(true))
        dispatch(setLoading(false))
      } else {
        dispatch(setApproveSuccess(false))
        dispatch(setLoading(false))
      }
      console.log('myJson', myJson)
    }).catch(
      err => {
        dispatch(setApproveSuccess(false))
        dispatch(setLoading(false))
        console.log('errr', err)
      }
    )
    // if(data[0].sta)
    // dispatch(setLoading(true))
  } catch (err) {
    dispatch(setAddRequirementSuccess(false))
    dispatch(setLoading(false))
    console.log('err', err)
  }
}
export const cancel = (header, params) => async dispatch => {
  console.log('setCancelSuccess params', params)
  try {
    debugger
    fetch(`https://39af1d67.ngrok.io/api/stuuser/adduser`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        "Content-Type": 'application/json'
      },
      crossDomain: true
    }).then((response) => {
      debugger
      console.log('responseaa', response)
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    }).then((myJson) => {
      console.log('myJson', myJson)
      if (myJson) {
        dispatch(setCancelSuccess(true))
        dispatch(setLoading(false))
      } else {
        dispatch(setCancelSuccess(false))
        dispatch(setLoading(false))
      }
      console.log('myJson', myJson)
    }).catch(
      err => {
        dispatch(setCancelSuccess(false))
        dispatch(setLoading(false))
        console.log('errr', err)
      }
    )
    // if(data[0].sta)
    // dispatch(setLoading(true))
  } catch (err) {
    dispatch(setCancelSuccess(false))
    dispatch(setLoading(false))
    console.log('err', err)
  }
}
const actions = {
  [LOADING]: (state, action) => state.setLoading(action.payload),
  [ADD_REQUIREMENT_SUCCESS]: (state, action) => state.setAddRequirementSuccess(action.payload),
  [EDIT_REQUIREMENT_SUCCESS]: (state, action) => state.setEditRequirementSuccess(action.payload),
  [LIST_REQUIREMENT]: (state, action) => state.setListRequirement(action.payload),
  [DELETE_SUCCESS]: (state, action) => state.setDeleteSuccess(action.payload),
  [CANCEL_SUCCESS]: (state, action) => state.setCancelSuccess(action.payload),
  [APPROVE_SUCCESS]: (state, action) => state.setApproveSuccess(action.payload),
}

export default handleActions(actions, initialState)
