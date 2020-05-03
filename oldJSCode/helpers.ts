import { Bookmark, ExportedBookmark } from '../types/Bookmark'
import pickBy from 'lodash/fp/pickBy'
import identity from 'lodash/fp/identity'
import { v1 as uuid } from 'uuid'
import { BookmarkState } from '../store/modules/bookmarks'
// Various helper methods for things around the codebase

export function isBlank(str: string) {
  return !str || /^\s*$/.test(str)
}

export function generateBookmarkGuid() {
  const bookmarkGuid = uuid()
  return bookmarkGuid
}

// Validate an imported bookmark
export function validateBookmark(bookmark: any) {
  // Level 1: Make sure that the object includes at least
  // a guid, name and href.
  if (Object.keys(bookmark).includes('name' && 'href')) {
    // Level 2: Validate that all of these items exist and are not undefined
    if (!isBlank(bookmark.name) && !isBlank(bookmark.href)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

// There is a ton of extra stuff on an exported bookmark
// that the user does not care about
// strip this out on export
export function transformExportBookmark(bookmark: Bookmark): ExportedBookmark {
  // Carry over any defaults
  const draftBookmark: ExportedBookmark = {
    name: bookmark.name || 'Bookmark Name',
    href: bookmark.href || 'https://fav.sh',
    desc: bookmark.desc,
    tags: bookmark.tags.length > 0 ? bookmark.tags : undefined,
  }
  // Remove any empty keys
  const finalBookmark = pickBy(identity, draftBookmark) as ExportedBookmark
  return finalBookmark
}

// This performs the inverse of an export transform, when a bookmark is imported
// we want to convert it from an exported bookmark to a regular bookmark
// read by the app
export function transformImportBookmark(
  bookmark: ExportedBookmark,
  guid: string
): Bookmark {
  const draftBookmark: Bookmark = {
    guid,
    name: bookmark.name,
    href: bookmark.href,
    desc: bookmark.desc || '',
    tags: bookmark.tags || [],
  }
  return draftBookmark
}

// Transforms bookmarks into a JSON format
export function transformExportBookmarks(bookmarks: BookmarkState) {
  if (Object.keys(bookmarks).length === 0) {
    return JSON.stringify({})
  }
  const minifiedBookmarks = Object.keys(bookmarks).map((key) => {
    return transformExportBookmark(bookmarks[key])
  })

  return JSON.stringify(minifiedBookmarks, null, 2)
}

export function expandBookmarks(exportedBookmarks: ExportedBookmark[]) {
  return exportedBookmarks.reduce(
    (bookmarks: BookmarkState, bookmark: ExportedBookmark) => {
      if (validateBookmark(bookmark)) {
        const freshGuid = generateBookmarkGuid()
        const expandedBookmark = transformImportBookmark(bookmark, freshGuid)
        return {
          ...bookmarks,
          [expandedBookmark.guid]: expandedBookmark,
        }
      } else {
        return bookmarks
      }
    },
    {}
  )
}

/** Parses search input,
 * returns an array of strings
 * and a search term string
 */
export function parseSearchInput(input: string) {
  // Extract Search Term
  const searchTerm = input
    .split(' ')
    .filter((item) => !item.includes('tag:'))
    .join(' ')

  // Extract Tags

  // Split the search term by spaces
  const splitParts = input.split(' ')

  // Filter out just the tag parts
  const tagParts = splitParts.filter((item) => item.includes('tag:'))

  const tags = tagParts.reduce((tags: string[], tagPart: string) => {
    // Take the value from the tag
    const justTags = tagPart.split(':')[1]

    // Split the tags in case there is more than one
    const allTags = justTags.split(',')

    return [...tags, ...allTags]
  }, [])

  return {
    parsedSearchTerm: searchTerm,
    parsedTags: tags,
  }
}
