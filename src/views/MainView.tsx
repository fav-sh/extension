import React, { useState } from 'react'
// Header Components
import HeaderContainer from '../components/header/HeaderContainer'
import HeaderLeft from '../components/header/HeaderLeft'
import HeaderRight from '../components/header/HeaderRight'
import HeaderTitle from '../components/header/HeaderTitle'
// Header Buttons
import CreateButton from '../components/buttons/CreateButton'
import MenuButton from '../components/buttons/MenuButton'
// Bookmark Stuff
import BookmarkList from '../components/bookmark/BookmarkList'
import BookmarkCard from '../components/bookmark/BookmarkCard'
// Sidebar
import Sidebar from '../components/sidebar/Sidebar'

export type MainViewProps = {
  onCreate: () => void
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
      <HeaderTitle>Fav.sh</HeaderTitle>
    </HeaderLeft>
    <HeaderRight>
      <CreateButton onClick={onCreate} />
    </HeaderRight>
  </HeaderContainer>
)

const Content = ({ sidebarVisible }: { sidebarVisible: boolean }) => (
  <Sidebar visible={sidebarVisible}>
    <BookmarkList>
      <BookmarkCard
        header="Test Bookmark"
        link="https://testbookmark.com"
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </BookmarkList>
  </Sidebar>
)

const View = (props: MainViewProps) => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false)
  return (
    <>
      <Header
        onCreate={props.onCreate}
        onToggleSidebar={() => setSidebarVisible(!sidebarVisible)}
      />
      <Content sidebarVisible={sidebarVisible} />
    </>
  )
}

export default View
