import React from 'react'
import { useThemeData } from './src/utils/theme'
import styled, { ThemeProvider, useTheme } from 'styled-components/native'
import { LoginPage } from './src/views/login/LoginPage'
import { ActivityIndicator, Linking } from 'react-native'
import { currentUrlState, handleLink } from './src/utils/url'
import { useStore } from '@nanostores/react'
import { LoginCallbackPage } from './src/views/login/LoginCallbackPage'
import Toast from 'react-native-toast-message'
import { loadAccounts } from './src/utils/accounts'

Linking.getInitialURL().then(url => {
  if (!url) {
    return
  }
  handleLink(url)
})

const AppContainer: React.FC = () => {
  const theme = useThemeData()

  return (
    <>
      <ThemeProvider theme={theme.props}>
        <App />
      </ThemeProvider>
      <Toast />
    </>
  )
}

const FullscreenCenter = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

function App(): JSX.Element {
  React.useEffect(() => {
    Linking.addEventListener('url', ({ url }) => {
      handleLink(url)
    })

    return () => Linking.removeAllListeners('url')
  }, [])

  const theme = useTheme()

  const urlState = useStore(currentUrlState)

  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      await loadAccounts()

      setLoading(false)
    })()
  }, [])

  if (loading) {
    return (
      <FullscreenCenter>
        <ActivityIndicator color={theme.accent} size="large" />
      </FullscreenCenter>
    )
  }

  return (
    <>{urlState ? <LoginCallbackPage state={urlState} /> : <LoginPage />}</>
  )
}

export default AppContainer
