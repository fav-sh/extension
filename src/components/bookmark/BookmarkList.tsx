import React from 'react'
import styled from 'styled-components'
import { ReactNode } from 'react'

export const BookmarkList = ({ children }: { children: ReactNode }) => (
  <_Outer>
    <_Inner>{children}</_Inner>
  </_Outer>
)

const _Outer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 450px;
  flex-grow: 1;
`

const _Inner = styled.div`
  padding-bottom: 2.5em;
`

export default BookmarkList
