import { BookmarkState } from '~/store/modules/bookmarks'
import { EditingState } from '~/store/modules/editing'
import { AuthState } from '~/store/modules/auth'
import { BackupState } from '~/store/modules/backup'
import { TagsState } from '~/store/modules/tags'
import { SettingsState } from '~/store/modules/settings'

export type AppAction = {
  type: string
  payload?: any
}

export type AppState = {
  bookmarks: BookmarkState
  editing: EditingState
  auth: AuthState
  backup: BackupState
  tags: TagsState
  settings: SettingsState
}

export type ThunkDispatch = (action: any) => any
export type ThunkState = () => AppState
