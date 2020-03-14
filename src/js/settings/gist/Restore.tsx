import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'
import {
  restoreBackupAnonymouslyThunk,
  restoreBackupAuthenticatedThunk,
  getBackupLoading,
} from '~/store/modules/backup'
import {
  SectionContainer,
  SectionContent,
  DownloadInputContainer,
  SettingsTextField,
  SettingsButton,
} from '../common'
import { Typography, CircularProgress } from '@material-ui/core'

export const AnonymousRestore = () => {
  const dispatch = useDispatch()
  const [gistId, setGistId] = useState('')
  const backupLoading = useSelector(getBackupLoading)

  const handleRestore = () => dispatch(restoreBackupAnonymouslyThunk(gistId))

  return (
    <SectionContainer>
      <Typography variant="h6">Restore Public Backup</Typography>
      {backupLoading && <CircularProgress />}
      <SectionContent>
        <Typography>Restore any public bookmark file from Gist</Typography>
        <DownloadInputContainer>
          <SettingsTextField
            value={gistId}
            onChange={setGistId}
            label="GistID"
          />
          <SettingsButton
            disabled={!gistId}
            onClick={handleRestore}
            text="Import"
          />
        </DownloadInputContainer>
      </SectionContent>
    </SectionContainer>
  )
}

export const BackupRestore = () => {
  const dispatch = useDispatch()
  const [gistId, setGistId] = useState('')
  const backupLoading = useSelector(getBackupLoading)

  const handleRestore = () => dispatch(restoreBackupAuthenticatedThunk(gistId))

  return (
    <SectionContainer>
      <Typography variant="h6">Restore Your Backup</Typography>
      {backupLoading && <CircularProgress />}
      <SectionContent>
        <Typography>
          Restore one of your backups and continue backing up to it
        </Typography>
        <DownloadInputContainer>
          <SettingsTextField
            value={gistId}
            onChange={setGistId}
            label="GistID"
          />
          <SettingsButton
            disabled={!gistId}
            onClick={handleRestore}
            text="Import"
          />
        </DownloadInputContainer>
      </SectionContent>
    </SectionContainer>
  )
}
