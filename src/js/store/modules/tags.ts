import { Tag } from '~/types/Tag'
import { AppAction, AppState } from '~/types/redux'
import uniq from 'lodash/fp/uniq'
import remove from 'lodash/fp/remove'

export type TagsState = {
  activeTags: Tag[]
}

export const initialState: TagsState = {
  activeTags: [],
}

export const actions = {
  addTag: (tag: Tag) => ({
    type: 'ADD_TAG',
    payload: tag,
  }),
  removeTag: (guid: string) => ({
    type: 'REMOVE_TAG',
    payload: guid,
  }),
}

export function reducer(state: TagsState = initialState, action: AppAction) {
  switch (action.type) {
    // TODO: Implement reducer
    case 'ADD_TAG':
      return {
        ...state,
        activeTags: uniq([...state.activeTags, action.payload]),
      }
    case 'REMOVE_TAG':
      return {
        ...state,
        activeTags: remove(
          (tag: string) => tag === action.payload,
          state.activeTags
        ),
      }
    default:
      return state
  }
}

export const getActiveTags = (state: AppState) => state.tags.activeTags
