import React from 'react'
import styled from 'styled-components'

export const SectionContainer = styled.div`
  padding-top: 2em;
  padding-bottom: 2em;
`

export const SectionContent = styled.div`
  padding: 1em;
`

export const PaddedAction = styled.div`
  margin-top: 0.5em;
`

export const DownloadInputContainer = styled(PaddedAction)`
  display: flex;
  flex-direction: row;
`

export const SettingsButton = ({
  text,
  onClick,
  disabled,
}: {
  text: string
  onClick: () => void
  disabled?: boolean
}) => (
  <button disabled={disabled} onClick={onClick}>
    {text}
  </button>
)

export const SettingsTextField = ({
  value,
  onChange,
  disabled,
  style,
}: {
  value: string
  onChange: (text: string) => void
  label: string
  disabled?: boolean
  style?: object
}) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
    style={style}
  />
)

export const SectionHeader = styled.h4`
  font-family: Roboto, sans-serif;
`
