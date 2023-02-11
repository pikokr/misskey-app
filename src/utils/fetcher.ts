import { Account } from './accounts'
import axios from 'axios'
import { User } from '../types/user'

export const fetchers = {
  user: (acc: Account) =>
    axios
      .post<User>(`https://${acc.host}/api/users/show`, {
        username: acc.username,
      })
      .then(x => x.data),
}
