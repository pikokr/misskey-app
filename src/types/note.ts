import { OnlineStatus } from './user'

export enum NoteVisibility {
  Public = 'public',
  Home = 'home',
  Followers = 'followers',
  Specified = 'specified',
}

export interface Note {
  id: string
  createdAt: string
  userId: string
  user: {
    id: string
    name: string | null
    username: string
    host: string
    avatarUrl: string
    avatarBlurhash: string
    isBot: boolean
    isCat: boolean
    instance: {
      name: string
      softwareName: string
      softwareVersion: string
      iconUrl: string
      faviconUrl: string
      themeColor: string
    }
    emojis: Record<string, string>
    onlineStatus: OnlineStatus
  }
  text: string
  cw: string | null
  visibility: NoteVisibility
  localOnly: boolean
  renoteCount: number
  repliesCount: number
  // TODO
  reactions: {}
  // TODO
  reactionEmojis: {}
  emojis: Record<string, string>
  // TODO
  fileIds: []
  // TODO
  files: string
  replyId: string | null
  renoteId: string | string
  uri: string
  url: string
}
