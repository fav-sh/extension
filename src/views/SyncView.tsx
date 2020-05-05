import React from 'react'
// Header Components
import HeaderContainer from '~/components/header/HeaderContainer'
import HeaderLeft from '~/components/header/HeaderLeft'
import HeaderTitle from '~/components/header/HeaderTitle'
import BackButton from '~/components/buttons/BackButton'
import { useSelector } from 'react-redux'
import { openSettingsWindow } from '~/browser/openSettings'
import { getBackupExists } from '~/store/modules/backup'
import { BackupCard } from '~/settings/gist/BackupCard'

export type SyncViewProps = {
  onBack: () => void
}

const Header = (props: SyncViewProps) => (
  <HeaderContainer>
    <HeaderLeft>
      <BackButton onClick={props.onBack} />
      <HeaderTitle>Sync</HeaderTitle>
    </HeaderLeft>
  </HeaderContainer>
)

const Content = ({ showBackupCard }: { showBackupCard: boolean }) => (
  <>
    {showBackupCard && <BackupCard />}
    <button onClick={() => openSettingsWindow()}>Open Sync Settings</button>
  </>
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
