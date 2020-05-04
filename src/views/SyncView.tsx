import React from 'react'
import styled from 'styled-components'
// Header Components
import HeaderContainer from '~/components/header/HeaderContainer'
import HeaderLeft from '~/components/header/HeaderLeft'
import HeaderTitle from '~/components/header/HeaderTitle'
import BackButton from '~/components/buttons/BackButton'
import { useSelector, useDispatch } from 'react-redux'
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
  const dispatch = useDispatch()

  return (
    <>
      <Header onBack={props.onBack} />
      <Content showBackupCard={backupExists} />
    </>
  )
}

export default View
