import React from 'react'
import Header from '~/components/common/Header'
import styled from 'styled-components'
import { HelpPopover } from '~/components/MainScreen/HelpPopover'
import { BackupPopover } from '~/components/MainScreen/BackupPopover'
import { IconButton, InputBase, InputAdornment } from '@material-ui/core'
import MenuIcon from '~/icons/menu'
import SettingsIcon from '~/icons/settings'
import Button from '@material-ui/core/Button'
import { useSelector } from 'react-redux'
import { getBackupExists, getBackupReadOnly } from 'store/modules/backup'

type HeaderProps = {
  searchTerm: string
  onCategories: () => void
  onSearchChange: (newValue: string) => void
  onAddBookmark: () => void
  onSettings: () => void
}

type HeaderLeftButtonProps = {
  onClick: () => void
}

type HeaderRightButtonProps = {
  onClick: () => void
  onAdd: () => void
  backupPopoverEnabled: boolean
  backupReadOnly?: boolean
}

const HeaderLeftButton = (props: HeaderLeftButtonProps) => (
  <IconButton onClick={props.onClick}>
    <MenuIcon />
  </IconButton>
)

const HeaderRightButton = (props: HeaderRightButtonProps) => (
  <>
    {props.backupPopoverEnabled && <BackupPopover />}
    <IconButton onClick={props.onClick}>
      <SettingsIcon />
    </IconButton>
    {!props.backupReadOnly && (
      <Button
        variant="outlined"
        style={{ color: '#fff', borderRadius: '10px', borderColor: 'white' }}
        onClick={() => props.onAdd()}
      >
        Add Bookmark
      </Button>
    )}
  </>
)

export const MainScreenHeader = (props: HeaderProps) => {
  const backupExists = useSelector(getBackupExists)
  const backupReadOnly = useSelector(getBackupReadOnly)

  return (
    <Header>
      <FlexContainer>
        <Section>
          <HeaderLeftButton onClick={props.onCategories} />
          <SearchBox
            placeholder="Search…"
            value={props.searchTerm}
            onChange={(e) => props.onSearchChange(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
            autoFocus
            fullWidth
            style={{ color: 'white' }}
            startAdornment={
              <InputAdornment position="start">
                <HelpPopover />
              </InputAdornment>
            }
          />
        </Section>
        <Section>
          <HeaderRightButton
            backupPopoverEnabled={backupExists}
            onAdd={props.onAddBookmark}
            onClick={props.onSettings}
            backupReadOnly={backupReadOnly}
          />
        </Section>
      </FlexContainer>
    </Header>
  )
}

const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const SearchBox = styled(InputBase)`
  color: inherit;
  padding: 3px 3px 3px 7px;
  border: 2px solid #90a4ae;
  border-radius: 7px;
  font-size: 22px;
  color: white;
  width: 100%;
`
