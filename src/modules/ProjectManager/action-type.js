import { createAction } from 'redux-actions'
export const LOADING = 'PROJECT/LOADING'
export const ADD_PROJECT_SUCCESS = 'PROJECT/ADD_PROJECT_SUCCESS'
export const EDIT_PROJECT_SUCCESS = 'PROJECT/EDIT_PROJECT_SUCCESS'
export const LIST_PROJECT = 'PROJECT/LIST_PROJECT'

export const setLoading = createAction(LOADING)
export const setAddProjectSuccess = createAction(ADD_PROJECT_SUCCESS)
export const setEditProjectSuccess = createAction(EDIT_PROJECT_SUCCESS)
export const setListProject = createAction(LIST_PROJECT)