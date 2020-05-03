import Github from 'github-api'

// https://developer.github.com/v3/gists/#create-a-gist

export async function createBackup(
  token: string,
  filename: string,
  isPublic: boolean,
  fileContent: string,
  description?: string
) {
  const gh = new Github({ token })
  const gist = gh.getGist()

  const data = {
    description,
    public: isPublic,
    files: {
      [filename]: {
        content: fileContent,
      },
    },
  }
  return gist.create(data)
}
