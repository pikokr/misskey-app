import { Ad } from './ad'

export interface InstanceMeta {
  themeColor: string
  maintainerName: string | null
  maintainerEmail: string | null
  version: string | null
  name: string
  uri: string
  description: string | null
  langs: string[]
  tosUrl: string | null
  repositoryUrl: string
  feedbackUrl: string
  defaultDarkTheme: string | null
  defaultLightTheme: string | null
  disableRegistration: boolean
  cacheRemoteFiles: boolean
  emailRequiredForSignup: boolean
  enableHcaptcha: boolean
  recaptchaSiteKey: string
  enableTurnstile: boolean
  turnstileSiteKey: string
  mascotImageUrl: string
  bannerUrl: string
  errorImageUrl: string
  iconUrl: string | null
  maxNoteTextLength: number

  ads: Ad[]

  requireSetup: boolean
  enabmeEmail: boolean
  enableServiceWorker: boolean
  translatorAvailable: boolean
  proxyAccountName: string
  mediaProxy: string

  features?: {
    registration: boolean
    localTimeLine: boolean
    globalTimeLine: boolean
    elasticsearch: boolean
    hcaptcah: boolean
    recaptcha: boolean
    objectStorage: boolean
    serviceWorker: boolean
    miauth: boolean
  }
}
