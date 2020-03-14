import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { LocalBackup, LocalRestore } from './LocalBackupRestore'
import { GistBackupRestore } from './gist/GistBackupRestore'

export const Settings = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Settings</Typography>
        </Toolbar>
      </AppBar>
      <SettingsContainer>
        <LocalBackup />
        <LocalRestore />
        <GistBackupRestore />
      </SettingsContainer>
    </>
  )
}

const SettingsContainer = styled.div`
  padding: 1em;
`
