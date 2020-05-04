import { AppState, AppAction } from '~/types/redux'
import { Screens } from '~/types/Screens'

export type NavigationState = {
  screen: Screens
}

export const initialState: NavigationState = {
  screen: 'home',
}

export const navigate = (screen: Screens) => ({
  type: 'NAVIGATE',
  payload: screen,
})

export function reducer(
  state: NavigationState = initialState,
  action: AppAction
) {
  switch (action.type) {
    case 'NAVIGATE':
      return {
        ...state,
        screen: action.payload,
      }
    default:
      return state
  }
}

export const getCurrentScreen = (state: AppState) => state.navigation.screen
