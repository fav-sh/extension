import React, { useState } from 'react'
// Header Components
import HeaderContainer from '~/components/header/HeaderContainer'
import HeaderLeft from '~/components/header/HeaderLeft'
import HeaderTitle from '~/components/header/HeaderTitle'
import BackButton from '~/components/buttons/BackButton'

export type TagsViewProps = {
  onBack: () => void
}

const Header = (props: TagsViewProps) => (
  <HeaderContainer>
    <HeaderLeft>
      <BackButton onClick={props.onBack} />
      <HeaderTitle>Tags</HeaderTitle>
    </HeaderLeft>
  </HeaderContainer>
)

const Content = () => <h1>tags sidebar WIP</h1>

const View = (props: TagsViewProps) => {
  return (
    <>
      <Header onBack={props.onBack} />
      <Content />
    </>
  )
}

export default View
