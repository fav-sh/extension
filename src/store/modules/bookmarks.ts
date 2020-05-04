import { Bookmark } from '~/types/Bookmark'
import { AppAction, AppState, ThunkDispatch } from '~/types/redux'
import omit from 'lodash/fp/omit'
import uniq from 'lodash/fp/uniq'
import { passiveUpdate } from './backup'

export type BookmarkState = {
  [guid: string]: Bookmark
}

export const initialState: BookmarkState = {}

export const actions = {
  add: (bookmark: Bookmark) => ({
    type: 'ADD_BOOKMARK',
    payload: bookmark,
  }),
  remove: (guid: string) => ({
    type: 'REMOVE_BOOKMARK',
    payload: guid,
  }),
  setBookmarks: (bookmarks: BookmarkState) => ({
    type: 'SET_BOOKMARKS',
    payload: bookmarks,
  }),
}

export function reducer(
  state: BookmarkState = initialState,
  action: AppAction
) {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return {
        ...state,
        [action.payload.guid]: action.payload,
      }
    case 'REMOVE_BOOKMARK':
      return omit([action.payload], state)
    case 'SET_BOOKMARKS':
      return action.payload
    default:
      return state
  }
}

export const getBookmarks = (state: AppState) => state.bookmarks

export const getBookmark = (state: AppState, guid: string) =>
  state.bookmarks[guid]

export const getTags = (state: AppState) => {
  const { bookmarks } = state
  // Whats going on here:
  // 1. Take all the tags arrays from all bookmarks
  // 2. Flatten them into a single array using Array.flat()
  // 3. Return only unique values using lodash.uniq()
  const tags = uniq(
    Object.keys(bookmarks)
      .map((key) => bookmarks[key].tags)
      .flat()
  )

  return tags
}

export function addBookmarkThunk(bookmark: Bookmark) {
  return (dispatch: ThunkDispatch) => {
    dispatch(actions.add(bookmark))
    dispatch(passiveUpdate())
  }
}

export function removeBookmarkThunk(guid: string) {
  return (dispatch: ThunkDispatch) => {
    dispatch(actions.remove(guid))
    dispatch(passiveUpdate())
  }
}
