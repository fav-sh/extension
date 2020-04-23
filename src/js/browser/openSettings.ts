// This will open a new window that
// Will hold the user settings

export function openSettingsWindow() {
  const engine = process.env.TARGET === 'chrome' ? chrome : browser
  const url = engine.runtime.getURL('/entry/settings.html')
  return engine.tabs.create({
    url,
    active: true,
  })
}
