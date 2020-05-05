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

export const BackupCard = () => {
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

  return (
    <OuterContainer>
      <div>
        <h3>Backup Created {smoothLoading && <p>Loading</p>}</h3>
        <Field>{`Filename: ${backup.backupFilename}`}</Field>
        <Field>{`Gist ID: ${backup.backupGistID}`}</Field>
        {backup.backupDescription && (
          <Field>{`Description: ${backup.backupDescription}`}</Field>
        )}
        {!readOnlyBackup && (
          <div>
            <input
              type="checkbox"
              onChange={togglePassiveUpdate}
              checked={passiveUpdateEnabled}
            />
            <label htmlFor="passive-update-checkbox">
              &nbsp;Automatically backup on file changes
            </label>
          </div>
        )}
      </div>
      <ButtonContainer>
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
      </ButtonContainer>
    </OuterContainer>
  )
}

const OuterContainer = styled.div`
  padding: 0.25em;
  display: flex;
  flex-direction: column;
  font-family: Roboto, sans-serif;
  max-width: 350px;
`

const Field = styled.p`
  font-size: 14px;
`

const ButtonContainer = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  button,
  a {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
`
