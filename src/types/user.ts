export enum OnlineStatus {
  Unknown = 'unknown',
  Online = 'online',
  Active = 'active',
  Offline = 'offline',
}

export interface User {
  avatarUrl: string
  bannerUrl: string
  fields: { name: string; value: string }[]
  username: string
  notesCount: number
  onlineStatus: string // TODO
  name: string
  id: string
  host: string
  description: string
}
