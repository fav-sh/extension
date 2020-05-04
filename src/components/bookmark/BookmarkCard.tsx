import React from 'react'
import styled from 'styled-components'

type ButtonProps = {
  onClick: () => void
}

type CardProps = {
  header: string
  link: string
  onEdit: () => void
}

const BookmarkCard = ({ header, link, onEdit }: CardProps) => {
  return (
    <_Container>
      <_Left>
        <_CardHeader href={link}>{header}</_CardHeader>
        <_CardLink href={link}>{link}</_CardLink>
      </_Left>
      <_Right>
        <_EditButton onClick={onEdit} />
      </_Right>
    </_Container>
  )
}

export default BookmarkCard

const _EditButton = ({ onClick }: ButtonProps) => (
  <_CardButton onClick={onClick}>
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path d="M2 12.88V16h3.12L14 7.12 10.88 4 2 12.88zm14.76-8.51c.33-.33.33-.85 0-1.18l-1.95-1.95c-.33-.33-.85-.33-1.18 0L12 2.88 15.12 6l1.64-1.63z" />
    </svg>
  </_CardButton>
)

const _Container = styled.div`
  width: 450px;
  height: 65px;
  border-bottom: 1px solid #78909c;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 0px;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`

const _Left = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const _Right = styled.div`
  width: 100px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
const _CardButton = styled.button`
  border: none;
  background: none;
  flex-grow: 0;
  width: 75px;
`

const _CardHeader = styled.a`
  font-size: 18px;
  text-decoration: none;
  font-family: Roboto, sans-serif;
  color: #212121;
  :hover {
    color: #2196f3;
  }
`
const _CardLink = styled.a`
  font-size: 14px;
  text-decoration: none;
  font-family: Roboto, sans-serif;
  color: #2196f3;
  :hover {
    text-decoration: underline;
  }
`
