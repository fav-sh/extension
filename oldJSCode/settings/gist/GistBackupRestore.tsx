import React, { useState, useEffect } from 'react'
import {
  SectionContainer,
  SectionHeader,
  SectionContent,
  SettingsButton,
  PaddedAction,
} from '../common'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { actions as authActions, getAuthenticated } from 'store/modules/auth'
import { getBackup, getBackupReadOnly } from 'store/modules/backup'
import styled from 'styled-components'
import { Backup } from './Backup'
import { BackupRestore, AnonymousRestore } from './Restore'
import { BackupCard } from './BackupCard'

export const GistBackupRestore = () => {
  const dispatch = useDispatch()
  const backup = useSelector(getBackup)
  const readOnly = useSelector(getBackupReadOnly)
  const [authKey, setAuthKey] = useState('')

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.GITHUB_PERSONAL_ACCESS_TOKEN
    ) {
      setAuthKey(process.env.GITHUB_PERSONAL_ACCESS_TOKEN)
    }
  }, [])

  const authenticated = useSelector(getAuthenticated)
  const handleAuth = async () => {
    dispatch(authActions.storeToken(authKey))
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
            <PreLogincontainer>
              <LoginText>
                Get a personal access token{' '}
                <a href="https://github.com/settings/tokens">here</a>
              </LoginText>
              <TextField
                value={authKey}
                onChange={(e: any) => setAuthKey(e.target.value)}
                variant="outlined"
                placeholder="Your personal access token"
                label="Personal Access Token"
              />
              <ButtonContainer>
                <SettingsButton
                  onClick={handleAuth}
                  text="Store your Access token"
                />
              </ButtonContainer>
            </PreLogincontainer>
          )}
        </PaddedAction>
        <AnonymousRestore />
        {readOnly &&
          backup &&
          backup.backupFilename &&
          backup.backupGistID &&
          backup.backupUrl && <BackupCard />}
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

const PreLogincontainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`

const ButtonContainer = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
`

const LoginText = styled.p`
  margin-top: 0.25em;
  margin-bottom: 1em;
  font-weight: bold;
  text-decoration: none;
  color: #696969;
  a {
    color: #a9a9a9;
    text-decoration: none;
  }
`
