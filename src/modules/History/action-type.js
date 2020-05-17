import { createAction } from 'redux-actions'
export const LOADING = 'Requirement/LOADING'
export const ADD_REQUIREMENT_SUCCESS = 'Requirement/ADD_REQUIREMENT_SUCCESS'
export const EDIT_REQUIREMENT_SUCCESS = 'Requirement/EDIT_REQUIREMENT_SUCCESS'
export const LIST_REQUIREMENT = 'Requirement/LIST_REQUIREMENT'
export const DELETE_SUCCESS = 'Requirement/DELETE_SUCCESS'
export const CANCEL_SUCCESS = 'Requirement/CANCEL_SUCCESS'
export const APPROVE_SUCCESS = 'Requirement/APPROVE_SUCCESS'

export const setLoading = createAction(LOADING)
export const setApproveSuccess = createAction(APPROVE_SUCCESS)
export const setCancelSuccess = createAction(CANCEL_SUCCESS)
export const setDeleteSuccess = createAction(DELETE_SUCCESS)
export const setAddRequirementSuccess = createAction(ADD_REQUIREMENT_SUCCESS)
export const setEditRequirementSuccess = createAction(EDIT_REQUIREMENT_SUCCESS)
export const setListRequirement = createAction(LIST_REQUIREMENT)