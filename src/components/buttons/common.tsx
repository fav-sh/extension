import styled from 'styled-components'

export const Button = styled.button`
  height: 45px;
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  border: 0;
  background: none;
`

export type ButtonProps = {
  onClick: () => void
}
