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
  ADD_PRODUCT_SUCCESS,
  EDIT_PRODUCT_SUCCESS,
  LIST_PRODUCT,
  DELETE_SUCCESS,
  setDeleteSuccess,
  setAddProductSuccess,
  setEditProductSuccess,
  setListProduct
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

export const addProduct = (header, params) => async dispatch => {
  try {
    fetch(`https://api.stu.vn/api/stuvt/addvt`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        "Content-Type": 'application/json'
      },
      crossDomain:true
    }).then((response) => {
      if(!response.ok) throw new Error(response.status);
      else return response.json();
    }).then((myJson) => {
      if (myJson) {
        dispatch(setAddProductSuccess(true))
        dispatch(setLoading(false))
      } else {
        dispatch(setAddProductSuccess(false))
        dispatch(setLoading(false))
      }
    }).catch(
      err => {
        dispatch(setAddProductSuccess(false))
        dispatch(setLoading(false))
        console.log('errr', err)
      }
    )
    // if(data[0].sta)
    // dispatch(setLoading(true))
  } catch (err) {
    dispatch(setAddProductSuccess(false))
    dispatch(setLoading(false))
    console.log('err', err)
  }
}
export const deleteProduct = (header, ProductId) => async dispatch => {
  try {
    fetch(`https://api.stu.vn/api/stuvt/deletevt/?id=${ProductId}`,{
      method: 'DELETE',
    }).then((response) => {
      if(!response.ok) throw new Error(response.status);
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
export const editProduct = (header, params) => async dispatch => {
  try {
    fetch(`https://api.stu.vn/api/stuvt/updatevt`, {
      method: 'PUT',
      body: JSON.stringify(params),
      headers: {
        "Content-Type": 'application/json'
      }
    }).then((response) => {
      if(!response.ok) throw new Error(response.status);
      else return response.json();
    }).then((myJson) => {
      if (myJson) {
        dispatch(setEditProductSuccess(true))
        dispatch(setLoading(false))
      } else {
        dispatch(setEditProductSuccess(false))
        dispatch(setLoading(false))
      }
    }).catch(
      err => {
        dispatch(setEditProductSuccess(false))
        dispatch(setLoading(false))
        console.log('errr', err)
      }
    )
    // if(data[0].sta)
    // dispatch(setLoading(true))
  } catch (err) {
    dispatch(setEditProductSuccess(false))
    dispatch(setLoading(false))
    console.log('err', err)
  }
}
export const resetEditProductSucess = () => async dispatch => {

  dispatch(setEditProductSuccess(null))

}
export const resetDeleteProductSuccess = () => async dispatch => {

  dispatch(setDeleteSuccess(null))

}
export const resetAddProductSucess = () => async dispatch => {

  dispatch(setAddProductSuccess(null))

}
export const getListProduct = (header, ProductuserId) => async dispatch => {
  try {

    fetch(`https://api.stu.vn/api/stuvt/getallvt`).then((response) => {
      return response.json();
    }).then((myJson) => {
      if (myJson[0]) {
        dispatch(setListProduct(myJson))
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }
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
  [LOADING]: (state, action) => {return {...state, isLoading: action.payload}},
  [ADD_PRODUCT_SUCCESS]: (state, action) => {return {...state, addProductSuccess: action.payload}},
  [EDIT_PRODUCT_SUCCESS]: (state, action) => {return {...state, editProductSuccess: action.payload}},
  [LIST_PRODUCT]: (state, action) => {return {...state, listProduct: action.payload}},
  [DELETE_SUCCESS]: (state, action) => {return {...state, deleteSuccess: action.payload}},
}

export default handleActions(actions, initialState)
