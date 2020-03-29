// This hangs off of the main screen and provides
// A popover the component the user can toggle to view
// The current state of their backup. Update the backup or
// Make other changes
import React, { useState, MouseEvent } from 'react'
import { IconButton, Popover } from '@material-ui/core'
import SyncIcon from '~/icons/sync'
import { BackupCard } from '~/settings/gist/BackupCard'
import styled from 'styled-components'

export const BackupPopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <SyncIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <PopoverContainer>
          <BackupCard noCard />
        </PopoverContainer>
      </Popover>
    </>
  )
}

const PopoverContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
