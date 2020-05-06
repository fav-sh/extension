import React from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import LinkButton from '~/components/common/LinkButton'
import FileUploader from '~/components/FileUploader'
import Text from '~/components/common/Text'
import { configureStore } from '~/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { getBookmarks, BookmarkState } from '~/store/modules/bookmarks'
import {
  transformExportBookmark,
  validateBookmark,
  generateBookmarkGuid,
  transformImportBookmark,
} from '~/helpers'
import { saveAs } from 'file-saver'
import { ExportedBookmark } from '~/types/Bookmark'
import { actions } from '~/store/modules/bookmarks'
import { error, success } from '~/components/common/Toast'

const Heading = styled.h2`
  font-family: Roboto, sans-serif;
`

const App = () => {
  const dispatch = useDispatch()
  const bookmarks = useSelector(getBookmarks)
  console.log(bookmarks)

  const handleBackup = () => {
    if (bookmarks && Object.keys(bookmarks).length > 0) {
      // Transform the bookmarks
      const transformedBookmarks = Object.keys(bookmarks).map((key) => {
        return transformExportBookmark(bookmarks[key])
      })

      // Stringify the results
      const bookmarksToExport = JSON.stringify(transformedBookmarks, null, 2)

      // Convert to a blob
      const bookmarksBlob = new Blob([bookmarksToExport], {
        type: 'application/json',
      })

      // Ssve the file to the users computer
      saveAs(bookmarksBlob, 'fav-bookmarks.json')
      return
    }
  }

  const handleRestore = (content: any) => {
    let bookmarks: BookmarkState = {}
    try {
      // Convert the JSON file to a JS object
      const parsedBookmarks = JSON.parse(content)

      // Validate every bookmark inside
      parsedBookmarks.forEach((bookmark: ExportedBookmark) => {
        if (!validateBookmark(bookmark)) {
          error('Could not import bookmarks')
          return
        } else {
          const bookmarkGuid = generateBookmarkGuid()
          bookmarks = {
            ...bookmarks,
            [bookmarkGuid]: transformImportBookmark(bookmark, bookmarkGuid),
          }
        }
      })
    } catch {
      // Catch case if the JSON file is invalid
      error('Could not import bookmarks')
      return
    } finally {
      dispatch(actions.setBookmarks(bookmarks))
      success('Restore sucessfull!')
      return
    }
  }

  return (
    <>
      <Heading>Local Backup</Heading>
      <Text>
        You can backup your bookmarks to a JSON file by clicking the button
        below
      </Text>
      <LinkButton onClick={handleBackup}>Download Bookmarks</LinkButton>
      <Heading>Local Restore</Heading>
      <Text>Restore your bookmarks from a JSON file</Text>
      <Text>
        NOTE: This will overwrite any existing bookmarks you have. Make sure to
        backup any existing bookmarks before restoring
      </Text>
      <FileUploader onFile={handleRestore} />
    </>
  )
}

const withRedux = (Component: () => JSX.Element) => {
  const { store, persistor } = configureStore()
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component />
      </PersistGate>
    </Provider>
  )
}

ReactDOM.render(withRedux(App), document.getElementById('root'))
