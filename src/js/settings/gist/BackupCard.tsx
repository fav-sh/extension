import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CardContent,
  Typography,
  CardActions,
  Button,
  Card,
  Checkbox,
  CircularProgress,
} from '@material-ui/core'
import {
  getBackup,
  updateBackupThunk,
  actions as backupActions,
  getBackupReadOnly,
  passivePullUpdates,
  getBackupLoading,
} from '~/store/modules/backup'
import styled from 'styled-components'
import {
  actions as settingsActions,
  getAutoUpdateBackup,
} from '~/store/modules/settings'

export const BackupCard = ({ noCard }: { noCard?: boolean }) => {
  const dispatch = useDispatch()
  const backup = useSelector(getBackup)
  const passiveUpdateEnabled = useSelector(getAutoUpdateBackup)
  const readOnlyBackup = useSelector(getBackupReadOnly)
  const backupLoading = useSelector(getBackupLoading)

  const [smoothLoading, setSmoothLoading] = useState(false)

  useEffect(() => {
    if (backupLoading) {
      setSmoothLoading(true)
    } else {
      setTimeout(() => {
        setSmoothLoading(false)
      }, 1000)
    }
  }, [backupLoading])

  const togglePassiveUpdate = () =>
    dispatch(settingsActions.toggleAutoUpdate(!passiveUpdateEnabled))

  const handleUpdate = () =>
    readOnlyBackup
      ? dispatch(passivePullUpdates())
      : dispatch(updateBackupThunk())

  const renderContent = () => {
    return (
      <>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h3">
            Backup Created {smoothLoading && <CircularProgress size={16} />}
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
          {!readOnlyBackup && (
            <Typography variant="body2" color="textSecondary" component="p">
              <Checkbox
                onChange={togglePassiveUpdate}
                checked={passiveUpdateEnabled}
              />
              Automatically backup on file changes
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            href={backup.backupUrl}
            disabled={smoothLoading}
          >
            Open on Web
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={handleUpdate}
            disabled={smoothLoading}
          >
            {readOnlyBackup ? 'Fetch Updates' : 'Write Updates'}
          </Button>
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(backupActions.clearBackup())}
            disabled={smoothLoading}
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
