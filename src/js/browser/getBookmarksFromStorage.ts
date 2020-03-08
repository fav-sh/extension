// Because the settings page does not
// connect to the redux store, we cannot simply
// get the bookmarks from the redux store like we usually do
// However because the bookmrks are stored in the extensions local storage
// We can grab the raw storage, deserialize it and then take the bookmarks
// out and provide them to the user for backup

export async function getBookmarksFromStorage() {
  return new Promise((resolve, reject) => {
    const onSuccess = (content: any) => {
      const deserializedStore = JSON.parse(content['persist:extension'])
      const deserializedBookmarks = JSON.parse(deserializedStore.bookmarks)
      resolve(deserializedBookmarks)
    }

    const onError = () => reject()

    browser.storage.local.get().then(onSuccess, onError)
  })
}
