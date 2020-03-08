import React, { useEffect, useState } from 'react'
import Header, { HeaderText } from '~/components/common/Header'
import {
  IconButton,
  TextField,
  Button,
  Select,
  MenuItem,
  Chip,
} from '@material-ui/core'
import styled from 'styled-components'
import { navigate } from '~/store/modules/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { actions, getTags } from '~/store/modules/bookmarks'
import { Bookmark } from '~/types/Bookmark'
import { generateBookmarkGuid } from '~/helpers'
import { getActiveTab, Tab } from '~/browser/getTabInfo'
import {
  getEditingBookmark,
  actions as editingActions,
} from '~/store/modules/editing'
import { Tag } from '~/types/Tag'
import remove from 'lodash/fp/remove'
import uniq from 'lodash/fp/uniq'
import BackArrow from '~/icons/backArrow'
import AddIcon from '~/icons/add'

const HeaderLeftButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton onClick={onClick}>
    <BackArrow />
  </IconButton>
)

export const AddScreen = () => {
  const existingTags = useSelector(getTags)
  const editingBookmark = useSelector(getEditingBookmark)
  const freshGuid = generateBookmarkGuid()

  const [guid] = useState<string>(editingBookmark?.guid || freshGuid)
  const [name, setName] = useState<string>(editingBookmark?.name || '')
  const [href, setHref] = useState<string>(editingBookmark?.href || '')
  const [desc, setDesc] = useState<string>(editingBookmark?.desc || '')
  const [currentTag, setCurrentTag] = useState<string>('')
  const [tags, setTags] = useState<string[]>(editingBookmark?.tags || [])

  useEffect(() => {
    if (!editingBookmark) {
      getActiveTab((tab: Tab) => {
        setName(tab.title)
        setHref(tab.url)
      })
    }
  }, [])

  const dispatch = useDispatch()

  const goBack = () => {
    dispatch(editingActions.clearEditing())
    dispatch(navigate('home'))
  }

  const submitTag = () => {
    const newTags = currentTag.split(',')
    setTags(uniq([...tags, ...newTags]))
    setCurrentTag('')
  }

  const submitMenuTag = (event: any) => {
    const tag = event.target.value
    setTags(uniq([...tags, tag]))
  }

  const handleDeleteTag = (tag: Tag) => {
    setTags(remove((item) => item === tag, tags))
  }

  const createBookmark = () => {
    const bookmark: Bookmark = {
      guid,
      name,
      href,
      desc,
      tags,
    }

    dispatch(actions.add(bookmark))
    dispatch(editingActions.clearEditing())
    dispatch(navigate('home'))
  }

  const renderHeader = () => (
    <Header>
      <FlexContainer>
        <Section>
          <HeaderLeftButton onClick={goBack} />
          <HeaderText>Add</HeaderText>
        </Section>
        <Section>
          <ConfirmButton variant="outlined" onClick={createBookmark}>
            Submit
          </ConfirmButton>
        </Section>
      </FlexContainer>
    </Header>
  )

  const renderChips = () => {
    return (
      <ChipContainer>
        {tags.map((tag) => {
          return (
            <CategoryChip
              key={tag}
              label={tag}
              onDelete={() => handleDeleteTag(tag)}
            />
          )
        })}
      </ChipContainer>
    )
  }

  const renderCategories = () => (
    <>
      <CategoriesContainer>
        <CategoriesSelect
          variant="outlined"
          placeholder="Tags"
          onChange={submitMenuTag}
          disabled={existingTags.length === 0}
        >
          {existingTags.map((tag) => {
            return <MenuItem value={tag}>{tag}</MenuItem>
          })}
        </CategoriesSelect>
        <CategoriesText
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          label="Add New Tag"
          variant="outlined"
          onKeyUp={(event) => {
            // This is so when the user hits the enter
            // Key after entering a tag we can submit the tag
            // Event.keycode 13 is the enter key
            if (event && event.keyCode === 13) {
              submitTag()
            }
          }}
        />
        <IconButton onClick={submitTag}>
          <AddIcon />
        </IconButton>
      </CategoriesContainer>
      {renderChips()}
    </>
  )

  const renderForm = () => (
    <FormContainer>
      <FieldsContainer>
        <Text
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          variant="outlined"
        />
        <Text
          value={href}
          onChange={(e) => setHref(e.target.value)}
          label="Website"
          variant="outlined"
        />
        <Text
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          label="Description"
          variant="outlined"
          multiline
          rows="4"
        />
        {renderCategories()}
      </FieldsContainer>
    </FormContainer>
  )

  return (
    <>
      {renderHeader()}
      {renderForm()}
    </>
  )
}

const CategoryChip = styled(Chip)`
  margin: 0.5em;
`

const ChipContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Text = styled(TextField)`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`

const CategoriesSelect = styled(Select)`
  flex-grow: 1;
  width: 150px;
  text-overflow: ellipsis;
  margin-right: 5px;
`

const CategoriesText = styled(Text)`
  flex-grow: 2;
`

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ConfirmButton = styled(Button)`
  color: #fff;
  border-color: #fff;
  margin-left: 0.25em;
  margin-right: 0.25em;
  font-size: 14px;
`

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.25em;
  padding-left: 0.75em;
  padding-right: 0.75em;
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
`
