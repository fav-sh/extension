/**
 * This will reach out auth.fav.sh
 * with the provided code and generate a token for the user
 */
import axios from 'axios'

const baseURL = `https://auth.fav.sh/.netlify/functions`

const getUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    if (process.env.TARGET === 'chrome') {
      return `${baseURL}/chrome-dev`
    } else {
      return `${baseURL}/firefox-dev`
    }
  }
  if (process.env.NODE_ENV === 'production') {
    if (process.env.TARGET === 'chrome') {
      return `${baseURL}/chrome-prod`
    } else {
      return `${baseURL}/firefox-prod`
    }
  }
  return undefined
}

export async function getAuthToken(code: string) {
  const url = getUrl()
  if (url && code) {
    const resp = await axios.post(`${url}?code=${code}`)
    return resp.data
  }
}
