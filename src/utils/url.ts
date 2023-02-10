const prefix = 'pikokr://misskey'
import queryString from 'query-string'
import { atom } from 'nanostores'

export type LoginUrlState = {
  type: 'login'
  host: string
  session: string
}

export const currentUrlState = atom<null | LoginUrlState>(null)

export const handleLink = (url: string) => {
  if (!url.startsWith(prefix)) {
    return
  }

  const path = url.slice(prefix.length)

  const [pathname, query] = path.split('?')

  if (pathname === '/login') {
    const data = queryString.parse(query)

    currentUrlState.set({
      type: 'login',
      host: data.host as string,
      session: data.session as string,
    })
  }
}
