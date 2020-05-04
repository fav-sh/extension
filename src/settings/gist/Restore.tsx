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
  SectionHeader,
} from '../common'

export const AnonymousRestore = () => {
  const dispatch = useDispatch()
  const [gistId, setGistId] = useState('')
  const backupLoading = useSelector(getBackupLoading)

  const handleRestore = () => dispatch(restoreBackupAnonymouslyThunk(gistId))

  return (
    <SectionContainer>
      <SectionHeader>Restore Public Backup</SectionHeader>
      {backupLoading && <p>Loading...</p>}
      <SectionContent>
        <p>Restore any public bookmark file from Gist</p>
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
      <SectionHeader>Restore Your Backup</SectionHeader>
      {backupLoading && <p>Loading</p>}
      <SectionContent>
        <p>Restore one of your backups and continue backing up to it</p>
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
