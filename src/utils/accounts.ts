import { atom } from 'nanostores'
import * as Keychain from 'react-native-keychain'
import { useStore } from '@nanostores/react'
import React from 'react'
import Axios, { AxiosInstance } from 'axios'

export interface Account {
  host: string
  username: string
  token: string
  api: AxiosInstance
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

    result[service] = {
      host,
      token: creds.password,
      username: creds.username,
      api: createAxiosClient(host, creds.password),
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

  accountStore.set({
    ...items,
    [`${username}@${server}`]: {
      host: server,
      token,
      username: username,
      api: createAxiosClient(server, token),
    },
  })
}
