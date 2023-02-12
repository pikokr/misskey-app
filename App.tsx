import React from 'react'
import { useThemeData } from './src/utils/theme'
import styled, { ThemeProvider, useTheme } from 'styled-components/native'
import { LoginPage } from './src/views/login/LoginPage'
import { ActivityIndicator, Linking } from 'react-native'
import { currentUrlState, handleLink } from './src/utils/url'
import { useStore } from '@nanostores/react'
import { LoginCallbackPage } from './src/views/login/LoginCallbackPage'
import Toast from 'react-native-toast-message'
import {
  accountStore,
  loadAccounts,
  SelectedAccountContext,
} from './src/utils/accounts'
import { NativeRouter } from 'react-router-native'
import { MkRouter } from './src/components/MkRouter'

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
      <ThemeProvider theme={theme}>
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
  background-color: ${({ theme }) => theme.bg};
`

function App(): JSX.Element {
  React.useEffect(() => {
    const sub = Linking.addEventListener('url', ({ url }) => {
      handleLink(url)
    })

    return () => sub.remove()
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

  const accounts = useStore(accountStore)

  const accountList = React.useMemo(() => Object.values(accounts), [accounts])

  const selectedAccount = React.useMemo(() => {
    return accountList[0]
  }, [accountList])

  if (urlState) {
    return <LoginCallbackPage state={urlState} />
  }

  if (loading) {
    return (
      <FullscreenCenter>
        <ActivityIndicator color={theme.accent} size="large" />
      </FullscreenCenter>
    )
  }

  if (urlState) {
    return <LoginCallbackPage state={urlState} />
  }

  if (!accountList.length) {
    return <LoginPage />
  }

  return (
    <SelectedAccountContext.Provider value={selectedAccount}>
      <NativeRouter>
        <MkRouter />
      </NativeRouter>
    </SelectedAccountContext.Provider>
  )
}

export default AppContainer
