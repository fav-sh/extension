import React from 'react'
import { ButtonProps, Button } from './common'

const MenuButton = ({ onClick }: ButtonProps) => (
  <Button onClick={onClick}>
    <div>
      <_SVG />
    </div>
  </Button>
)

export default MenuButton

const _SVG = () => {
  return (
    <svg fill="white" width="24" height="24" viewBox="0 0 24 24">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  )
}
