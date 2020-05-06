import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// Header Components
import HeaderContainer from '~/components/header/HeaderContainer'
import HeaderLeft from '~/components/header/HeaderLeft'
import HeaderTitle from '~/components/header/HeaderTitle'
import BackButton from '~/components/buttons/BackButton'
import { useSelector, useDispatch } from 'react-redux'
import { getBackupExists } from '~/store/modules/backup'
import { BackupCard } from '~/components/sync/BackupCard'
import LinkButton from '~/components/common/LinkButton'
import Input from '~/components/form/Input'
import Label from '~/components/form/Label'
import { FlexCol, FlexRow } from '~/components/common/FlexContainer'
import HeaderRight from '~/components/header/HeaderRight'
import LogoutButton from '~/components/buttons/LogoutButton'
import { openLocalSyncWindow } from '~/browser/openLocalSyncWindow'
import { actions as authActions, getAuthenticated } from '~/store/modules/auth'
import { isBlank } from '~/helpers'
import {
  createBackupThunk,
  getBackupLoading,
  restoreBackupAuthenticatedThunk,
  restoreBackupAnonymouslyThunk,
} from '~/store/modules/backup'
import List from '~/components/common/List'
import Loader from '~/components/common/Loader'
import Text from '~/components/common/Text'
import Heading from '~/components/common/Heading'

export type SyncViewProps = {
  onBack: () => void
}

const SyncView = (props: SyncViewProps) => {
  const dispatch = useDispatch()

  const backupExists = useSelector(getBackupExists)

  const loggedIn = useSelector(getAuthenticated)

  const isLoading = useSelector(getBackupLoading)

  const [authToken, setAuthToken] = useState<string>('')

  // Gist ID for authenticated Gists
  const [gistId, setGistId] = useState<string>('')

  // Gist ID from anonymous Gists
  const [anonGistId, setAnonGistId] = useState<string>('')

  const [backupData, setBackupData] = useState<{
    filename: string
    public: boolean
    description: string
  }>({
    filename: '',
    public: false,
    description: '',
  })

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.GITHUB_PERSONAL_ACCESS_TOKEN
    ) {
      setAuthToken(process.env.GITHUB_PERSONAL_ACCESS_TOKEN)
    }
  }, [])

  const handleLogin = (token: string) => {
    dispatch(authActions.storeToken(token))
  }

  const handleLogout = () => {
    dispatch(authActions.logout())
  }

  const handleFilename = (filename: string) =>
    setBackupData({ ...backupData, filename })

  const handleDescription = (description: string) =>
    setBackupData({ ...backupData, description })

  const handlePublic = (visibility: string) => {
    if (visibility === 'public') {
      setBackupData({ ...backupData, public: true })
    } else {
      setBackupData({ ...backupData, public: false })
    }
  }

  const handleBackup = () => {
    if (!isBlank(backupData.filename)) {
      dispatch(
        createBackupThunk(
          backupData.filename,
          backupData.public,
          backupData.description
        )
      )
    }
  }

  const handleRestore = () => dispatch(restoreBackupAuthenticatedThunk(gistId))

  const handleRestoreAnonymousGist = () =>
    dispatch(restoreBackupAnonymouslyThunk(anonGistId))

  const renderHeader = () => (
    <HeaderContainer>
      <HeaderLeft>
        <BackButton onClick={props.onBack} />
        <HeaderTitle>Sync</HeaderTitle>
      </HeaderLeft>
      <HeaderRight>
        {isLoading && <Loader height={15} width={30} color="#fff" />}
        <LogoutButton onClick={handleLogout} />
      </HeaderRight>
    </HeaderContainer>
  )

  const renderGithubSettings = () => {
    if (loggedIn) {
      return (
        <FlexCol>
          <Section>
            <Label>Create new Backup to Github</Label>
            <PadInput
              value={backupData.filename}
              onChange={(e) => handleFilename(e.target.value)}
              placeholder="Filename"
            />
            <PadInput
              value={backupData.description}
              onChange={(e) => handleDescription(e.target.value)}
              placeholder="Description (optional)"
            />
            <FlexRow justifyContent="space-between">
              <select onChange={(e) => handlePublic(e.target.value)}>
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
              <button onClick={handleBackup}>Create Backup</button>
            </FlexRow>
          </Section>

          <Section>
            <Label>Restore Existing Backup from Github</Label>
            <PadInput
              placeholder="GistID"
              value={gistId}
              onChange={(e) => setGistId(e.target.value)}
            />
            <button onClick={handleRestore}>Restore Backup</button>
          </Section>
        </FlexCol>
      )
    }

    return (
      <FlexCol>
        <CustomHeading>Backup / Restore to a Gist</CustomHeading>
        <Text>
          To backup to a Gist, you need a personal access token. You can get one
          from Github <a href="#">here</a>
        </Text>
        <Label> Github Personal Access Token</Label>
        <FlexRow>
          <Input
            placeholder="Enter Access Token"
            onChange={(e) => setAuthToken(e.target.value)}
            value={authToken}
          />
          <button
            disabled={isBlank(authToken)}
            onClick={() => handleLogin(authToken)}
          >
            Submit
          </button>
        </FlexRow>
      </FlexCol>
    )
  }

  const renderGithubAnonymousSettings = () => (
    <FlexColPadTop>
      <CustomHeading>Restore from Anonymous Gist</CustomHeading>
      <Text>
        You can restore bookmarks from a public Gist without having to provide a
        personal access token. Note that this will download bookmarks in
        "readonly" mode and you will not be able to add/edit/remove bookmarks.
      </Text>
      <Label>Enter Gist ID</Label>
      <FlexRow>
        <Input
          placeholder="Gist ID"
          onChange={(e) => setAnonGistId(e.target.value)}
          value={anonGistId}
        />
        <button
          disabled={isBlank(anonGistId)}
          onClick={() => handleRestoreAnonymousGist()}
        >
          Submit
        </button>
      </FlexRow>
    </FlexColPadTop>
  )

  return (
    <>
      {renderHeader()}
      <List innerPadding="1.0em">
        {backupExists && <BackupCard />}
        {renderGithubSettings()}
        {renderGithubAnonymousSettings()}
        <FlexRow>
          <LinkButton onClick={() => openLocalSyncWindow()}>
            Local Backup / Restore
          </LinkButton>
        </FlexRow>
      </List>
    </>
  )
}

export default SyncView

const Section = styled(FlexCol)`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`

const PadInput = styled(Input)`
  margin-top: 0.25em;
  margin-bottom: 0.25em;
`

const CustomHeading = styled(Heading)`
  margin: 0;
  padding: 0;
`

const FlexColPadTop = styled(FlexCol)`
  margin-top: 3.5em;
`
