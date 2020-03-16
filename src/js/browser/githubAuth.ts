export function openWebAuth(authUrl: string, callback: (code: string) => void) {
  console.log('opening web auth')
  console.log(process.env.TARGET)
  if (process.env.TARGET === 'chrome') {
    chrome.identity.launchWebAuthFlow(
      {
        interactive: true,
        url: authUrl,
      },
      (responseURL?: string) => {
        if (responseURL) {
          const authCode = responseURL.split('?code=')[1]
          callback(authCode)
        } else {
          callback('no code')
        }
      }
    )
  } else {
    browser.identity
      .launchWebAuthFlow({
        interactive: true,
        url: authUrl,
      })
      .then((responseUrl: string) => {
        const authCode = responseUrl.split('?code=')[1]
        callback(authCode)
      })
  }
}
