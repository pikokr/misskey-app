import { atom } from 'nanostores'
import * as Keychain from 'react-native-keychain'
import React from 'react'
import Axios, { AxiosInstance } from 'axios'
import axios from 'axios'
import { CustomEmoji } from '../types/emoji'

export interface Account {
  host: string
  username: string
  token: string
  api: AxiosInstance
  emojis: Record<string, CustomEmoji>
  emojisByCategory: Record<string, CustomEmoji[]>
}

export const accountStore = atom<Record<string, Account>>({})

const createAxiosClient = (host: string, token: string): AxiosInstance => {
  const api = Axios.create({
    baseURL: `https://${host}/api`,
  })

  api.interceptors.request.use(config => {
    if (config.data) {
      config.data.i = token
    }

    return config
  })

  return api
}

const fetchEmojis = async (
  host: string,
): Promise<[Record<string, CustomEmoji>, Record<string, CustomEmoji[]>]> => {
  const {
    data: { emojis },
  } = await axios.get<{
    emojis: CustomEmoji[]
  }>(`https://${host}/api/emojis`)

  const result: Record<string, CustomEmoji> = {}

  const categoryResult: Record<string, CustomEmoji[]> = {}

  for (const item of emojis) {
    result[item.name] = item

    for (const alias of item.aliases) {
      if (!alias) {
        continue
      }
      result[alias] = item
    }

    let items = categoryResult[item.category]

    if (!items) {
      items = []
      categoryResult[item.category] = items
    }

    items.push(item)
  }

  return [result, categoryResult]
}

export const loadAccounts = async () => {
  // accountStore.set(JSON.parse(data))

  let result: Record<string, Account> = {}

  for (const service of await Keychain.getAllGenericPasswordServices()) {
    if (service === 'RN_KEYCHAIN_DEFAULT_ALIAS') {
      continue
    }
    const creds = await Keychain.getGenericPassword({ service })

    if (!creds) {
      continue
    }

    const host = creds.service.split('@')[1]

    const [emojis, emojisByCategory] = await fetchEmojis(host)

    result[service] = {
      host,
      token: creds.password,
      username: creds.username,
      api: createAxiosClient(host, creds.password),
      emojis,
      emojisByCategory,
    }
  }

  accountStore.set(result)
}

export const useSelectedAccount = () => {
  return React.useContext(SelectedAccountContext)
}

export const SelectedAccountContext = React.createContext<Account>(null!)

export const addAccount = async (
  server: string,
  username: string,
  token: string,
) => {
  await Keychain.setGenericPassword(username, token, {
    service: `${username}@${server}`,
  })

  const items = accountStore.get()

  const [emojis, emojisByCategory] = await fetchEmojis(server)

  accountStore.set({
    ...items,
    [`${username}@${server}`]: {
      host: server,
      token,
      username: username,
      api: createAxiosClient(server, token),
      emojis,
      emojisByCategory,
    },
  })
}
