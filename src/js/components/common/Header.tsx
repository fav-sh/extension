import React, { ReactNode } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

export const HeaderText = ({ children }: { children: string }) => (
  <Typography variant="h6">{children}</Typography>
)

export default ({ children }: { children: ReactNode }) => {
  return (
    <AppBar position="static">
      <Toolbar>{children}</Toolbar>
    </AppBar>
  )
}
