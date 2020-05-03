import Github from 'github-api'

export async function restoreGistAuthenticated(gistId: string, token: string) {
  const gh = new Github({ token })
  const gist = gh.getGist(gistId)
  return gist.read()
}

export async function restoreGistAnonymously(gistId: string) {
  const gh = new Github()
  const gist = gh.getGist(gistId)
  return gist.read()
}
