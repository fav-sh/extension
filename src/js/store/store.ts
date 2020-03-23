import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { DevTools } from './DevTools'
import { AppState } from '~/types/redux'
import { createLocalStorage } from '../browser/storageAdapter'
import thunk from 'redux-thunk'

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
  initialState as backupLoadersState,
  reducer as backupLoadersReducer,
} from './modules/backup.loaders'

import {
  initialState as tagsState,
  reducer as tagsReducer,
} from './modules/tags'

import {
  initialState as settingsState,
  reducer as settingsReducer,
} from './modules/settings'

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
  backupLoaders: backupLoadersState,
  tags: tagsState,
  settings: settingsState,
}

const rootReducer = combineReducers({
  bookmarks: bookmarksReducer,
  navigation: navigationReducer,
  editing: editingReducer,
  auth: authReducer,
  backup: backupReducer,
  backupLoaders: backupLoadersReducer,
  tags: tagsReducer,
  settings: settingsReducer,
})

const createPersistReducer = (config: any) =>
  persistReducer(config, rootReducer)

const enhancer = compose(applyMiddleware(thunk), DevTools.instrument())

export function configureStore() {
  const store = createStore(
    createPersistReducer(extensionConfig),
    appInitialState,
    enhancer
  )
  const persistor = persistStore(store)
  return { store, persistor }
}
