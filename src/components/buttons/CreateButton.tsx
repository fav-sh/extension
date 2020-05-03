import React from 'react'
import { ButtonProps, Button } from './common'

const CreateButton = ({ onClick }: ButtonProps) => (
  <Button onClick={onClick}>
    <div>
      <_SVG />
    </div>
  </Button>
)

export default CreateButton

const _SVG = () => {
  return (
    <svg fill="white" width="48" height="48" viewBox="0 0 48 48">
      <path d="M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z" />
    </svg>
  )
}
