import axios from 'axios'

// https://developer.github.com/v3/gists/#create-a-gist

export async function createBackup(
  token: string,
  filename: string,
  isPublic: boolean,
  fileContent: string,
  description?: string
) {
  const url = 'https://api.github.com/gists'

  const headers = {
    Authentication: `Bearer ${token}`,
  }

  const data = {
    description,
    public: isPublic,
    files: {
      [filename]: fileContent,
    },
  }

  return axios.request({
    method: 'POST',
    url,
    headers,
    data,
  })
}
