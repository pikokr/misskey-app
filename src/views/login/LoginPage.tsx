import axios from 'axios'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import { Alert, AlertText } from '../../components/Alert'
import { MiButton } from '../../components/MiButton'
import { MiTextInput } from '../../components/MiTextInput'
import { InstanceMeta } from '../../types/meta'

const Components = {
  Background: styled.SafeAreaView`
    background-color: ${({ theme }) => theme.bg};
    height: 100%;
  `,
  Container: styled.View`
    padding: 48px;
    width: 100%;
    height: 100%;

    flex: 1;
    justify-content: center;
    align-items: center;
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

  const [hostInfo, setHostInfo] = React.useState<InstanceMeta | null>(null)

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
    } catch {
      setIsErrored(true)
    } finally {
      setFetching(false)
    }
  }, [fetching, target])

  return (
    <Components.Background>
      <Components.Container>
        <MiTextInput
          keyboardType="url"
          prefix="https://"
          label={t('login.instanceAddress')}
          value={target}
          onChange={setTarget}
          autoCapitalize="none"
          onEndEditing={searchInstance}
        />
        <Components.TopSpacer>
          <MiButton
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
      </Components.Container>
    </Components.Background>
  )
}
