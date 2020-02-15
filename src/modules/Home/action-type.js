import { createAction } from 'redux-actions'
export const LOADING = 'Home/LOADING'

export const setLoading = createAction(LOADING)
export const CANCEL = 'Home/LOADING'

export const setCancel = createAction(CANCEL)
export const APPROVE = 'Home/APPROVE'

export const setApprove = createAction(APPROVE)