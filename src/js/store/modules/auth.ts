import { AppAction, AppState, ThunkDispatch } from '~/types/redux'
import { openWebAuth } from '~/browser/githubAuth'
import {
  CHROME_PROD_CLIENT_ID,
  CHROME_DEV_CLIENT_ID,
  FIREFOX_PROD_CLIENT_ID,
  FIREFOX_DEV_CLIENT_ID,
  GIST_SCOPE,
} from '~/constants'
import { getAuthToken } from '~/api/getAuthToken'

export type AuthState = {
  authLoading: boolean
  token?: string
}

export const initialState: AuthState = {
  authLoading: false,
}

export const actions = {
  storeToken: (token: string) => ({
    type: 'STORE_TOKEN',
    payload: token,
  }),
  logout: () => ({
    type: 'LOGOUT',
  }),
  authLoading: (state: boolean) => ({
    type: 'AUTH_LOADING',
    payload: state,
  }),
}

export function reducer(state: AuthState = initialState, action: AppAction) {
  switch (action.type) {
    case 'AUTH_LOADING':
      return {
        ...state,
        authLoading: action.payload,
      }
    case 'STORE_TOKEN':
      return {
        ...state,
        token: action.payload,
      }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export const getToken = (state: AppState) => state.auth.token

export const getAuthenticated = (state: AppState) => !!state.auth.token

export const getAuthLoading = (state: AppState) => state.auth.authLoading

export function authenticationFlowThunk() {
  let clientId = ''
  if (process.env.TARGET === 'chrome') {
    if (process.env.NODE_ENV === 'production') {
      clientId = CHROME_PROD_CLIENT_ID
    } else {
      clientId = CHROME_DEV_CLIENT_ID
    }
  } else {
    if (process.env.NODE_ENV === 'production') {
      clientId = FIREFOX_PROD_CLIENT_ID
    } else {
      clientId = FIREFOX_DEV_CLIENT_ID
    }
  }

  const browserSpecific = process.env.TARGET === 'chrome' ? chrome : browser

  const redirectUri = browserSpecific.identity.getRedirectURL()
  const authURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${GIST_SCOPE}&redirect_uri=${redirectUri}`
  console.log('opening URL: ', authURL)
  return async (dispatch: ThunkDispatch) => {
    dispatch(actions.authLoading(true))
    openWebAuth(authURL, async (code: string) => {
      const data = await getAuthToken(code)
      if (data && data.access_token) {
        dispatch(actions.storeToken(data.access_token))
      }
    })
    dispatch(actions.authLoading(false))
  }
}
