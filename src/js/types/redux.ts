import { BookmarkState } from '~/store/modules/bookmarks'
import { NavigationState } from '~/store/modules/navigation'
import { EditingState } from '~/store/modules/editing'
import { AuthState } from '~/store/modules/auth'
import { BackupState } from '~/store/modules/backup'
import { TagsState } from '~/store/modules/tags'

export type AppAction = {
  type: string
  payload?: any
}

export type AppState = {
  bookmarks: BookmarkState
  navigation: NavigationState
  editing: EditingState
  auth: AuthState
  backup: BackupState
  tags: TagsState
}
