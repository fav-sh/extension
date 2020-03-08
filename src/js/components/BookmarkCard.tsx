import React from 'react'
import { IconButton } from '@material-ui/core'
import { Bookmark } from '~/types/Bookmark'
import styled from 'styled-components'
import { actions as editingActions } from '~/store/modules/editing'
import { actions as bookmarkActions } from '~/store/modules/bookmarks'
import { navigate } from '~/store/modules/navigation'
import { useDispatch } from 'react-redux'

import EditIcon from '~/icons/edit'
import DeleteIcon from '~/icons/delete'

export const BookmarkCard = (bookmark: Bookmark) => {
  const dispatch = useDispatch()

  const onEdit = () => {
    dispatch(editingActions.setEditing(bookmark))
    dispatch(navigate('add'))
  }

  const onRemove = () => dispatch(bookmarkActions.remove(bookmark.guid))

  return (
    <Card>
      <FlexCol>
        <Link href={bookmark.href}>{bookmark.name}</Link>
        <SmallLink href={bookmark.href}>{bookmark.href}</SmallLink>
      </FlexCol>
      <FlexRow>
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </FlexRow>
    </Card>
  )
}

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  padding-left: 0.1em;
  border-bottom: 1.5px solid #c9d6df;
`

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`

const FlexRow = styled.div`
  display: flex;
  flex-dirction: row;
`

const Link = styled.a`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 375px;
  font-size: 18px;
  text-decoration: none;
  font-family: Roboto;
  line-height: 1.5em;
  padding-left: 0.25em;
  color: #424242;
  :visited {
    color: #424242;
  }
  :hover {
    color: #0277bd;
  }
`

const SmallLink = styled(Link)`
  font-size: 12.5px;
`
