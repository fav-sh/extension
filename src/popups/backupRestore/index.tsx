import React from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import LinkButton from '~/components/common/LinkButton'
import FileUploader from '~/components/FileUploader'
import Text from '~/components/common/Text'

const Heading = styled.h2`
  font-family: Roboto, sans-serif;
`

const App = () => {
  return (
    <>
      <Heading>Local Backup</Heading>
      <Text>
        You can backup your bookmarks to a JSON file by clicking the button
        below
      </Text>
      <LinkButton>Download Bookmarks</LinkButton>
      <Heading>Local Restore</Heading>
      <Text>Restore your bookmarks from a JSON file</Text>
      <FileUploader onFile={(file) => console.log(file)} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
