import React from 'react'
import { ButtonProps, Button } from './common'

const BackButton = ({ onClick }: ButtonProps) => (
  <Button onClick={onClick}>
    <div>
      <_SVG />
    </div>
  </Button>
)

export default BackButton

const _SVG = () => {
  return (
    <svg fill="white" width="24" height="24" viewBox="0 0 24 24">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
  )
}
