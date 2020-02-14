import { createAction } from 'redux-actions'
export const LOADING = 'Authen/LOADING'

export const setLoading = createAction(LOADING)
export const LOGIN = 'Authen/LOGIN'

export const setLogin = createAction(LOGIN)
