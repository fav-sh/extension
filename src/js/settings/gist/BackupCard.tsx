import {
  CardContent,
  Typography,
  CardActions,
  Button,
  Card,
  Checkbox,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import {
  getBackup,
  updateBackupThunk,
  actions as backupActions,
} from '~/store/modules/backup'
import styled from 'styled-components'

export const BackupCard = ({ noCard }: { noCard?: boolean }) => {
  const dispatch = useDispatch()
  const backup = useSelector(getBackup)

  const handleUpdate = () => dispatch(updateBackupThunk())

  const renderContent = () => {
    return (
      <>
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
          <Typography variant="body2" color="textSecondary" component="p">
            <Checkbox />
            Automatically backup on file changes
          </Typography>
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
      </>
    )
  }

  if (noCard) {
    return renderContent()
  }

  return <MarginCard>{renderContent()}</MarginCard>
}

const MarginCard = styled(Card)`
  margin-top: 0.5em;
  max-width: 400px;
`
