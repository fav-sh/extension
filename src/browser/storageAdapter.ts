// This is a custom storage adapter for Redux Persist
// That will enable it to sync with Firefox / Chromium
// webext storage

export const createLocalStorage = () => {
  if (process.env.TARGET === 'chrome') {
    return chromeVersion()
  } else {
    return browserVersion()
  }
}

function chromeVersion() {
  const getItem = (key: string) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(key, (value) => {
        if (chrome.runtime.lastError == null) {
          resolve(value[key])
        } else {
          reject()
        }
      })
    })
  }
  const removeItem = (key: string) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove(key, () => {
        if (chrome.runtime.lastError == null) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }
  const setItem = (key: string, value: any) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ [key]: value }, () => {
        if (chrome.runtime.lastError == null) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }
  return { getItem, setItem, removeItem }
}

function browserVersion() {
  const getItem = (key: string) => {
    return new Promise((resolve, reject) => {
      // API returns the content as item[key]
      // instead of item
      const onSuccess = (item: any) => resolve(item[key])

      const onError = () => reject()

      browser.storage.local.get(key).then(onSuccess, onError)
    })
  }

  const setItem = (key: string, value: any) => {
    return new Promise((resolve, reject) => {
      const onSuccess = () => resolve()

      const onError = () => reject()

      browser.storage.local.set({ [key]: value }).then(onSuccess, onError)
    })
  }

  const removeItem = (key: string) => {
    return new Promise((resolve, reject) => {
      const onSuccess = () => resolve()

      const onError = () => reject()

      browser.storage.local.remove(key).then(onSuccess, onError)
    })
  }

  return { getItem, setItem, removeItem }
}
