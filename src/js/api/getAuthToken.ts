/**
 * This will reach out auth.fav.sh
 * with the provided code and generate a token for the user
 */
import axios from 'axios'

export async function getAuthToken(code: string) {
  const url = `https://auth.fav.sh/.netlify/functions/auth?code=${code}`
  return axios.post(url)
}
