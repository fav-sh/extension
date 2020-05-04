import { Bookmark } from '~/types/Bookmark'
import { AppAction, AppState } from '~/types/redux'

export type EditingState = {
  bookmark?: Bookmark
}

export const initialState: EditingState = {}

export const actions = {
  setEditing: (bookmark: Bookmark) => ({
    type: 'SET_EDITING',
    payload: bookmark,
  }),
  clearEditing: () => ({
    type: 'CLEAR_EDITING',
  }),
}

export function reducer(state: EditingState = initialState, action: AppAction) {
  switch (action.type) {
    case 'SET_EDITING':
      return {
        ...state,
        bookmark: action.payload,
      }
    case 'CLEAR_EDITING':
      return initialState
    default:
      return state
  }
}

export const getEditingBookmark = (state: AppState) => state.editing.bookmark
