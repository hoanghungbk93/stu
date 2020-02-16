import { createAction } from 'redux-actions'
export const LOADING = 'Product/LOADING'
export const ADD_PRODUCT_SUCCESS = 'Product/ADD_PRODUCT_SUCCESS'
export const EDIT_PRODUCT_SUCCESS = 'Product/EDIT_PRODUCT_SUCCESS'
export const LIST_PRODUCT = 'Product/LIST_PRODUCT'
export const DELETE_SUCCESS = 'Product/DELETE_PRODUCT_SUCCESS'

export const setLoading = createAction(LOADING)
export const setDeleteSuccess = createAction(DELETE_SUCCESS)
export const setAddProductSuccess = createAction(ADD_PRODUCT_SUCCESS)
export const setEditProductSuccess = createAction(EDIT_PRODUCT_SUCCESS)
export const setListProduct = createAction(LIST_PRODUCT)