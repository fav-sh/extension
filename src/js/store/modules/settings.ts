import { AppAction, AppState } from '~/types/redux'

export type SettingsState = {
  autoUpdateBackup: boolean
}

export const initialState: SettingsState = {
  autoUpdateBackup: true,
}

export const actions = {
  toggleAutoUpdate: (value: boolean) => ({
    type: 'TOGGLE_AUTO_UPDATE',
    payload: value,
  }),
}

export function reducer(
  state: SettingsState = initialState,
  action: AppAction
) {
  switch (action.type) {
    case 'TOGGLE_AUTO_UPDATE':
      return {
        ...state,
        autoUpdateBackup: action.payload,
      }
    default:
      return state
  }
}

export const getAutoUpdateBackup = (state: AppState) =>
  state.settings.autoUpdateBackup
