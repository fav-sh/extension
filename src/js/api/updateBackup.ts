import Github from 'github-api'

// https://developer.github.com/v3/gists/#update-a-gist

export async function updateBackup(
  token: string,
  filename: string,
  isPublic: boolean,
  fileContent: string,
  gistId: string,
  description?: string
) {
  const gh = new Github({ token })
  const gist = gh.getGist(gistId)

  const data = {
    description,
    public: isPublic,
    files: {
      [filename]: {
        content: fileContent,
      },
    },
  }

  return gist.update(data)
}
