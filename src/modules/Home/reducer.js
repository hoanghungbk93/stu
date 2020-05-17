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
import { REHYDRATE } from 'redux-persist';
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
    console.log('addRequirement params', params)
    fetch(`https://a8ecd4d7.ngrok.io/api/stuyc/addyc`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        "Content-Type": 'application/json'
      },
      crossDomain: true
    }).then((response) => {
      console.log('responseaa', response)
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    }).then((myJson) => {
      console.log('myJson', myJson)
      if (myJson) {
        dispatch(setAddRequirementSuccess({success : true, listProduct : myJson._listvt}))
        dispatch(setLoading(false))
      } else {
        dispatch(setAddRequirementSuccess({success : false, listProduct : []}))
        dispatch(setLoading(false))
      }
      console.log('myJson', myJson)
    }).catch(
      err => {
        dispatch(setAddRequirementSuccess({success : false, listProduct : []}))
        dispatch(setLoading(false))
        console.log('errr', err)
      }
    )
    // if(data[0].sta)
    // dispatch(setLoading(true))
  } catch (err) {
    dispatch(setAddRequirementSuccess({success : false, listProduct : []}))
    dispatch(setLoading(false))
    console.log('err', err)
  }
}
export const deleteRequirement = (header, requirementId) => async dispatch => {
  console.log('deleteRequirement ', requirementId)
  try {
    fetch(`https://a8ecd4d7.ngrok.io/api/sturequirement/deleterequirement/?id=${requirementId}`, {
      method: 'DELETE',
    }).then((response) => {
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
    fetch(`https://a8ecd4d7.ngrok.io/api/stuyc/updateyc`, {
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

  dispatch(setAddRequirementSuccess({success : null, listProduct : []}))

}

export const resetApproveSucess = () => async dispatch => {

  dispatch(setApproveSuccess(null))

}
export const resetCancleSucess = () => async dispatch => {

  dispatch(setCancelSuccess(null))

}

export const resetListRequirement = () => async dispatch => {

  dispatch(setListRequirement([]))

}
export const getListRequirement = (header, userId, department, isSubAdmin, isAdmin) => async dispatch => {
  // const response = await UserApi.get('/api/stuuser');
  // console.log('getListUser response', response)getallyc
  // if(response){
  //   dispatch(setListUser(response))
  const apiLink = isAdmin ? `https://a8ecd4d7.ngrok.io/api/stuyc/getallyc` : isSubAdmin ? `https://a8ecd4d7.ngrok.io/api/stuyc/getbybpyc?_bpyc=${department}` : `https://a8ecd4d7.ngrok.io/api/stuyc/getbyiduseryc?_iduseryc=${userId}`
  // }
  console.log('apiLink', apiLink)
  console.log('isAdmin', isAdmin)
  console.log('isSubAdmin', isSubAdmin)
  try {

    fetch(apiLink).then((response) => {
      console.log('response', response)
      return response.json();
    }).then((myJson) => {
      console.log('response getListRequirement', myJson)
      if (myJson[0]) {
        const temp = isAdmin ? myJson.filter(e => e.statusyc.trim() === 'Duyệt 1' || e.statusyc.trim() === 'Đã duyệt' || e.iduseryc === userId)  : 
        isSubAdmin ? myJson.filter(e => e.statusyc.trim() === 'Chờ duyệt' || e.statusyc.trim() === 'Duyệt 1') : myJson
        dispatch(setListRequirement(temp))
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
    fetch(`https://a8ecd4d7.ngrok.io/api/stuyc/updateyc`, {
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
    dispatch(setApproveSuccess(false))
    dispatch(setLoading(false))
    console.log('err', err)
  }
}
export const cancel = (header, params) => async dispatch => {
  console.log('setCancelSuccess params', params)
  try {
    fetch(`https://a8ecd4d7.ngrok.io/api/stuyc/updateyc`, {
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
  [LOADING]: (state, action) => {return {...state, isLoading: action.payload}},
  [ADD_REQUIREMENT_SUCCESS]: (state, action) => {return {...state, addRequirementSuccess: action.payload}},
  [EDIT_REQUIREMENT_SUCCESS]: (state, action) => {return {...state, editRequirementSuccess: action.payload}},
  [LIST_REQUIREMENT]: (state, action) => {return {...state, listRequirement: action.payload}},
  [DELETE_SUCCESS]: (state, action) => {return {...state, deleteSuccess: action.payload}},
  [CANCEL_SUCCESS]: (state, action) => {return {...state, cancelSuccess: action.payload}},
  [APPROVE_SUCCESS]: (state, action) => {return {...state, approveSuccess: action.payload}},
  // [REHYDRATE]: (state, action) => action.payload.requirement
}

export default handleActions(actions, initialState)
