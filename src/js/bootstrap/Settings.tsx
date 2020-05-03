import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { DevTools } from '~/store/DevTools'
import { configureStore } from '~/store/store'
import { Settings } from '~/settings/Settings'
import 'normalize.css'

export default () => {
  const { store, persistor } = configureStore()
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Settings />
          {process.env.NODE_ENV === 'development' && <DevTools />}
        </PersistGate>
      </Provider>
    </>
  )
}
