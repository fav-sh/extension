import React from 'react'
import ReactDOM from 'react-dom'
import { LocalBackup, LocalRestore } from './LocalBackupRestore'
import { GistBackupRestore } from './gist/GistBackupRestore'
import { configureStore } from '~/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import 'normalize.css'
import styled from 'styled-components'
import GlobalStyles from './SettingsGlobalStyles'

const Container = styled.div`
  padding: 1.5em;
`

const AppSettings = () => {
  const { store, persistor } = configureStore()
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container>
            <h1>Settings</h1>
            <LocalBackup />
            <LocalRestore />
            <GistBackupRestore />
          </Container>
        </PersistGate>
      </Provider>
    </>
  )
}

ReactDOM.render(<AppSettings />, document.getElementById('settings-root'))
