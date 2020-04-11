/**
 * This script will create a file with a large number
 * of bookmarks that will test it's performance.
 */

// import uuid from 'uuid/v1'
const uuid = require('uuid/v1')
const fs = require('fs')

function _createBookmark() {
  const bookmarkGuid = uuid()
  return {
    guid: bookmarkGuid,
    name: 'Some bookmark',
    desc:
      'A short description of this bookmark that describes what it is and what it does',
    href: 'http://fav.sh',
    tags: ['tag1', 'tag2', 'tag3'],
  }
}

var bookmarks = []
var i
const limit = 1000

for (i = 0; i < limit; i++) {
  bookmarks = [...bookmarks, _createBookmark()]
}

const dataToWrite = JSON.stringify(bookmarks, null, 2)

fs.writeFileSync('output.json', dataToWrite)
console.log('Done')
