import React from 'react'
import styled from 'styled-components'
// Header Components
import HeaderContainer from '~/components/header/HeaderContainer'
import HeaderLeft from '~/components/header/HeaderLeft'
import HeaderTitle from '~/components/header/HeaderTitle'
import BackButton from '~/components/buttons/BackButton'

export type TagsViewProps = {
  onBack: () => void
}

type TagItemProps = {
  selected: boolean
  label: string
  onClick: (label: string) => void
}

const Header = (props: TagsViewProps) => (
  <HeaderContainer>
    <HeaderLeft>
      <BackButton onClick={props.onBack} />
      <HeaderTitle>Tags</HeaderTitle>
    </HeaderLeft>
  </HeaderContainer>
)

const Content = () => (
  <TagList>
    <TagItem selected={false} label="Foo" onClick={() => {}} />
    <TagItem selected={true} label="Bar" onClick={() => {}} />
  </TagList>
)

const TagItem = (props: TagItemProps) => {
  return (
    <TagListItem onClick={() => props.onClick(props.label)}>
      {props.selected ? <CheckedIcon /> : <UncheckedIcon />}
      <p>{props.label}</p>
    </TagListItem>
  )
}

const UncheckedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
)

const CheckedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

const View = (props: TagsViewProps) => {
  return (
    <>
      <Header onBack={props.onBack} />
      <Content />
    </>
  )
}

export default View

const TagListItem = styled.button`
  background: none;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    font-family: Roboto, sans-serif;
    padding-left: 2.5em;
  }
`

const TagList = styled.div`
  display: flex;
  flex-direction: column;
`
