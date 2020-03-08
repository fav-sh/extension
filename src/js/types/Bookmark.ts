import { Tag } from './Tag'

export type Bookmark = {
  guid: string
  name: string
  desc?: string
  href: string
  tags: Tag[]
}

export type ExportedBookmark = {
  name: string
  href: string
  desc?: string
  tags?: Tag[]
}
