import { BookmarkState } from '~/store/modules/bookmarks'
import { SyncState } from '~/store/modules/sync'
import { NavigationState } from '~/store/modules/navigation'
import { EditingState } from '~/store/modules/editing'
import { AuthState } from '~/store/modules/auth'
import { BackupState } from '~/store/modules/backup'

export type AppAction = {
  type: string
  payload?: any
}

export type AppState = {
  bookmarks: BookmarkState
  sync: SyncState
  navigation: NavigationState
  editing: EditingState
  auth: AuthState
  backup: BackupState
}
