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
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
} from '@material-ui/core'
import { authorize } from '~/browser/githubAuth'
import { getAuthToken } from '~/api/getAuthToken'
import { useDispatch, useSelector } from 'react-redux'
import { actions as authActions, getAuthenticated } from '~/store/modules/auth'
import styled from 'styled-components'
import { isBlank } from '~/helpers'
import {
  actions as backupActions,
  getBackup,
  createBackupThunk,
  updateBackupThunk,
  getBackupLoading,
} from '~/store/modules/backup'

export const GistBackupRestore = () => {
  const dispatch = useDispatch()

  const authenticated = useSelector(getAuthenticated)
  const backup = useSelector(getBackup)
  const backupLoading = useSelector(getBackupLoading)

  const [gistFilename, setGistFilename] = useState('')

  const [gistDescription, setGistDesciption] = useState('')

  const handleAuth = async () => {
    const authCode = await authorize()
    const data = await getAuthToken(authCode)
    if (data && data.access_token) {
      dispatch(authActions.storeToken(data.access_token))
    }
  }

  const handleBackup = () => {
    dispatch(createBackupThunk(gistFilename, gistDescription))
  }

  const handleUpdate = () => dispatch(updateBackupThunk())

  const handleLogout = () => {
    dispatch(authActions.logout())
  }

  const renderBackupCard = () => (
    <MarginCard>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h3">
          Backup Created
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {`Filename: ${backup.backupFilename}`}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {`Gist ID: ${backup.backupGistID}`}
        </Typography>
        {backup.backupDescription && (
          <Typography variant="body2" color="textSecondary" component="p">
            {`Description: ${backup.backupDescription}`}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" href={backup.backupUrl}>
          Open on Web
        </Button>
        <Button size="small" color="primary" onClick={handleUpdate}>
          Update
        </Button>
        <Button
          size="small"
          color="secondary"
          onClick={() => dispatch(backupActions.clearBackup())}
        >
          Delete
        </Button>
      </CardActions>
    </MarginCard>
  )

  const renderPostAuth = () => {
    if (backupLoading) {
      return <CircularProgress />
    }
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
        <Button
          disabled={isBlank(gistFilename)}
          onClick={handleBackup}
          variant="outlined"
        >
          Backup
        </Button>
        {backup && backup.backupFilename && renderBackupCard()}
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

const MarginCard = styled(Card)`
  margin-top: 0.5em;
`
