/**
 * This stores just the loaders for everything that we do in relation
 * to the backup.
 */

import { AppAction, AppState } from '~/types/redux'

export type BackupLoaders = {
  readCreate: boolean
  writeCreate: boolean
  writeUpdate: boolean
  readUpdate: boolean
}

export const initialState: BackupLoaders = {
  readCreate: false,
  writeCreate: false,
  readUpdate: false,
  writeUpdate: false,
}

export const actions = {
  toggleReadCreate: (value: boolean) => ({
    type: 'TOGGLE_READ_CREATE',
    payload: value,
  }),
  toggleWriteCreate: (value: boolean) => ({
    type: 'TOGGLE_WRITE_CREATE',
    payload: value,
  }),
  toggleReadUpdate: (value: boolean) => ({
    type: 'TOGGLE_READ_UPDATE',
    payload: value,
  }),
  toggleWriteUpdate: (value: boolean) => ({
    type: 'TOGGLE_WRITE_UPDATE',
    payload: value,
  }),
}

export function reducer(
  state: BackupLoaders = initialState,
  action: AppAction
): BackupLoaders {
  switch (action.type) {
    case 'TOGGLE_READ_CREATE':
      return {
        ...state,
        readCreate: action.payload,
      }
    case 'TOGGLE_WRITE_CREATE':
      return {
        ...state,
        writeCreate: action.payload,
      }
    case 'TOGGLE_READ_UPDATE':
      return {
        ...state,
        readUpdate: action.payload,
      }
    case 'TOGGLE_WRITE_UPDATE':
      return {
        ...state,
        writeUpdate: action.payload,
      }
    default:
      return state
  }
}

export const getBackupReadCreate = (state: AppState) =>
  state.backupLoaders.readCreate
export const getBackupWriteCreate = (state: AppState) =>
  state.backupLoaders.writeCreate
export const getBackupReadUpdate = (state: AppState) =>
  state.backupLoaders.readUpdate
export const getBackupWriteUpdate = (state: AppState) =>
  state.backupLoaders.writeUpdate
