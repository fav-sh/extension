import { combineReducers, createStore, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { DevTools } from './DevTools'
import { AppState } from '~/types/redux'
import { createLocalStorage } from './storageAdapter'

const localStorage = createLocalStorage()

import {
  initialState as bookmarksState,
  reducer as bookmarksReducer,
} from './modules/bookmarks'

import {
  initialState as navigationState,
  reducer as navigationReducer,
} from './modules/navigation'

import {
  initialState as editingState,
  reducer as editingReducer,
} from './modules/editing'

import {
  initialState as authState,
  reducer as authReducer,
} from './modules/auth'

import {
  initialState as backupState,
  reducer as backupReducer,
} from './modules/backup'

import {
  initialState as tagsState,
  reducer as tagsReducer,
} from './modules/tags'

const extensionConfig = {
  key: 'extension',
  storage: localStorage,
}

const appInitialState: AppState = {
  bookmarks: bookmarksState,
  navigation: navigationState,
  editing: editingState,
  auth: authState,
  backup: backupState,
  tags: tagsState,
}

const rootReducer = combineReducers({
  bookmarks: bookmarksReducer,
  navigation: navigationReducer,
  editing: editingReducer,
  auth: authReducer,
  backup: backupReducer,
  tags: tagsReducer,
})

const createPersistReducer = (config: any) =>
  persistReducer(config, rootReducer)

const enhancer = compose(DevTools.instrument())

export function configureStore() {
  const store = createStore(
    createPersistReducer(extensionConfig),
    appInitialState,
    enhancer
  )
  const persistor = persistStore(store)
  return { store, persistor }
}
