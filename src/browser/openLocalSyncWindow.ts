/** When uploading / downloading files
 * one of the problems we run into is
 * the window closing while we are selecting a file.
 *
 * To combat this we open that setting in a seperate window.
 * This way it stays open whenever the user is uploading/downloading files
 */

export function openLocalSyncWindow() {
  const engine = process.env.TARGET === 'chrome' ? chrome : browser
  const url = engine.runtime.getURL('/popups/backupRestore/index.html')
  return engine.windows.create({
    type: 'popup',
    width: 400,
    height: 400,
    url,
  })
}
