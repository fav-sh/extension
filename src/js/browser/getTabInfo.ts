type Tabs = Tab[]

export type Tab = {
  title: string
  url: string
}

function _getBrowserAPI() {
  try {
    console.log(browser)
  } catch (browserError) {
    try {
      console.log('error when trying browser', browserError)
      console.log(chrome)
    } catch (chromeError) {
      console.log('error when trying chrome', browserError)
    }
  }
}

/**
 *
 * TODO: Modify this function to support chrome
 * MDN has a guide on how to do this
 */
export const getActiveTab = (callback: (tabs: Tab) => void) => {
  const engine = process.env.TARGET === 'chrome' ? chrome : browser
  return (engine as any).tabs.query(
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
