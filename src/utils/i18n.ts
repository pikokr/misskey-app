import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import ko from '../../locales/ko.json'

i18next.use(initReactI18next).init({
  lng: 'ko',
  ns: ['default'],
  defaultNS: 'default',
  resources: {
    ko: { default: ko },
  },
  interpolation: {
    escapeValue: false,
  },
})
