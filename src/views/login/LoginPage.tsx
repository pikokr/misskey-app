import axios from 'axios'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled, { ThemeProvider } from 'styled-components/native'
import { Alert, AlertText } from '../../components/Alert'
import { MkButton } from '../../components/MkButton'
import { MkInstanceCard } from '../../components/MkInstanceCard'
import { MkTextInput } from '../../components/MkTextInput'
import { InstanceMeta } from '../../types/meta'
import { MiTheme } from '../../utils/theme'
import json5 from 'json5'
import { useColorScheme } from 'react-native'

const Components = {
  Background: styled.SafeAreaView`
    background-color: ${({ theme }) => theme.bg};
    height: 100%;
  `,
  Container: styled.ScrollView`
    padding: 48px;
    width: 100%;
    height: 100%;

    flex: 1;
  `,
  TopSpacer: styled.View`
    margin-top: 12px;
    width: 100%;
  `,
}

export const LoginPage: React.FC = () => {
  const { t } = useTranslation()

  const [target, setTarget] = React.useState('')

  const [fetching, setFetching] = React.useState(false)

  const [isErrored, setIsErrored] = React.useState(false)

  const [lightTheme, setLightTheme] = React.useState<MiTheme | null>(null)
  const [darkTheme, setDarkTheme] = React.useState<MiTheme | null>(null)

  const [hostInfo, setHostInfo] = React.useState<InstanceMeta | null>(null)

  const isDark = useColorScheme() === 'dark'

  const theme = React.useMemo(() => {
    if (isDark && darkTheme) {
      return darkTheme
    }

    if (!lightTheme && darkTheme) {
      return darkTheme
    }

    if (lightTheme) {
      return lightTheme
    }

    return null
  }, [isDark, lightTheme, darkTheme])

  const searchInstance = React.useCallback(async () => {
    if (!target || fetching) {
      return
    }

    setIsErrored(false)

    setHostInfo(null)

    setFetching(true)

    try {
      const { data } = await axios.post<InstanceMeta>(
        `https://${target}/api/meta`,
        {},
      )

      setHostInfo(data)

      try {
        if (data.defaultLightTheme) {
          setLightTheme(json5.parse(data.defaultLightTheme))
        } else {
          setLightTheme(null)
        }
      } catch {
        setLightTheme(null)
      }
      try {
        if (data.defaultDarkTheme) {
          setDarkTheme(json5.parse(data.defaultDarkTheme))
        } else {
          setDarkTheme(null)
        }
      } catch {
        setDarkTheme(null)
      }
    } catch {
      setIsErrored(true)
    } finally {
      setFetching(false)
    }
  }, [fetching, target])

  const content = (
    <Components.Background>
      <Components.Container>
        <MkTextInput
          keyboardType="url"
          prefix="https://"
          label={t('login.instanceAddress')}
          value={target}
          onChange={setTarget}
          autoCapitalize="none"
          onEndEditing={searchInstance}
        />
        <Components.TopSpacer>
          <MkButton
            fullWidth
            text={t('login.searchInstance')}
            onPress={searchInstance}
            loading={fetching}
          />
        </Components.TopSpacer>
        {isErrored && (
          <Components.TopSpacer>
            <Alert>
              <AlertText>{t('login.errors.cannotFindInstance')}</AlertText>
            </Alert>
          </Components.TopSpacer>
        )}
        {hostInfo && (
          <Components.TopSpacer>
            <MkInstanceCard instance={hostInfo} />
          </Components.TopSpacer>
        )}
      </Components.Container>
    </Components.Background>
  )

  return theme ? (
    <ThemeProvider theme={theme.props}>{content}</ThemeProvider>
  ) : (
    content
  )
}
