import React, { useState } from 'react'
import {
  SectionContainer,
  SectionHeader,
  SectionContent,
  SettingsButton,
  PaddedAction,
} from '../common'
import { Button } from '@material-ui/core'
import { authorize } from '~/browser/githubAuth'
import { getAuthToken } from '~/api/getAuthToken'
import { useDispatch, useSelector } from 'react-redux'
import { actions as authActions, getAuthenticated } from '~/store/modules/auth'
import styled from 'styled-components'
import { Backup } from './Backup'
import { BackupRestore, AnonymousRestore } from './Restore'

export const GistBackupRestore = () => {
  const dispatch = useDispatch()

  const authenticated = useSelector(getAuthenticated)
  const handleAuth = async () => {
    const authCode = await authorize()
    const data = await getAuthToken(authCode)
    if (data && data.access_token) {
      dispatch(authActions.storeToken(data.access_token))
    }
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
