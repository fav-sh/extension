import React, { useState } from 'react'
// Header Components
import HeaderContainer from '../components/header/HeaderContainer'
import HeaderLeft from '../components/header/HeaderLeft'
import HeaderRight from '../components/header/HeaderRight'
import HeaderTitle from '../components/header/HeaderTitle'
// Header Buttons
import SaveButton from '../components/buttons/SaveButton'
import BackButton from '../components/buttons/BackButton'
// Editor Form Components
import {
  ContentContainer,
  Section,
  TagsContainer,
} from '../components/editor/Form'
import Label from '../components/editor/Label'
import Tag from '../components/editor/Tag'
import TextArea from '../components/editor/TextArea'
import Input from '../components/editor/Input'
import { Dropdown, DropdownItem } from '../components/editor/Dropdown'
import { FlexRow } from '../components/common/FlexContainer'

export type EditorViewProps = {
  onCreate: () => void
  onCancel: () => void
}

const TagsDropdown = () => {
  const [tags, setTags] = useState<string[]>([
    'Select a Tag',
    'foo',
    'bar',
    'baz',
    'bat',
  ])
  return (
    <>
      <FlexRow>
        <Dropdown>
          {tags.map((tag: string, index: number) => {
            return (
              <DropdownItem key={index} value={tag}>
                {tag}
              </DropdownItem>
            )
          })}
        </Dropdown>
        <Input style={{ marginLeft: '0.25em' }} placeholder="Enter new Tag" />
      </FlexRow>
      <TagsContainer>
        {tags.slice(1, tags.length - 1).map((tag: string, index: number) => {
          return <Tag key={index}>{tag}</Tag>
        })}
      </TagsContainer>
    </>
  )
}

export const Content = () => (
  <ContentContainer>
    <Section>
      <Label>Bookmark Name</Label>
      <Input placeholder="Awesome cats on the internet" />
    </Section>
    <Section>
      <Label>Bookmark URL</Label>
      <Input placeholder="https://awesome.cats" />
    </Section>
    <Section>
      <Label>Bookmark Description</Label>
      <TextArea placeholder="Check out these awesome cats" />
    </Section>
    <TagsDropdown />
  </ContentContainer>
)

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
  return (
    <>
      <Header onCreate={props.onCreate} onCancel={props.onCancel} />
      <Content />
    </>
  )
}

export default View
