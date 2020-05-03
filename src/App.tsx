import React from 'react'
import 'normalize.css'
import GlobalStyle from './components/GlobalStyles'
import Router from './views/router'
import { configureStore } from './store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export default () => {
  const { store, persistor } = configureStore()
  return (
    <>
      <GlobalStyle />
      {/* <Provider store={store}> */}
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Router />
      {/* </PersistGate> */}
      {/* </Provider> */}
    </>
  )
}
