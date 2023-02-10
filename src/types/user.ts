export interface User {
  avatarUrl: string
  fields: { name: string; value: string }[]
  username: string
  notesCount: number
  onlineStatus: string // TODO
  name: string
  id: string
  host: string
}
