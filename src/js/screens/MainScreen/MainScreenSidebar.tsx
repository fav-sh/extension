import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { getTags } from '~/store/modules/bookmarks'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Checkbox from '@material-ui/core/Checkbox'
import { getActiveTags } from '~/store/modules/tags'
import includes from 'lodash/fp/includes'
import { actions as activeTagActions } from '~/store/modules/tags'

type CategoryItemProps = {
  selected: boolean
  onSelect: (label: string) => void
  label: string
}

const CategoryItem = (props: CategoryItemProps) => {
  return (
    <ListItem button onClick={() => props.onSelect(props.label)}>
      <ListItemIcon>
        <Checkbox edge="start" checked={props.selected} disableRipple />
      </ListItemIcon>
      <ListItemText primary={props.label} />
    </ListItem>
  )
}

export const MainScreenSidebar = () => {
  const dispatch = useDispatch()
  const tags = useSelector(getTags)
  const activeTags = useSelector(getActiveTags)

  const isTagSelected = (tag: string) => includes(tag, activeTags)

  const handleSelect = (tag: string) => {
    if (isTagSelected(tag)) {
      dispatch(activeTagActions.removeTag(tag))
    } else {
      dispatch(activeTagActions.addTag(tag))
    }
  }
  return (
    <TagsContainer>
      <List>
        <ListItem>
          <ListItemText>Tags</ListItemText>
        </ListItem>
        <Divider />
        {tags.map((tag) => {
          return (
            <CategoryItem
              key={tag.toLowerCase().replace(' ', '-')}
              onSelect={() => handleSelect(tag)}
              selected={isTagSelected(tag)}
              label={tag}
            />
          )
        })}
      </List>
    </TagsContainer>
  )
}

const TagsContainer = styled.div`
  height: 100%;
  width: 300px;
`
