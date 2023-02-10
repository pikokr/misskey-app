import { atom } from 'nanostores'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface Account {
  id: string
  host: string
  username: string
  token: string
}

export const accountStore = atom<Record<Account['id'], Account>>({})

export const loadAccounts = async () => {
  const data = await AsyncStorage.getItem('accounts')
  if (!data) {
    return
  }

  accountStore.set(JSON.parse(data))
}

export const saveAccounts = async () => {
  await AsyncStorage.setItem('accounts', JSON.stringify(accountStore.get()))
}
