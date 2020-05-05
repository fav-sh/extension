import React from 'react'
import styled from 'styled-components'

type TagProps = {
  children: string
  onDelete?: (tag: string) => void
}

const Tag = (props: TagProps) => (
  <_TagContainer>
    <_TagText>{props.children}</_TagText>
    <_TagDeleteButton
      onClick={() => props.onDelete && props.onDelete(props.children)}
    >
      <_SVG />
    </_TagDeleteButton>
  </_TagContainer>
)

export default Tag

const _SVG = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
  </svg>
)

const _TagText = styled.p`
  font-weight: bold;
  font-size: 14px;
  padding: 0;
  margin: 0;
`

const _TagContainer = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  border: 1px solid #ccc;
  margin: 0.25em;
  padding: 0.25em;
  border-radius: 5px;
`
const _TagDeleteButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
`
