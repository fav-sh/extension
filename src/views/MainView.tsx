import React, { useState } from 'react'
// Header Components
import HeaderContainer from '~/components/header/HeaderContainer'
import HeaderLeft from '~/components/header/HeaderLeft'
import HeaderRight from '~/components/header/HeaderRight'
import HeaderSearch from '~/components/header/HeaderSearch'
// Header Buttons
import CreateButton from '~/components/buttons/CreateButton'
import MenuButton from '~/components/buttons/MenuButton'
// Bookmark Stuff
import BookmarkList from '~/components/common/List'
import BookmarkCard from '~/components/bookmark/BookmarkCard'
// Redux Stuff
import { useDispatch, useSelector } from 'react-redux'
import { Bookmark } from '~/types/Bookmark'
import { actions } from '~/store/modules/editing'
import { useFilterBookmarks } from '~/hooks/useFilterBookmarks'
import SettingsButton from '~/components/buttons/SyncButton'
import { getBackupReadOnly } from '~/store/modules/backup'

export type MainViewProps = {
  onCreate: () => void
  onTags: () => void
  onSync: () => void
}

const View = (props: MainViewProps) => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const bookmarks = useFilterBookmarks(searchTerm)
  const readOnly = useSelector(getBackupReadOnly)

  const handleEdit = (bookmark: Bookmark) => {
    dispatch(actions.setEditing(bookmark))
    props.onCreate()
  }

  const renderHeader = () => (
    <HeaderContainer>
      <HeaderLeft>
        <MenuButton onClick={props.onTags} />
        {/* <HeaderTitle>Fav.sh</HeaderTitle> */}
        <HeaderSearch
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for Bookmarks"
        />
      </HeaderLeft>
      <HeaderRight>
        <SettingsButton onClick={props.onSync} />
        {!readOnly && <CreateButton onClick={props.onCreate} />}
      </HeaderRight>
    </HeaderContainer>
  )

  const renderContent = () => {
    if (bookmarks.length === 0) {
      return <p>No bookmarks</p>
    } else {
      return (
        <BookmarkList>
          {bookmarks.map((bookmark) => {
            return (
              <BookmarkCard
                header={bookmark.name}
                link={bookmark.href}
                onEdit={() => handleEdit(bookmark)}
                readonly={readOnly}
              />
            )
          })}
        </BookmarkList>
      )
    }
  }

  return (
    <>
      {renderHeader()}
      {renderContent()}
    </>
  )
}

export default View
