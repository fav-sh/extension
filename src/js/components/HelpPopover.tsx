// This hangs off of the main screen and provides
// A popover the component the user can over over
// to see tips on how to use teh search box.
import React, { useState, MouseEvent } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import QuestionIcon from '~/icons/question'

export const HelpPopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleOpen}>
        <QuestionIcon />
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
          <Typography variant="h5">Search Tips</Typography>
          <Section>
            <Typography variant="h6">Search By Name</Typography>
            <Typography variant="body2">
              To search by name just enter the name of the bookmark
              <br />
              <CodeSpan>search term</CodeSpan>
            </Typography>
          </Section>

          <Section>
            <Typography variant="h6">Search By Tags</Typography>
            <Typography variant="body2">
              To search by tags, use
              <br /> <CodeSpan>tag:</CodeSpan>
            </Typography>
            <Typography variant="body2">
              You can also search for multiple tags
              <br />
              <CodeSpan>tag:tag1,tag2,tag3</CodeSpan>
            </Typography>
          </Section>

          <Section>
            <Typography variant="h6">Search With Both</Typography>
            <Typography variant="body2">
              You can also mix and match tags and name search like so:
              <br />
              <CodeSpan>tag:tag1,tag2 search term tag:tag3</CodeSpan>
            </Typography>
          </Section>
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
  padding: 1em;
`

const CodeSpan = styled.span`
  font-family: monospace;
  color: blue;
`

const Section = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
`
