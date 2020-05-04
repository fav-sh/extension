import React from 'react'
// Header Components
import HeaderContainer from '~/components/header/HeaderContainer'
import HeaderLeft from '~/components/header/HeaderLeft'
import HeaderRight from '~/components/header/HeaderRight'
import HeaderSearch from '~/components/header/HeaderSearch'
// Header Buttons
import CreateButton from '~/components/buttons/CreateButton'
import MenuButton from '~/components/buttons/MenuButton'
// Bookmark Stuff
import BookmarkList from '~/components/bookmark/BookmarkList'
import BookmarkCard from '~/components/bookmark/BookmarkCard'
// Redux Stuff
import { useSelector, useDispatch } from 'react-redux'
import { getBookmarks, BookmarkState } from '~/store/modules/bookmarks'
import { Bookmark } from '~/types/Bookmark'
import { actions } from '~/store/modules/editing'

export type MainViewProps = {
  onCreate: () => void
  onTags: () => void
}

const Header = ({
  onToggleSidebar,
  onCreate,
}: {
  onToggleSidebar: () => void
  onCreate: () => void
}) => (
  <HeaderContainer>
    <HeaderLeft>
      <MenuButton onClick={onToggleSidebar} />
      {/* <HeaderTitle>Fav.sh</HeaderTitle> */}
      <HeaderSearch placeholder="Search for Bookmarks" />
    </HeaderLeft>
    <HeaderRight>
      <CreateButton onClick={onCreate} />
    </HeaderRight>
  </HeaderContainer>
)

const Content = ({
  bookmarks,
  onEdit,
}: {
  bookmarks: BookmarkState
  onEdit: (bookmark: Bookmark) => void
}) => {
  if (Object.keys(bookmarks).length === 0) {
    return <p>No bookmarks</p>
  } else {
    return (
      <BookmarkList>
        {Object.values(bookmarks).map((bookmark) => {
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
  const bookmarks = useSelector(getBookmarks)

  const handleEdit = (bookmark: Bookmark) => {
    dispatch(actions.setEditing(bookmark))
    props.onCreate()
  }

  return (
    <>
      <Header onCreate={props.onCreate} onToggleSidebar={props.onTags} />
      <Content bookmarks={bookmarks} onEdit={handleEdit} />
    </>
  )
}

export default View
