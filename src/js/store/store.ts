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
  initialState as syncState,
  reducer as syncReducer,
} from './modules/sync'

import {
  initialState as tagsState,
  reducer as tagsReducer,
} from './modules/tags'

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

const extensionConfig = {
  key: 'extension',
  storage: localStorage,
}

const appInitialState: AppState = {
  bookmarks: bookmarksState,
  sync: syncState,
  tags: tagsState,
  navigation: navigationState,
  editing: editingState,
  auth: authState,
}

const rootReducer = combineReducers({
  bookmarks: bookmarksReducer,
  sync: syncReducer,
  tags: tagsReducer,
  navigation: navigationReducer,
  editing: editingReducer,
  auth: authReducer,
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
