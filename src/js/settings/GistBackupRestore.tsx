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
import { Typography } from '@material-ui/core'
import { authorize } from '~/browser/githubAuth'

const GistPreAuth = ({ onLogin }: { onLogin: () => void }) => {
  return <SettingsButton onClick={onLogin} text="Log in With Github" />
}

const GistPostAuth = ({ onLogout }: { onLogout: () => void }) => {
  return <SettingsButton onClick={onLogout} text="Log out" />
}

export const GistBackupRestore = () => {
  const [authenticated, setAuthenticated] = useState(false)

  const handleAuth = () => authorize()

  return (
    <SectionContainer>
      <SectionHeader>Backup to Gist</SectionHeader>
      <SectionContent>
        <Typography>
          Backup and restore your bookmarks to a Gist on Github
        </Typography>
        <PaddedAction>
          {authenticated ? (
            <GistPostAuth onLogout={() => setAuthenticated(false)} />
          ) : (
            <GistPreAuth onLogin={handleAuth} />
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
