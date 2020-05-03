import React, { useState } from 'react'
import styled from 'styled-components'
import { navigate } from '~/store/modules/navigation'
import { useDispatch } from 'react-redux'
import { MainScreenSidebar } from './MainScreenSidebar'
import { openSettingsWindow } from '~/browser/openSettings'
import Sidebar from 'react-sidebar'
import { useFilterBookmarks } from '~/hooks/useFilterBookmarks'
import { BookmarkCard } from '~/components/MainScreen/BookmarkCard'
import { MainScreenHeader } from './MainScreenHeader'

export const MainScreen = () => {
  const dispatch = useDispatch()
  const [showSidebar, setShowSidebar] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBookmarks = useFilterBookmarks(searchTerm)

  const handleCategories = () => {
    setShowSidebar(!showSidebar)
  }

  const handleAdd = () => {
    dispatch(navigate('add'))
  }

  const handleSettings = () => {
    openSettingsWindow()
  }

  return (
    <>
      <MainScreenHeader
        searchTerm={searchTerm}
        onCategories={handleCategories}
        onSearchChange={setSearchTerm}
        onAddBookmark={handleAdd}
        onSettings={handleSettings}
      />
      <Sidebar
        sidebar={<MainScreenSidebar />}
        open={showSidebar}
        docked={showSidebar}
        onSetOpen={() => setShowSidebar(true)}
        rootClassName="sidebar-content"
        styles={{ sidebar: { background: 'white' } }}
      >
        <ContentContainer>
          {filteredBookmarks.map((bookmark) => {
            return (
              <BookmarkCard
                key={bookmark.guid}
                guid={bookmark.guid}
                name={bookmark.name}
                href={bookmark.href}
                desc={bookmark.desc}
                tags={bookmark.tags}
              />
            )
          })}
        </ContentContainer>
      </Sidebar>
    </>
  )
}

const ContentContainer = styled.div`
  flex-grow: 1;
  position: absolute;
  left: 1em;
  right: 1em;
  top: 1em;
  bottom: 1em;
`
