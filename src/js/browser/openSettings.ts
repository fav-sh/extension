// This will open a new window that
// Will hold the user settings

export function openSettingsWindow() {
  const url = browser.runtime.getURL('/entry/settings.html')
  console.log(url)
  browser.windows.create({
    url,
    type: 'panel',
  })
}
