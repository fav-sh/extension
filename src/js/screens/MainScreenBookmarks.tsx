// This loads just the bookmarks
// For the main screen
// This is so we an implement lazy loading of the bookmarks
// And speed up how fast the extension responds to a user clicking on it
import React from 'react'
import { Bookmark } from '~/types/Bookmark'
import { getActiveTags } from '~/store/modules/tags'
import { useSelector } from 'react-redux'
import { getBookmarks } from '~/store/modules/bookmarks'
import intersection from 'lodash/fp/intersection'
import escapeRegExp from 'lodash/fp/escapeRegExp'
import { isBlank, parseSearchInput } from '~/helpers'
import { BookmarkCard } from '~/components/BookmarkCard'

type Props = {
  searchTerm: string
}

export default (props: Props) => {
  let filteredBookmarks: Bookmark[] = []
  const activeTags = useSelector(getActiveTags)
  const bookmarks = useSelector(getBookmarks)
  const bookmarksAsArray = Object.keys(bookmarks).map((key) => bookmarks[key])

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
  if (!isBlank(props.searchTerm)) {
    filteredBookmarks = applySearch(props.searchTerm, filteredBookmarks)
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

// This function will filter bookmarks
// Based on the search term entered
function applySearch(searchInput: string, bookmarks: Bookmark[]) {
  const { parsedSearchTerm, parsedTags } = parseSearchInput(searchInput)
  const re = new RegExp(escapeRegExp(parsedSearchTerm), 'i')

  const filteredBookmarks = bookmarks.reduce(
    (allBookmarks: Bookmark[], bookmark: Bookmark) => {
      if (parsedSearchTerm && re.test(bookmark.name)) {
        return [...allBookmarks, bookmark]
      }
      if (
        parsedTags.length > 0 &&
        intersection(parsedTags, bookmark.tags).length > 0
      ) {
        return [...allBookmarks, bookmark]
      }
      return allBookmarks
    },
    []
  )

  console.log(filteredBookmarks)

  return filteredBookmarks
}
