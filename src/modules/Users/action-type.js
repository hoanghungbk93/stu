import { createAction } from 'redux-actions'
export const LOADING = 'User/LOADING'
export const ADD_USER_SUCCESS = 'User/ADD_USER_SUCCESS'
export const EDIT_USER_SUCCESS = 'User/EDIT_USER_SUCCESS'
export const LIST_USER = 'User/LIST_USER'
export const DELETE_SUCCESS = 'User/DELETE_SUCCESS'

export const setLoading = createAction(LOADING)
export const setDeleteSuccess = createAction(DELETE_SUCCESS)
export const setAddUserSuccess = createAction(ADD_USER_SUCCESS)
export const setEditUserSuccess = createAction(EDIT_USER_SUCCESS)
export const setListUser = createAction(LIST_USER)