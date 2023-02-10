import axios from 'axios'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { currentUrlState, LoginUrlState } from '../../utils/url'
import Toast from 'react-native-toast-message'
import { accountStore, addAccount } from '../../utils/accounts'

const Components = {
  Background: styled.SafeAreaView`
    background-color: ${({ theme }) => theme.bg};
    height: 100%;
  `,
  Container: styled.View`
    padding: 48px;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    flex: 1;
  `,
  TopSpacer: styled.View`
    margin-top: 12px;
  `,
  Text: styled.Text`
    color: ${({ theme }) => theme.accent};
    text-align: center;
  `,
}

export const LoginCallbackPage: React.FC<{ state: LoginUrlState }> = ({
  state,
}) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const isFirst = React.useRef(true)

  React.useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
    } else {
      return
    }

    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      const { data } = await axios.post(
        `${state.host}/api/miauth/${state.session}/check`,
      )

      const host = state.host.match(/https?:\/\/(.*)/)![1]

      if (!data.ok) {
        Toast.show({
          type: 'error',
          text1: t('login.errors.loginFailed'),
        })
        currentUrlState.set(null)
        return
      }

      if (accountStore.get()[data.user.id + '@' + host]) {
        Toast.show({
          type: 'error',
          text1: t('login.errors.alreadyExists'),
        })
        currentUrlState.set(null)
        return
      }

      Toast.show({
        type: 'success',
        text1: t('login.loggedIn'),
        text2: `@${data.user.username}@${host}`,
      })

      await addAccount(host, data.user.username, data.token)

      currentUrlState.set(null)
    })()
  }, [state, t])

  return (
    <Components.Background>
      <Components.Container>
        <ActivityIndicator color={theme.accent} size="large" />
        <Components.TopSpacer>
          <Components.Text>{t('login.loggingIn')}</Components.Text>
        </Components.TopSpacer>
      </Components.Container>
    </Components.Background>
  )
}
