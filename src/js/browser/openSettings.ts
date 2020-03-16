// This will open a new window that
// Will hold the user settings

export function openSettingsWindow() {
  if (process.env.TARGET === 'chrome') {
    chromeVersion()
    return
  } else {
    browserVersion()
    return
  }
}

function browserVersion() {
  const url = browser.runtime.getURL('/entry/settings.html')
  return browser.tabs.create({
    url,
    active: true,
  })
}

function chromeVersion() {
  const url = chrome.runtime.getURL('/entry/settings.html')
  chrome.tabs.create({
    url,
    active: true,
  })
}
