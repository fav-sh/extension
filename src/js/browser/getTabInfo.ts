type Tabs = Tab[]

export type Tab = {
  title: string
  url: string
}

/**
 *
 * TODO: Modify this function to support chrome
 * MDN has a guide on how to do this
 */
export const getActiveTab = (callback: (tabs: Tab) => void) => {
  if (process.env.TARGET === 'chrome') {
    chromeVersion(callback)
    return
  } else {
    browserVersion(callback)
    return
  }
}

function browserVersion(callback: (tab: Tab) => void) {
  return (browser as any).tabs.query(
    { highlighted: true, lastFocusedWindow: true },
    (tabs: Tabs) => {
      const tab: Tab = {
        title: tabs[0].title,
        url: tabs[0].url,
      }
      callback(tab)
    }
  )
}

function chromeVersion(callback: (tab: Tab) => void) {
  return (chrome as any).tabs.query(
    { highlighted: true, lastFocusedWindow: true },
    (tabs: Tabs) => {
      const tab: Tab = {
        title: tabs[0].title,
        url: tabs[0].url,
      }
      callback(tab)
    }
  )
}
