import React, { useState, useEffect } from 'react'
import Header from '~/components/common/Header'
import { IconButton, InputBase, Button } from '@material-ui/core'
import styled from 'styled-components'
import { navigate } from '~/store/modules/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { BookmarkCard } from '~/components/BookmarkCard'
import { getBookmarks } from '~/store/modules/bookmarks'
import { Categories } from './Categories'
import { getActiveTags } from '~/store/modules/tags'
import intersection from 'lodash/fp/intersection'
import { Bookmark } from '~/types/Bookmark'
import escapeRegExp from 'lodash/fp/escapeRegExp'
import { openSettingsWindow } from '~/browser/openSettings'
import { isBlank } from '~/helpers'
import Sidebar from 'react-sidebar'
import MenuIcon from '~/icons/menu'
import SettingsIcon from '~/icons/settings'

const HeaderLeftButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton onClick={onClick}>
    <MenuIcon />
  </IconButton>
)

const HeaderRightButton = ({
  onClick,
  onAdd,
}: {
  onClick: () => void
  onAdd: () => void
}) => (
  <>
    <IconButton onClick={onClick}>
      <SettingsIcon />
    </IconButton>
    <Button
      variant="outlined"
      style={{ color: '#fff', borderRadius: '10px', borderColor: 'white' }}
      onClick={() => onAdd()}
    >
      Add Bookmark
    </Button>
  </>
)

// This function will filter bookmarks
// Based on the search term enteredd
function applySearch(searchTerm: string, bookmarks: Bookmark[]) {
  const re = new RegExp(escapeRegExp(searchTerm), 'i')
  return bookmarks.filter((bookmark: Bookmark) => re.test(bookmark.name))
}

export const MainScreen = () => {
  const bookmarks = useSelector(getBookmarks)
  const bookmarksAsArray = Object.keys(bookmarks).map((key) => bookmarks[key])
  const activeTags = useSelector(getActiveTags)
  const dispatch = useDispatch()

  const [showSidebar, setShowSidebar] = useState<boolean>(false)

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    console.log(searchTerm)
  }, [searchTerm])

  const handleCategories = () => {
    setShowSidebar(!showSidebar)
  }

  const handleAdd = () => {
    dispatch(navigate('add'))
  }

  const handleSettings = () => {
    openSettingsWindow()
  }

  const renderBookmarks = () => {
    let filteredBookmarks: Bookmark[] = []

    // If we have tags that have been selected
    // Filter bookmarks based on the intersection
    // Of their tags versus the ones that have been selected
    if (activeTags.length > 0) {
      filteredBookmarks = bookmarksAsArray.filter(
        (bookmark) => intersection(bookmark.tags, activeTags).length > 0
      )
      // If we do not have any active tags we apply all bookmarks
      // To filtered bookmarks
    } else {
      filteredBookmarks = bookmarksAsArray
    }

    // After we are done filtering on tags we now check
    // If there is anything in search that we need to filter
    if (!isBlank(searchTerm)) {
      filteredBookmarks = applySearch(searchTerm, filteredBookmarks)
    }

    // If there are no filtered bookmarks
    // After we finish our filtering then return an empty
    // Component
    if (filteredBookmarks.length === 0) {
      return <p>Wow such empty</p>
    }

    return (
      <>
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
      </>
    )
  }

  return (
    <>
      <Header>
        <FlexContainer>
          <Section>
            <HeaderLeftButton onClick={handleCategories} />
            <SearchBox
              placeholder="Search…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
              autoFocus
              fullWidth
              style={{ color: 'white' }}
            />
          </Section>
          <Section>
            <HeaderRightButton onAdd={handleAdd} onClick={handleSettings} />
          </Section>
        </FlexContainer>
      </Header>
      <Sidebar
        sidebar={<Categories />}
        open={showSidebar}
        docked={showSidebar}
        onSetOpen={() => setShowSidebar(true)}
        rootClassName="sidebar-content"
        styles={{ sidebar: { background: 'white' } }}
      >
        <ContentContainer>{renderBookmarks()}</ContentContainer>
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

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
`
const SearchBox = styled(InputBase)`
  color: inherit;
  padding: 3px 3px 3px 7px;
  border: 2px solid #90a4ae;
  border-radius: 7px;
  font-size: 22px;
  color: white;
  width: 100%;
`
