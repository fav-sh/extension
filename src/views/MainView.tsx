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

const Content = () => (
  <BookmarkList>
    <BookmarkCard
      header="Test Bookmark"
      link="https://testbookmark.com"
      onEdit={() => {}}
      onDelete={() => {}}
    />
  </BookmarkList>
)

const View = (props: MainViewProps) => {
  return (
    <>
      <Header onCreate={props.onCreate} onToggleSidebar={props.onTags} />
      <Content />
    </>
  )
}

export default View
