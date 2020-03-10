import React, { useState } from 'react'
import {
  SectionContainer,
  SectionHeader,
  SectionContent,
  SettingsTextField,
  SettingsButton,
  PaddedAction,
  DownloadInputContainer,
} from './common'
import { Typography, Button } from '@material-ui/core'
import { authorize } from '~/browser/githubAuth'
import { getAuthToken } from '~/api/getAuthToken'
import { useDispatch, useSelector } from 'react-redux'
import { actions as authActions, getAuthenticated } from '~/store/modules/auth'
import styled from 'styled-components'
import { isBlank } from '~/helpers'

export const GistBackupRestore = () => {
  const dispatch = useDispatch()
  const authenticated = useSelector(getAuthenticated)

  const [gistFilename, setGistFilename] = useState('')
  const [gistDescription, setGistDesciption] = useState('')

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

  const renderPostAuth = () => {
    return (
      <PostAuthContainer>
        <SettingsTextField
          style={{ marginBottom: 5 }}
          value={gistFilename}
          onChange={setGistFilename}
          label="Filename"
        />
        <SettingsTextField
          style={{ marginTop: 5, marginBottom: 5 }}
          value={gistDescription}
          onChange={setGistDesciption}
          label="Description (Optional)"
        />
        <Button disabled={isBlank(gistFilename)} variant="outlined">
          Backup
        </Button>
      </PostAuthContainer>
    )
  }

  return (
    <SectionContainer>
      <HeaderContainer>
        <SectionHeader>Backup to Gist</SectionHeader>
        {authenticated && <Button onClick={handleLogout}>Log Out</Button>}
      </HeaderContainer>
      <SectionContent>
        <Typography>
          Backup and restore your bookmarks to a Gist on Github
        </Typography>
        <PaddedAction>
          {authenticated ? (
            renderPostAuth()
          ) : (
            <SettingsButton onClick={handleAuth} text="Log in With Github" />
          )}
        </PaddedAction>
      </SectionContent>
    </SectionContainer>
  )
}

export const AnonymousGistRestore = () => {
  const [gistId, setGistId] = useState('')
  const handleRestore = () => {}
  return (
    <SectionContainer>
      <SectionHeader>Restore from Anonymous Gist</SectionHeader>
      <SectionContent>
        <Typography>Restore bookmarks from an anonymous Gist</Typography>
        <DownloadInputContainer>
          <SettingsTextField
            value={gistId}
            onChange={setGistId}
            label="GistID"
          />
          <SettingsButton
            disabled={!gistId}
            onClick={handleRestore}
            text="Download"
          />
        </DownloadInputContainer>
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

const PostAuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`
