const clientId = '5e8dad696b12cb5f6868'
const scope = 'gist'

export async function authorize() {
  if (process.env.TARGET === 'chrome') {
    return chromeVersion()
  } else {
    return browserVersion()
  }
}

async function browserVersion() {
  const redirectURL = browser.identity.getRedirectURL()
  const authURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectURL}`

  const auth = await browser.identity.launchWebAuthFlow({
    interactive: true,
    url: authURL,
  })
  return auth.split('?code=')[1]
}

function chromeVersion() {
  const redirectURL = chrome.identity.getRedirectURL()
  const authURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectURL}`

  return chrome.identity.launchWebAuthFlow(
    {
      interactive: true,
      url: authURL,
    },
    (responseUrl?: string) => {
      console.log(responseUrl)
      return responseUrl && responseUrl.split('?code=')[1]
    }
  )
}
