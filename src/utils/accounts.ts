import { atom } from 'nanostores'
import * as Keychain from 'react-native-keychain'

export interface Account {
  host: string
  username: string
  token: string
}

export const accountStore = atom<Record<string, Account>>({})

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

    result[service] = {
      host: creds.service.split('@')[1],
      token: creds.password,
      username: creds.username,
    }
  }

  accountStore.set(result)
}

export const addAccount = async (
  server: string,
  username: string,
  token: string,
) => {
  await Keychain.setGenericPassword(username, token, {
    service: `${username}@${server}`,
  })

  const items = accountStore.get()

  items[`${username}@${server}`] = {
    host: server,
    token,
    username: username,
  }

  accountStore.notify(`${username}@${server}`)
}
