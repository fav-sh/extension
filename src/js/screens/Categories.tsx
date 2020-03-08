import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { getTags } from '~/store/modules/bookmarks'
import {
  ListItem,
  List,
  ListItemText,
  Divider,
  ListItemIcon,
  Checkbox,
} from '@material-ui/core'
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

export const Categories = () => {
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
  overflow-y: scroll;
  width: 300px;
`
