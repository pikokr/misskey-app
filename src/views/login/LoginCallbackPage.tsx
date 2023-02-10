import axios from 'axios'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { LoginUrlState } from '../../utils/url'

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

  React.useEffect(() => {
    console.log(state.host, state.session)
    ;(async () => {
      const { data } = await axios.post(
        `${state.host}/api/miauth/${state.session}/check`,
      )

      console.log(data.ok)
    })()
  }, [state])

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
