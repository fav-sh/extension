import React, { useState, useEffect } from 'react'
// Header Components
import HeaderContainer from '~/components/header/HeaderContainer'
import HeaderLeft from '~/components/header/HeaderLeft'
import HeaderRight from '~/components/header/HeaderRight'
import HeaderTitle from '~/components/header/HeaderTitle'
// Header Buttons
import SaveButton from '~/components/buttons/SaveButton'
import BackButton from '~/components/buttons/BackButton'
// Editor Form Components
import { ContentContainer, Section } from '~/components/editor/Form'
import Label from '~/components/editor/Label'
import TextArea from '~/components/editor/TextArea'
import Input from '~/components/editor/Input'
import { useSelector, useDispatch } from 'react-redux'
import { getTags, addBookmarkThunk } from '~/store/modules/bookmarks'
import { generateBookmarkGuid } from '~/helpers'
import { getEditingBookmark } from '~/store/modules/editing'
import { getActiveTab } from '~/browser/getTabInfo'
import { Bookmark } from '~/types/Bookmark'
import styled from 'styled-components'

import Creatable from 'react-select/creatable'

export type EditorViewProps = {
  onCreate: () => void
  onCancel: () => void
}

type TagsDropdownProps = {
  tags: string[]
  existingTags: string[]
  onChange: (tags: string[]) => void
}

const TagsDropdown = ({ tags, existingTags, onChange }: TagsDropdownProps) => {
  /** tags = tags that are currently on the bookmark */
  /** existing tags = tags that are on other bookmarks */
  const value = tags.map((item) => ({
    label: item,
    value: item,
  }))
  const dropdownOptions = existingTags.map((item) => ({
    label: item,
    value: item,
  }))

  // TODO: Better type here
  const handleChange = (newOptions: any) => {
    const transformedOptions = newOptions.map(
      (item: { value: string }) => item.value
    )
    onChange(transformedOptions)
  }

  return (
    <Creatable
      isMulti
      options={dropdownOptions}
      value={value}
      onChange={handleChange}
    />
  )
}

const Header = (props: EditorViewProps) => (
  <HeaderContainer>
    <HeaderLeft>
      <BackButton onClick={props.onCancel} />
      <HeaderTitle>Create Bookmark</HeaderTitle>
    </HeaderLeft>
    <HeaderRight>
      <SaveButton onClick={props.onCreate} />
    </HeaderRight>
  </HeaderContainer>
)

const View = (props: EditorViewProps) => {
  const dispatch = useDispatch()
  const existingTags = useSelector(getTags)
  const freshGuid = generateBookmarkGuid()
  const editingBookmark = useSelector(getEditingBookmark)

  const [guid] = useState<string>(editingBookmark?.guid || freshGuid)
  const [name, setName] = useState<string>(editingBookmark?.name || '')
  const [href, setHref] = useState<string>(editingBookmark?.href || '')
  const [desc, setDesc] = useState<string>(editingBookmark?.desc || '')
  const [tags, setTags] = useState<string[]>(editingBookmark?.tags || [])

  useEffect(() => {
    if (!editingBookmark) {
      getActiveTab((tab) => {
        setName(tab.title)
        setHref(tab.url)
      })
    }
  }, [])

  const handleCreateBookmark = () => {
    const bookmark: Bookmark = {
      guid,
      name,
      href,
      desc,
      tags,
    }
    dispatch(addBookmarkThunk(bookmark))
    props.onCreate()
  }

  return (
    <>
      <Header onCreate={handleCreateBookmark} onCancel={props.onCancel} />
      <ContentContainer>
        <Section>
          <Label>Bookmark Name</Label>
          <Input
            placeholder="Awesome cats on the internet"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Section>
        <Section>
          <Label>Bookmark URL</Label>
          <Input
            placeholder="https://awesome.cats"
            value={href}
            onChange={(e) => setHref(e.target.value)}
          />
        </Section>
        <Section>
          <Label>Bookmark Description</Label>
          <TextArea
            placeholder="Check out these awesome cats"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Section>
        <TagsDropdown
          existingTags={existingTags}
          tags={tags}
          onChange={(newTags: string[]) => setTags(newTags)}
        />
      </ContentContainer>
    </>
  )
}

export default View
