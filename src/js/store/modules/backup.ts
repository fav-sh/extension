import { AppAction, AppState } from '~/types/redux'

export type BackupState = Partial<{
  backupFilename: string
  backupDescription: string
  backupUrl: string
  backupGistID: string
}>

export const initialState: BackupState = {}

export const actions = {
  setFilename: (filename: string) => ({
    type: 'SET_BACKUP_FILENAME',
    payload: filename,
  }),
  setDescription: (description: string) => ({
    type: 'SET_BACKUP_DESCRIPTION',
    payload: description,
  }),
  setUrl: (url: string) => ({
    type: 'SET_BACKUP_URL',
    payload: url,
  }),
  setGistId: (gistId: string) => ({
    type: 'SET_BACKUP_GIST_ID',
    payload: gistId,
  }),
  clearBackup: () => ({
    type: 'CLEAR_BACKUP',
  }),
}

export function reducer(state: BackupState = initialState, action: AppAction) {
  switch (action.type) {
    case 'SET_BACKUP_FILENAME':
      return {
        ...state,
        backupFilename: action.payload,
      }
    case 'SET_BACKUP_DESCRIPTION':
      return {
        ...state,
        backupDescription: action.payload,
      }
    case 'SET_BACKUP_URL':
      return {
        ...state,
        backupUrl: action.payload,
      }
    case 'SET_BACKUP_GIST_ID':
      return {
        ...state,
        backupGistID: action.payload,
      }
    case 'CLEAR_BACKUP':
      return initialState
    default:
      return state
  }
}

export const getBackup = (state: AppState) => state.backup

export const getBackupFilename = (state: AppState) =>
  state.backup.backupFilename

export const getBackupDescription = (state: AppState) =>
  state.backup.backupDescription
export const getBackupUrl = (state: AppState) => state.backup.backupUrl

export const getBackupGistId = (state: AppState) => state.backup.backupGistID
