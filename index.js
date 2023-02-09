/**
 * @format
 */

import 'intl-pluralrules'
import { AppRegistry } from 'react-native'
import './src/utils/i18n'
import App from './App'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
