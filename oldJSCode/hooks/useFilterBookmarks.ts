import { useSelector } from 'react-redux'
import { Bookmark } from 'types/Bookmark'
import { getActiveTags } from 'store/modules/tags'
import { getBookmarks } from 'store/modules/bookmarks'
import intersection from 'lodash/fp/intersection'
import { isBlank, parseSearchInput } from '~/helpers'
import escapeRegExp from 'lodash/fp/escapeRegExp'

export const useFilterBookmarks = (searchTerm: string) => {
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
  if (!isBlank(searchTerm)) {
    filteredBookmarks = _applySearch(searchTerm, filteredBookmarks)
  }

  return filteredBookmarks
}

// This function will filter bookmarks
// Based on the search term entered
function _applySearch(searchInput: string, bookmarks: Bookmark[]) {
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
