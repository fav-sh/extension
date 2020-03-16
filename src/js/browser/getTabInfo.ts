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
  console.log(process.env.TARGET)
  if (process.env.TARGET === 'chrome') {
    console.log('chrome target executing')
    chromeVersion(callback)
    return
  } else {
    console.log('browser target executing')
    browserVersion(callback)
    return
  }
}

function browserVersion(callback: (tab: Tab) => void) {
  return (browser as any).tabs.query({ highlighted: true }, (tabs: Tabs) => {
    console.log('at browser')
    const tab: Tab = {
      title: tabs[0].title,
      url: tabs[0].url,
    }
    callback(tab)
  })
}

function chromeVersion(callback: (tab: Tab) => void) {
  return (chrome as any).tabs.query({ highlighted: true }, (tabs: Tabs) => {
    console.log('at chrome')
    const tab: Tab = {
      title: tabs[0].title,
      url: tabs[0].url,
    }
    callback(tab)
  })
}
