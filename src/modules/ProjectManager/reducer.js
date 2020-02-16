import { handleActions } from 'redux-actions'
// import I18n from 'i18n-js'
// import * as RNLocalize from 'react-native-localize'
// import RequestHandler from 'utils/RequestHandler'
import Model from './model'
// import { Authen } from '../../api'
// import TokenStore from 'utils/TokenStore'
// import Helpers from 'utils/Helpers'
import PROJECTApi from '../../api/PROJECT'
import {
  LOADING,
  setLoading,
  ADD_PROJECT_SUCCESS,
  EDIT_PROJECT_SUCCESS,
  LIST_PROJECT,
  setAddProjectSuccess,
  setEditProjectSuccess,
  setListProject
} from './action-type'

const initialState = Model(null)

export const addProject = (header, params) => async dispatch => {
  // const data = await fetch('http://b8b12af8.ngrok.io/api/stuPROJECT')
  dispatch(setAddProjectSuccess(true))
}
export const editProject = (header, params) => async dispatch => {
  console.log('editPROJECT params', params)
  try {
    debugger
    fetch(`http://f7abb73c.ngrok.io/api/stuPROJECT/updateProject`, {
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
  } catch (err) {
    dispatch(setEditProjectSuccess(false))
    dispatch(setLoading(false))
    console.log('err', err)
  }
}
export const resetEditProjectSucess = () => async dispatch => {

  dispatch(setEditProjectSuccess(null))

}
export const getListProject = (header, params) => async dispatch => {
  try {

    fetch(`http://f7abb73c.ngrok.io/api/stuPROJECT/getallProject`).then((response) => {
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
  [ADD_PROJECT_SUCCESS]: (state, action) => state.setAddPROJECTSuccess(action.payload),
  [EDIT_PROJECT_SUCCESS]: (state, action) => state.setEditPROJECTSuccess(action.payload),
  [LIST_PROJECT]: (state, action) => state.setListPROJECT(action.payload),
}

export default handleActions(actions, initialState)
