import React from 'react'
import 'normalize.css'
import GlobalStyle from './components/GlobalStyles'
import 'react-toastify/dist/ReactToastify.min.css'
import Router from './views/router'
import { configureStore } from './store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { DevTools } from '~/store/DevTools'
import { ToastContainer } from 'react-toastify'

export default () => {
  const { store, persistor } = configureStore()
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <Router />
        {process.env.NODE_ENV === 'development' && <DevTools />}
        <ToastContainer />
      </PersistGate>
    </Provider>
  )
}
