import { ExportedBookmark } from 

type GithubResponse = {
  created_at: string
  updated_at: string
  description: string
  files: GithubFiles
  html_url: string
  id: string
  public: boolean
}

type GithubFiles = {
  [filename: string]: {
    content: string
    filename: string
  }
}

type GroomedGistResponse = {
  gistId: string
  createdAt: string
  updatedAt: string
  desc: string
  backup: ExportedBookmark[]
  filename: string
  url: string
  isPublic: boolean
  error?: string
}

export const groomGithubResponse = (
  gist: GithubResponse
): GroomedGistResponse => {
  const flatFiles = flattenFiles(gist.files)

  return {
    gistId: gist.id,
    createdAt: gist.created_at,
    updatedAt: gist.updated_at,
    desc: gist.description,
    backup: flatFiles.content,
    filename: flatFiles.filename,
    url: gist.html_url,
    isPublic: gist.public,
    error: flatFiles.error,
  }
}

const flattenFiles = (files: GithubFiles) => {
  const fileKeys = Object.keys(files)
  // At the moment we do not support multiple
  // files in a single backup and thus only read
  // the first file, this is subject to change
  const firstFileKey = fileKeys[0]

  try {
    const exportedBookmarks = JSON.parse(files[firstFileKey].content)

    return {
      filename: files[firstFileKey].filename,
      content: exportedBookmarks,
    }
  } catch {
    return {
      filename: files[firstFileKey].filename,
      content: [],
      error: 'Could not parse bookmarks!',
    }
  }
}
