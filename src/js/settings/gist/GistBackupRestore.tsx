import React from 'react'
import {
  SectionContainer,
  SectionHeader,
  SectionContent,
  SettingsButton,
  PaddedAction,
} from '../common'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
  actions as authActions,
  getAuthenticated,
  authenticationFlowThunk,
} from '~/store/modules/auth'
import { getBackup } from '~/store/modules/backup'
import styled from 'styled-components'
import { Backup } from './Backup'
import { BackupRestore, AnonymousRestore } from './Restore'
import { BackupCard } from './BackupCard'

export const GistBackupRestore = () => {
  const dispatch = useDispatch()
  const backup = useSelector(getBackup)

  const authenticated = useSelector(getAuthenticated)
  const handleAuth = async () => {
    dispatch(authenticationFlowThunk())
  }

  const handleLogout = () => {
    dispatch(authActions.logout())
  }

  return (
    <SectionContainer>
      <HeaderContainer>
        <SectionHeader>Github Gist</SectionHeader>
        {authenticated && <Button onClick={handleLogout}>Log Out</Button>}
      </HeaderContainer>
      <SectionContent>
        <PaddedAction>
          {authenticated ? (
            <>
              <Backup />
              <BackupRestore />
              {backup &&
                backup.backupFilename &&
                backup.backupGistID &&
                backup.backupUrl && <BackupCard />}
            </>
          ) : (
            <SettingsButton onClick={handleAuth} text="Log in With Github" />
          )}
        </PaddedAction>
        <AnonymousRestore />
      </SectionContent>
    </SectionContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 400px;
  justify-content: space-between;
`
