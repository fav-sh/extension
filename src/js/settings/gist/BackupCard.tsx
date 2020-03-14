import {
  CardContent,
  Typography,
  CardActions,
  Button,
  Card,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import {
  getBackup,
  updateBackupThunk,
  actions as backupActions,
} from '~/store/modules/backup'
import styled from 'styled-components'

export const BackupCard = () => {
  const dispatch = useDispatch()
  const backup = useSelector(getBackup)

  const handleUpdate = () => dispatch(updateBackupThunk())

  if (!backup) {
    return null
  }

  return (
    <MarginCard>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h3">
          Backup Created
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {`Filename: ${backup.backupFilename}`}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {`Gist ID: ${backup.backupGistID}`}
        </Typography>
        {backup.backupDescription && (
          <Typography variant="body2" color="textSecondary" component="p">
            {`Description: ${backup.backupDescription}`}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" href={backup.backupUrl}>
          Open on Web
        </Button>
        <Button size="small" color="primary" onClick={handleUpdate}>
          Update
        </Button>
        <Button
          size="small"
          color="secondary"
          onClick={() => dispatch(backupActions.clearBackup())}
        >
          Delete
        </Button>
      </CardActions>
    </MarginCard>
  )
}

const MarginCard = styled(Card)`
  margin-top: 0.5em;
`
