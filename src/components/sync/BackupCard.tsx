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
import LinkButton, { Link } from '../common/LinkButton'

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
        <Link href={backup.backupUrl}>Open on Web</Link>
        <LinkButton onClick={handleUpdate} disabled={smoothLoading}>
          {readOnlyBackup ? 'Fetch Updates' : 'Write Updates'}
        </LinkButton>
        <LinkButton
          onClick={() => dispatch(backupActions.clearBackup())}
          disabled={smoothLoading}
        >
          Delete
        </LinkButton>
      </ButtonContainer>
    </OuterContainer>
  )
}

const OuterContainer = styled.div`
  padding: 0.25em;
  display: flex;
  flex-direction: column;
  align-self: center;
  font-family: Roboto, sans-serif;
  max-width: 450px;
  border: 1px solid #ccc;
  padding: 0.5em;
  margin-bottom: 2em;
`

const Field = styled.p`
  font-size: 16px;
  margin-top: 0.1em;
  padding: 0;
`

const ButtonContainer = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: row;
`
