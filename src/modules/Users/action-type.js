import { createAction } from 'redux-actions'
export const LOADING = 'User/LOADING'
export const ADD_USER_SUCCESS = 'User/ADD_USER_SUCCESS'
export const EDIT_USER_SUCCESS = 'User/EDIT_USER_SUCCESS'
export const LIST_USER = 'User/LIST_USER'

export const setLoading = createAction(LOADING)
export const setAddUserSuccess = createAction(ADD_USER_SUCCESS)
export const setEditUserSuccess = createAction(EDIT_USER_SUCCESS)
export const setListUser = createAction(LIST_USER)