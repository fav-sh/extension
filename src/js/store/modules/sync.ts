import { AppAction, AppState } from '~/types/redux'
import { BackupDetails } from '~/types/BackupDetails'

export type SyncState = {
  token?: string
  backupDetails?: BackupDetails
}

export const initialState: SyncState = {}

export const actions = {
  setToken: (token: string) => ({
    type: 'SET_TOKEN',
    payload: token,
  }),
  setBackupDetails: (backupDetails: BackupDetails) => ({
    type: 'SET_BACKUP_DETAILS',
    payload: backupDetails,
  }),
}

export function reducer(state: SyncState = initialState, action: AppAction) {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      }
    case 'SET_BACKUP_DETAILS':
      return {
        ...state,
        backupDetails: action.payload,
      }
    default:
      return state
  }
}

export const getToken = (state: AppState) => state.sync.token

export const getBackupDetails = (state: AppState) => state.sync.backupDetails
