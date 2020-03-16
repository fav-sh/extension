const clientIds = {
  chrome: {
    development: '7fb2c68496e3fbc3f546',
    production: '3b4b685ccc14d6b13b8b',
  },
  firefox: {
    development: '5e8dad696b12cb5f6868',
    production: 'be8c7d972b6da72c8605',
  },
}

const scope = 'gist'

export async function authorize() {
  if (process.env.TARGET === 'chrome') {
    if (process.env.NODE_ENV === 'production') {
      // Chrome Production
      return chromeVersion(clientIds.chrome.production)
    } else {
      // Chrome Development
      return chromeVersion(clientIds.chrome.development)
    }
  } else {
    if (process.env.NODE_ENV === 'production') {
      // Firfox Production
      return browserVersion(clientIds.firefox.production)
    } else {
      // Firefox Development
      return browserVersion(clientIds.firefox.development)
    }
  }
}

async function browserVersion(clientId: string) {
  const redirectURL = browser.identity.getRedirectURL()
  const authURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectURL}`

  const auth = await browser.identity.launchWebAuthFlow({
    interactive: true,
    url: authURL,
  })
  return auth.split('?code=')[1]
}

function chromeVersion(clientId: string) {
  const redirectURL = chrome.identity.getRedirectURL()
  const authURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectURL}`

  const authCode = () =>
    chrome.identity.launchWebAuthFlow(
      {
        interactive: true,
        url: authURL,
      },
      (responseUrl?: string) => {
        return responseUrl
      }
    )

  const code = authCode()
  console.log('authorization code', code)
}
