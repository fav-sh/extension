import Github from 'github-api'
import { groomGithubResponse } from './util/groomGithubResponse'

export const getBackup = async (gistId: string) => {
  const github = new Github()
  const gist = await github.getGist(gistId)
  return groomGithubResponse(gist)
}

export const getBackupAuthenticated = async (gistId: string, token: string) => {
  const github = new Github(token)
  const gist = await github.getGist(gistId)
  return groomGithubResponse(gist)
}
