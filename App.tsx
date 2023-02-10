import React from 'react'
import { useThemeData } from './src/utils/theme'
import { ThemeProvider } from 'styled-components/native'
import { LoginPage } from './src/views/login/LoginPage'
import { Linking } from 'react-native'
import { currentUrlState, handleLink } from './src/utils/url'
import { useStore } from '@nanostores/react'
import { LoginCallbackPage } from './src/views/login/LoginCallbackPage'
import Toast from 'react-native-toast-message'

Linking.getInitialURL().then(url => {
  if (!url) {
    return
  }
  handleLink(url)
})

function App(): JSX.Element {
  React.useEffect(() => {
    Linking.addEventListener('url', ({ url }) => {
      handleLink(url)
    })

    return () => Linking.removeAllListeners('url')
  }, [])

  const theme = useThemeData()

  const urlState = useStore(currentUrlState)

  return (
    <>
      <ThemeProvider theme={theme.props}>
        {urlState ? <LoginCallbackPage state={urlState} /> : <LoginPage />}
      </ThemeProvider>
      <Toast />
    </>
  )
}

export default App
