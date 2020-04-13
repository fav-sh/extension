import React, { ReactNode } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

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
