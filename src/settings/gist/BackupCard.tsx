import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
        <div>
          <h3>Backup Created {smoothLoading && <p>Loading</p>}</h3>
          <p>{`Filename: ${backup.backupFilename}`}</p>
          <p>{`Gist ID: ${backup.backupGistID}`}</p>
          {backup.backupDescription && (
            <p>{`Description: ${backup.backupDescription}`}</p>
          )}
          {!readOnlyBackup && (
            <div>
              <p>Checkbox wip</p>
              {/* <Checkbox
                onChange={togglePassiveUpdate}
                checked={passiveUpdateEnabled}
              />
              Automatically backup on file changes */}
            </div>
          )}
        </div>
        <div>
          <a href={backup.backupUrl}>Open on Web</a>
          <button onClick={handleUpdate} disabled={smoothLoading}>
            {readOnlyBackup ? 'Fetch Updates' : 'Write Updates'}
          </button>
          <button
            onClick={() => dispatch(backupActions.clearBackup())}
            disabled={smoothLoading}
          >
            Delete
          </button>
        </div>
      </>
    )
  }

  if (noCard) {
    return renderContent()
  }

  return <div>{renderContent()}</div>
}
