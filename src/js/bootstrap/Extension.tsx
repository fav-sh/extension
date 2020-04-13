import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { DevTools } from '~/store/DevTools'
import { Router } from '~/screens/Router'
import { configureStore } from '~/store/store'

export default () => {
  const { store, persistor } = configureStore()
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
        {process.env.NODE_ENV === 'development' && <DevTools />}
      </PersistGate>
    </Provider>
  )
}
