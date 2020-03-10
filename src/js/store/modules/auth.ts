import { AppAction, AppState } from '~/types/redux'

export type AuthState = {
  token?: string
}

export const initialState: AuthState = {}

export const actions = {
  storeToken: (token: string) => ({
    type: 'STORE_TOKEN',
    payload: token,
  }),
  logout: () => ({
    type: 'LOGOUT',
  }),
}

export function reducer(state: AuthState = initialState, action: AppAction) {
  switch (action.type) {
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

export const isAuthenticated = (state: AppState) => !!state.auth.token
