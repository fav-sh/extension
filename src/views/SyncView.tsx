import React from 'react'
import styled from 'styled-components'
// Header Components
import HeaderContainer from '~/components/header/HeaderContainer'
import HeaderLeft from '~/components/header/HeaderLeft'
import HeaderTitle from '~/components/header/HeaderTitle'
import BackButton from '~/components/buttons/BackButton'
import { useSelector } from 'react-redux'
import { openSettingsWindow } from '~/browser/openSettings'
import { getBackupExists } from '~/store/modules/backup'
import { BackupCard } from '~/settings/gist/BackupCard'
import LinkButton from '~/components/common/LinkButton'
import Input from '~/components/form/Input'
import Label from '~/components/form/Label'
import { FlexCol, FlexRow } from '~/components/common/FlexContainer'
import HeaderRight from '~/components/header/HeaderRight'
import LogoutButton from '~/components/buttons/LogoutButton'

export type SyncViewProps = {
  onBack: () => void
}

const Header = (props: SyncViewProps) => (
  <HeaderContainer>
    <HeaderLeft>
      <BackButton onClick={props.onBack} />
      <HeaderTitle>Sync</HeaderTitle>
    </HeaderLeft>
    <HeaderRight>
      <LogoutButton onClick={() => {}} />
    </HeaderRight>
  </HeaderContainer>
)

const GithubSettings = ({ loggedIn }: { loggedIn: boolean }) => {
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
        <Input placeholder="Enter Access Token" />
        <button>Submit</button>
      </FlexRow>
    </FlexCol>
  )
}

const Content = ({ showBackupCard }: { showBackupCard: boolean }) => (
  <Container>
    {showBackupCard && <BackupCard />}
    <GithubSettings loggedIn={true} />
    <FlexRow>
      <LinkButton onClick={() => openSettingsWindow()}>
        Local Backup / Restore
      </LinkButton>
      <LinkButton onClick={() => openSettingsWindow()}>
        Open Sync Settings
      </LinkButton>
    </FlexRow>
  </Container>
)

const View = (props: SyncViewProps) => {
  const backupExists = useSelector(getBackupExists)

  return (
    <>
      <Header onBack={props.onBack} />
      <Content showBackupCard={backupExists} />
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
