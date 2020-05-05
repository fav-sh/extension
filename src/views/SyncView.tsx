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

export type SyncViewProps = {
  onBack: () => void
}

const Header = (props: SyncViewProps & { onLogout: () => void }) => (
  <HeaderContainer>
    <HeaderLeft>
      <BackButton onClick={props.onBack} />
      <HeaderTitle>Sync</HeaderTitle>
    </HeaderLeft>
    <HeaderRight>
      <LogoutButton onClick={props.onLogout} />
    </HeaderRight>
  </HeaderContainer>
)

const GithubSettings = ({
  loggedIn,
  onAuth,
}: {
  loggedIn: boolean
  onAuth: (code: string) => void
}) => {
  const [authToken, setAuthToken] = useState<string>('')

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.GITHUB_PERSONAL_ACCESS_TOKEN
    ) {
      setAuthToken(process.env.GITHUB_PERSONAL_ACCESS_TOKEN)
    }
  }, [])

  // authenticated view
  if (loggedIn) {
    return (
      <FlexCol>
        <Section>
          <Label>Create new Backup to Github</Label>
          <PadInput placeholder="Filename" />
          <PadInput placeholder="Description (optional)" />
          <_Button title="Create Backup " />
        </Section>

        <Section>
          <Label>Restore Existing Backup from Github</Label>
          <PadInput placeholder="GistID" />
          <_Button title="Restore Backup" />
        </Section>
      </FlexCol>
    )
  }

  // login view
  return (
    <FlexCol>
      <Label>Sync with Github</Label>
      <FlexRow>
        <Input
          placeholder="Enter Access Token"
          onChange={(e) => setAuthToken(e.target.value)}
          value={authToken}
        />
        <button disabled={isBlank(authToken)} onClick={() => onAuth(authToken)}>
          Submit
        </button>
      </FlexRow>
    </FlexCol>
  )
}

const Content = ({
  showBackupCard,
  onAuth,
  loggedIn,
}: {
  showBackupCard: boolean
  onAuth: (code: string) => void
  loggedIn: boolean
}) => (
  <Container>
    {showBackupCard && <BackupCard />}
    <GithubSettings loggedIn={loggedIn} onAuth={onAuth} />
    <FlexRow>
      <LinkButton onClick={() => openLocalSyncWindow()}>
        Local Backup / Restore
      </LinkButton>
    </FlexRow>
  </Container>
)

const View = (props: SyncViewProps) => {
  const dispatch = useDispatch()
  const backupExists = useSelector(getBackupExists)
  // Checks if the user has a token in the store
  const loggedIn = useSelector(getAuthenticated)

  const handleLogin = (token: string) => {
    dispatch(authActions.storeToken(token))
  }

  const handleLogout = () => {
    dispatch(authActions.logout())
  }

  return (
    <>
      <Header onBack={props.onBack} onLogout={handleLogout} />
      <Content
        showBackupCard={backupExists}
        loggedIn={loggedIn}
        onAuth={handleLogin}
      />
    </>
  )
}

export default View

const _Button = ({
  title,
  onClick,
}: {
  title: string
  onClick?: () => void
}) => {
  const StyledButton = styled.button`
    font-family: Roboto, sans-serif;
  `

  return (
    <div>
      <StyledButton onClick={onClick}>{title}</StyledButton>
    </div>
  )
}

const Container = styled(FlexCol)`
  padding: 1em;
`

const Section = styled(FlexCol)`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`

const PadInput = styled(Input)`
  margin-top: 0.25em;
  margin-bottom: 0.25em;
`
