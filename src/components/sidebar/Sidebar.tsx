import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'

type Props = {
  visible: boolean
  children: ReactNode
}

const _CategoryItem = ({ name }: { name: string }) => {
  const [checked, setChecked] = useState(false)
  return (
    <CheckboxContainer onClick={() => setChecked(!checked)}>
      <Checkbox type="checkbox" checked={checked} />
      <CheckboxText htmlFor="category-item">{name}</CheckboxText>
    </CheckboxContainer>
  )
}

export default ({ visible, children }: Props) => {
  return (
    <OuterContainer>
      {visible && (
        <SidebarContainer>
          <Header>Tags</Header>
          <Divider />
          <TagContainer>
            <_CategoryItem name="foo" />
            <_CategoryItem name="bar" />
            <_CategoryItem name="baz" />
            <_CategoryItem name="bat" />
          </TagContainer>
        </SidebarContainer>
      )}
      <>{children}</>
    </OuterContainer>
  )
}

const OuterContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const SidebarContainer = styled.div`
  min-width: 250px;
  border-right: 1px solid #ccc;
`

const Header = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  font-family: Roboto, sans-serif;
  padding: 0.5em;
`

const Divider = styled.hr`
  margin-top: 0;
  padding-top: 0;
`

const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const CheckboxContainer = styled.button`
  padding-top: 1em;
  padding-bottom: 1em;
  display: flex;
  flex-direction: row;
  background: none;
  border: none;
`

const Checkbox = styled.input``

const CheckboxText = styled.label`
  font-family: Roboto, sans-serif;
`
