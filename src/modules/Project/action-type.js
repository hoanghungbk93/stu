import { createAction } from 'redux-actions'
export const LOADING = 'Project/LOADING'
export const ADD_PROJECT_SUCCESS = 'Project/ADD_PROJECT_SUCCESS'
export const EDIT_PROJECT_SUCCESS = 'Project/EDIT_PROJECT_SUCCESS'
export const LIST_PROJECT = 'Project/LIST_PROJECT'
export const DELETE_SUCCESS = 'Project/DELETE_PROJECT_SUCCESS'

export const setLoading = createAction(LOADING)
export const setDeleteSuccess = createAction(DELETE_SUCCESS)
export const setAddProjectSuccess = createAction(ADD_PROJECT_SUCCESS)
export const setEditProjectSuccess = createAction(EDIT_PROJECT_SUCCESS)
export const setListProject = createAction(LIST_PROJECT)