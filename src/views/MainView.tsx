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
import { useSelector } from 'react-redux'
import { getBookmarks, BookmarkState } from '~/store/modules/bookmarks'

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

const Content = ({ bookmarks }: { bookmarks: BookmarkState }) => {
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
              onEdit={() => {}}
              onDelete={() => {}}
            />
          )
        })}
      </BookmarkList>
    )
  }
}

const View = (props: MainViewProps) => {
  const bookmarks = useSelector(getBookmarks)
  return (
    <>
      <Header onCreate={props.onCreate} onToggleSidebar={props.onTags} />
      <Content bookmarks={bookmarks} />
    </>
  )
}

export default View
