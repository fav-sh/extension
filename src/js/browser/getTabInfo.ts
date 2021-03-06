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
