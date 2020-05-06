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
import { useDispatch } from 'react-redux'
import { Bookmark } from '~/types/Bookmark'
import { actions } from '~/store/modules/editing'
import { useFilterBookmarks } from '~/hooks/useFilterBookmarks'
import SettingsButton from '~/components/buttons/SyncButton'

export type MainViewProps = {
  onCreate: () => void
  onTags: () => void
  onSync: () => void
}

const Header = ({
  onToggleSidebar,
  onCreate,
  onSync,
  searchTermValue,
  onSearchTermChange,
}: {
  searchTermValue: string
  onToggleSidebar: () => void
  onCreate: () => void
  onSync: () => void
  onSearchTermChange: (value: string) => void
}) => (
  <HeaderContainer>
    <HeaderLeft>
      <MenuButton onClick={onToggleSidebar} />
      {/* <HeaderTitle>Fav.sh</HeaderTitle> */}
      <HeaderSearch
        value={searchTermValue}
        onChange={(e) => onSearchTermChange(e.target.value)}
        placeholder="Search for Bookmarks"
      />
    </HeaderLeft>
    <HeaderRight>
      <SettingsButton onClick={onSync} />
      <CreateButton onClick={onCreate} />
    </HeaderRight>
  </HeaderContainer>
)

const Content = ({
  bookmarks,
  onEdit,
}: {
  bookmarks: Bookmark[]
  onEdit: (bookmark: Bookmark) => void
}) => {
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
              onEdit={() => onEdit(bookmark)}
            />
          )
        })}
      </BookmarkList>
    )
  }
}

const View = (props: MainViewProps) => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const bookmarks = useFilterBookmarks(searchTerm)

  const handleEdit = (bookmark: Bookmark) => {
    dispatch(actions.setEditing(bookmark))
    props.onCreate()
  }

  return (
    <>
      <Header
        searchTermValue={searchTerm}
        onSearchTermChange={setSearchTerm}
        onCreate={props.onCreate}
        onToggleSidebar={props.onTags}
        onSync={props.onSync}
      />
      <Content bookmarks={bookmarks} onEdit={handleEdit} />
    </>
  )
}

export default View
