import { handleActions } from 'redux-actions'
// import I18n from 'i18n-js'
// import * as RNLocalize from 'react-native-localize'
// import RequestHandler from 'utils/RequestHandler'
import Model from './model'
// import { Authen } from '../../api'
// import TokenStore from 'utils/TokenStore'
// import Helpers from 'utils/Helpers'
// import fetchBase64 from 
import UserApi from '../../api/User'
import axios from 'axios'
import { triggerBase64Download } from 'react-base64-downloader';

import {
  LOADING,
  setLoading,
  ADD_REQUIREMENT_SUCCESS,
  EDIT_REQUIREMENT_SUCCESS,
  LIST_REQUIREMENT,
  DELETE_SUCCESS,
  CANCEL_SUCCESS,
  APPROVE_SUCCESS,
  LIST_NOTI,
  setListNoti,
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
import jsPDF  from "jspdf";

// Default export is a4 paper, portrait, using millimeters for units

const initialState = Model(null)

export const addRequirement = (header, params) => async dispatch => {
  // console.log('addRequirement params', params)
  try {
    fetch(`https://api.stu.vn/api/stuyc/addyc`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        "Content-Type": 'application/json'
      },
      crossDomain: true
    }).then((response) => {
      // console.log('responseaa addRequirement', response)
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    }).then((myJson) => {
      if (myJson) {
        dispatch(setAddRequirementSuccess({ success: true, listProduct: myJson._listvt }))
        dispatch(setLoading(false))
      } else {
        dispatch(setAddRequirementSuccess({ success: false, listProduct: [] }))
        dispatch(setLoading(false))
      }
    }).catch(
      err => {
        dispatch(setAddRequirementSuccess({ success: false, listProduct: [] }))
        dispatch(setLoading(false))
        console.log('errr', err)
      }
    )
    // if(data[0].sta)
    // dispatch(setLoading(true))
  } catch (err) {
    dispatch(setAddRequirementSuccess({ success: false, listProduct: [] }))
    dispatch(setLoading(false))
    console.log('err', err)
  }
}
export const deleteRequirement = (header, requirementId) => async dispatch => {
  // console.log('deleteRequirement ', requirementId)
  try {
    fetch(`https://api.stu.vn/api/sturequirement/deleterequirement/?id=${requirementId}`, {
      method: 'DELETE',
    }).then((response) => {
      // console.log('responseaa', response)
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    }).then((myJson) => {
      if (myJson) {
        dispatch(setDeleteSuccess(true))
        dispatch(setLoading(false))
      } else {
        dispatch(setDeleteSuccess(false))
        dispatch(setLoading(false))
      }
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
  // console.log('param', params)
  try {
    fetch(`https://api.stu.vn/api/stuyc/updateyc`, {
      method: 'PUT',
      body: JSON.stringify(params),
      headers: {
        "Content-Type": 'application/json'
      }
    }).then((response) => {
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    }).then((myJson) => {
      // console.log('myJson editRequirement', myJson)
      if (myJson) {
        dispatch(setEditRequirementSuccess(true))
        dispatch(setLoading(false))
      } else {
        dispatch(setEditRequirementSuccess(false))
        dispatch(setLoading(false))
      }
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

  dispatch(setAddRequirementSuccess({ success: null, listProduct: [] }))

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

export const getListNotification = (header, userId, department, isSubAdmin, isAdmin) => async dispatch => {
  // const response = await UserApi.get('/api/stuuser');
  // console.log('getListUser response', response)getallyc
  // if(response){
  //   dispatch(setListUser(response))
  const apiLink = ``

}
export const filterListRequirement = (name, searchKey, project, productName, selectedFromDate, selectedToDate, status, userName) => async dispatch => {
  // const response = await UserApi.get('/api/stuuser');
  // console.log('getListUser response', response)getallyc
  // if(response){
  //   dispatch(setListUser(response))
  const apiLink = `https://api.stu.vn/api/stuyc/getfilteryc?_dfrom=${selectedFromDate}&_dto=${selectedToDate}&_mda=${project}&_username=${userName}&_mvt=${searchKey}&_statusyc=${status}&_idusersearch=${name}`
  // }
  // console.log('apiLink', apiLink)
  // console.log('isAdmin', isAdmin)
  // console.log('isSubAdmin', isSubAdmin)
  try {

    fetch(apiLink).then((response) => {
      // console.log('response', response)
      return response.json();
    }).then((myJson) => {
      if (myJson[0]) {
        dispatch(setListRequirement(myJson))
        dispatch(setLoading(false))
      } else {
        dispatch(setListRequirement([]))
        dispatch(setLoading(false))
      }
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
export const getProjectList = (setProjectList) => async dispatch => {
  const apiLink = `https://api.stu.vn/api/studa/getallda`
 
  try {

    fetch(apiLink).then((response) => {
      // console.log('response getProjectList', response)
      return response.json();
    }).then((myJson) => {
      // console.log('response get project list ', myJson)
      if (myJson[0]) {
        setProjectList(myJson)
      } else {
        setProjectList([])
      }
    }).catch(
      err => {
        console.log('errr', err)
      }
    )
  } catch (err) {
    console.log('err', err)
  }

}
export const exportPDF = (params, setBase64) => async dispatch => {

  const apiLink = `https://api.stu.vn/api/pdfcreator/pxk?ph=${params}`
  // }
  // console.log('exportPDF apiLink', apiLink)
  try {

    fetch(apiLink).then( response => {
      // setBase64(response)
      return response.json()
      
    } )
    .then( blob =>{
      // console.log('blob', blob)
      const linkSource = `data:application/pdf;base64,${blob.pdfBase64}`;
      const downloadLink = document.createElement("a");
      const fileName = params + '.pdf';

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
      // }
    }) ;
  } catch (err) {
    console.log('err', err)
  }

}

export const approve = (header, params) => async dispatch => {
  // console.log('setApproveSuccess params', params)
  try {
    fetch(`https://api.stu.vn/api/stuyc/updateyc`, {
      method: 'PUT',
      body: JSON.stringify(params),
      headers: {
        "Content-Type": 'application/json'
      },
    }).then((response) => {
      // console.log('responseaa', response)
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    }).then((myJson) => {
      if (myJson) {
        dispatch(setApproveSuccess(true))
        dispatch(setLoading(false))
      } else {
        dispatch(setApproveSuccess(false))
        dispatch(setLoading(false))
      }
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
  // console.log('setCancelSuccess params', params)
  try {
    fetch(`https://api.stu.vn/api/stuyc/updateyc`, {
      method: 'PUT',
      body: JSON.stringify(params),
      headers: {
        "Content-Type": 'application/json'
      },
    }).then((response) => {
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    }).then((myJson) => {
      // console.log('myJson', myJson)
      if (myJson) {
        dispatch(setCancelSuccess(true))
        dispatch(setLoading(false))
      } else {
        dispatch(setCancelSuccess(false))
        dispatch(setLoading(false))
      }
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
  [LOADING]: (state, action) => { return { ...state, isLoading: action.payload } },
  [ADD_REQUIREMENT_SUCCESS]: (state, action) => { return { ...state, addRequirementSuccess: action.payload } },
  [EDIT_REQUIREMENT_SUCCESS]: (state, action) => { return { ...state, editRequirementSuccess: action.payload } },
  [LIST_REQUIREMENT]: (state, action) => { return { ...state, listRequirement: action.payload } },
  [DELETE_SUCCESS]: (state, action) => { return { ...state, deleteSuccess: action.payload } },
  [CANCEL_SUCCESS]: (state, action) => { return { ...state, cancelSuccess: action.payload } },
  [APPROVE_SUCCESS]: (state, action) => { return { ...state, approveSuccess: action.payload } },
  [LIST_NOTI]: (state, action) => { return { ...state, listNoti: action.payload.listNoti, totalNoti: action.payload.totalNoti } },
  // [REHYDRATE]: (state, action) => action.payload.requirement
}

export default handleActions(actions, initialState)
