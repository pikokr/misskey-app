import React from 'react'
import { SafeAreaView } from 'react-native'
import { useThemeData } from './src/utils/theme'
import styled, { ThemeProvider } from 'styled-components/native'

const Test = styled.Text`
  color: ${props => props.theme.renote};
`

function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark'
  const theme = useThemeData()

  return (
    <ThemeProvider theme={theme.props}>
      <SafeAreaView>
        <Test>test</Test>
      </SafeAreaView>
    </ThemeProvider>
  )
}

export default App
