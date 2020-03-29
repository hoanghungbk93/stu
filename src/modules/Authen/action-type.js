import { createAction } from 'redux-actions'
export const LOADING = 'Authen/LOADING'

export const setLoading = createAction(LOADING)
export const LOGIN = 'Authen/LOGIN'
export const USER_INFO = 'Authen/USER_INFO'

export const setLogin = createAction(LOGIN)
export const setUserInfo = createAction(USER_INFO)
