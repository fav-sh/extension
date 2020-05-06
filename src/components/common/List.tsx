import React from 'react'
import styled from 'styled-components'
import { ReactNode } from 'react'

export const List = ({
  children,
  innerPadding,
}: {
  children: ReactNode
  innerPadding?: string
}) => (
  <_Outer>
    <_Inner innerPadding={innerPadding}>{children}</_Inner>
  </_Outer>
)

const _Outer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 525px;
  flex-grow: 1;
`

const _Inner = styled.div`
  padding-bottom: 2.5em;
  padding: ${(props: { innerPadding?: string }) => props.innerPadding};
`

export default List
