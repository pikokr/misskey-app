import 'i18next'
import ko from './locales/ko.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'default'
    resources: {
      default: typeof ko
    }
  }
}
