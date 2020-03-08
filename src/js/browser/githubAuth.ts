export async function authorize() {
  const clientId = '5e8dad696b12cb5f6868'
  const scope = 'gist'
  const redirectURL = browser.identity.getRedirectURL()
  const authURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectURL}`

  const auth = await browser.identity.launchWebAuthFlow({
    interactive: true,
    url: authURL,
  })

  console.log(auth)
}
