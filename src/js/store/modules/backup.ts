import { AppAction, AppState, ThunkState, ThunkDispatch } from '~/types/redux'
import { getBookmarks, actions as bookmarkActions } from './bookmarks'
import { getToken } from './auth'
import {
  transformExportBookmarks,
  validateBookmark,
  generateBookmarkGuid,
  transformImportBookmark,
} from '~/helpers'
import { createBackup } from '~/api/createBackup'
import { updateBackup } from '~/api/updateBackup'
import {
  restoreGistAnonymously,
  restoreGistAuthenticated,
} from '~/api/restoreBackup'

export type BackupState = Partial<{
  backupLoading: boolean
  backupFilename: string
  backupDescription: string
  backupUrl: string
  backupGistID: string
}>

export const initialState: BackupState = {
  backupLoading: false,
}

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
  setLoading: (loading: boolean) => ({
    type: 'SET_LOADING',
    payload: loading,
  }),
}

export function reducer(state: BackupState = initialState, action: AppAction) {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        backupLoading: action.payload,
      }
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

export const getBackupLoading = (state: AppState) => state.backup.backupLoading

export const getBackup = (state: AppState) => state.backup

export const getBackupFilename = (state: AppState) =>
  state.backup.backupFilename

export const getBackupDescription = (state: AppState) =>
  state.backup.backupDescription
export const getBackupUrl = (state: AppState) => state.backup.backupUrl

export const getBackupGistId = (state: AppState) => state.backup.backupGistID

export function createBackupThunk(
  filename: string,
  isPublic: boolean,
  description?: string
) {
  return async (dispatch: ThunkDispatch, getState: ThunkState) => {
    dispatch(actions.setLoading(true))
    const bookmarks = getBookmarks(getState())
    const token = getToken(getState())

    const minifiedBookmarks = transformExportBookmarks(bookmarks)

    // Add a .json to the end of the filename
    // TODO: We should check if the user has already done this
    const filenameWithExtension = `${filename}.json`

    if (token) {
      try {
        const resp = await createBackup(
          token,
          filenameWithExtension,
          isPublic,
          minifiedBookmarks,
          description
        )

        const { id, html_url } = resp.data
        console.log(resp)

        dispatch(actions.setGistId(id))
        dispatch(actions.setUrl(html_url))
        dispatch(actions.setFilename(filenameWithExtension))

        if (description) {
          dispatch(actions.setDescription(description))
        }
      } catch {
        alert('There was an error backing up your bookmarks')
      }
    } else {
      alert('Could not create backup, missing token')
    }
    dispatch(actions.setLoading(false))
  }
}

export function updateBackupThunk() {
  return async (dispatch: ThunkDispatch, getState: ThunkState) => {
    dispatch(actions.setLoading(true))
    const bookmarks = getBookmarks(getState())
    const token = getToken(getState())
    const filename = getBackupFilename(getState())
    const description = getBackupDescription(getState())
    const gistId = getBackupGistId(getState())

    const minifiedBookmarks = transformExportBookmarks(bookmarks)

    if (token && filename && gistId) {
      try {
        await updateBackup(
          token,
          filename,
          false,
          minifiedBookmarks,
          gistId,
          description
        )
      } catch {
        alert('Could not update bookmarks')
      }
    } else {
      alert('Could not update bookmarks')
    }
    dispatch(actions.setLoading(false))
  }
}

// TODO: Implement Later
// If the user is authenticated and the gist belongs to them
// We can restore the gist and hook it up so  the user backs up to
// It on the next backup
export function restoreBackupAuthenticatedThunk(gistId: string) {
  return async (dispatch: ThunkDispatch, getState: ThunkState) => {
    dispatch(actions.setLoading(true))
    try {
      const token = getToken(getState())
      if (!token) {
        throw 'Token not found'
      }
      const resp = await restoreGistAuthenticated(gistId, token)
      console.log(resp)
      // For now our backups only contain a single file
      // We get the filename by getting the first key in
      // the files object of the gist response
      const filename = Object.keys(resp.data.files)[0]
      // Grab the content out of the response and parse it
      const { content } = resp.data.files[filename]
      const bookmarks = JSON.parse(content)
      // Validate + expand bookmarks
      let expandedBookmarks = {}
      bookmarks.map((bookmark: any) => {
        if (validateBookmark(bookmark)) {
          // Once the bookmark is validated we then create a fresh
          // guid for the bookmark and expand it
          const freshGuid = generateBookmarkGuid()
          const expandedBookmark = transformImportBookmark(bookmark, freshGuid)

          // Convert to a structure understood by the app
          expandedBookmarks = {
            [expandedBookmark.guid]: expandedBookmark,
          }
        }
      })
      dispatch(bookmarkActions.setBookmarks(expandedBookmarks))
      dispatch(actions.setFilename(filename))
      dispatch(actions.setGistId(gistId))
      dispatch(actions.setDescription(resp.data.description))
      dispatch(actions.setUrl(resp.data.html_url))
      alert('Import success!')
    } catch {
      alert('Could not restore bookmarks')
    }
    dispatch(actions.setLoading(false))
  }
}

// If the user is not authenticated we can restore an anonymous gist
// However we do not hook it up for backup as the user does not own that
// Gist
export function restoreBackupAnonymouslyThunk(gistId: string) {
  return async (dispatch: ThunkDispatch) => {
    dispatch(actions.setLoading(true))
    try {
      const resp = await restoreGistAnonymously(gistId)
      // For now our backups only contain a single file
      // We get the filename by getting the first key in
      // the files object of the gist response
      const filename = Object.keys(resp.data.files)[0]
      // Grab the content out of the response and parse it
      const { content } = resp.data.files[filename]
      const bookmarks = JSON.parse(content)
      // Validate + expand bookmarks
      let expandedBookmarks = {}
      bookmarks.map((bookmark: any) => {
        if (validateBookmark(bookmark)) {
          // Once the bookmark is validated we then create a fresh
          // guid for the bookmark and expand it
          const freshGuid = generateBookmarkGuid()
          const expandedBookmark = transformImportBookmark(bookmark, freshGuid)

          // Convert to a structure understood by the app
          expandedBookmarks = {
            [expandedBookmark.guid]: expandedBookmark,
          }
        }
      })
      dispatch(bookmarkActions.setBookmarks(expandedBookmarks))
      alert('Import success!')
    } catch {
      alert('Could not restore bookmarks')
    }
    dispatch(actions.setLoading(false))
  }
}
