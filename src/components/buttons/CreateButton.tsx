import React from 'react'
import { ButtonProps, Button } from './common'

const CreateButton = ({ onClick, fill }: ButtonProps) => (
  <Button onClick={onClick}>
    <div>
      <_SVG fill={fill} />
    </div>
  </Button>
)

export default CreateButton

const _SVG = ({ fill = 'white' }: { fill?: string }) => {
  return (
    <svg fill={fill} width="48" height="48" viewBox="0 0 48 48">
      <path d="M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z" />
    </svg>
  )
}
