import React from 'react'
import { useThemeData } from './src/utils/theme'
import { ThemeProvider } from 'styled-components/native'
import { LoginPage } from './src/views/login/LoginPage'

function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark'
  const theme = useThemeData()

  return (
    <ThemeProvider theme={theme.props}>
      <LoginPage />
    </ThemeProvider>
  )
}

export default App
