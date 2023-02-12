import React from 'react'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components/native'
import { InstanceMeta } from '../types/meta'
import { MkButton } from './MkButton'
import RenderHtml, { HTMLElementModelRecord } from 'react-native-render-html'
import {
  HTMLContentModel,
  HTMLElementModel,
} from '@native-html/transient-render-engine'
import { ActivityIndicator, Linking } from 'react-native'
import { Alert, AlertText } from './Alert'
import uuid from 'react-native-uuid'

const Container = styled.View`
  background-color: ${({ theme }) => theme.panel};
  padding: 12px;
  width: 100%;
  border-radius: 6px;
`

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
`

const Description = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.accent};
`

const SpaceTop = styled.View`
  margin-top: 12px;
`

const customElements: HTMLElementModelRecord = {
  center: HTMLElementModel.fromCustomModel({
    tagName: 'center',
    mixedUAStyles: {
      textAlign: 'center',
    },
    contentModel: HTMLContentModel.block,
  }),
}

const permissions = [
  'read:account',
  'write:account',
  'read:blocks',
  'write:blocks',
  'read:drive',
  'write:drive',
  'read:favorites',
  'write:favorites',
  'read:following',
  'write:following',
  'read:messaging',
  'write:messaging',
  'read:mutes',
  'write:mutes',
  'write:notes',
  'read:notifications',
  'write:notifications',
  'read:reactions',
  'write:reactions',
  'write:votes',
  'read:pages',
  'write:pages',
  'write:page-likes',
  'read:page-likes',
  'read:user-groups',
  'write:user-groups',
  'read:channels',
  'write:channels',
  'read:gallery',
  'write:gallery',
  'read:gallery-likes',
  'write:gallery-likes',
]

export const MkInstanceCard: React.FC<{ instance: InstanceMeta }> = ({
  instance,
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [containerWidth, setContainerWidth] = React.useState(0)

  const description = React.useMemo(
    () => ({ html: instance.description! }),
    [instance.description],
  )

  const baseStyle = React.useMemo(() => ({ color: theme.fg }), [theme.fg])

  const [error, setError] = React.useState<string | null>(null)
  const [loggingIn, setLoggingIn] = React.useState(false)

  const login = React.useCallback(async () => {
    try {
      setLoggingIn(true)
      setError(null)

      const session = uuid.v4()

      const url =
        instance.uri +
        `/miauth/${session}?` +
        new URLSearchParams({
          name: 'Misskey App',
          permission: permissions.join(','),
          callback: `pikokr://misskey/login?${new URLSearchParams({
            host: instance.uri,
            session: session as string,
          })}`,
        }).toString()

      await Linking.openURL(url)
    } catch (e) {
      setError('login.errors.cannotOpenBrowser')
    } finally {
      setLoggingIn(false)
    }
  }, [instance])

  return (
    <Container
      onLayout={e => {
        setContainerWidth(e.nativeEvent.layout.width)
      }}>
      <Title>{instance.name}</Title>
      <SpaceTop>
        {instance.description ? (
          containerWidth ? (
            <RenderHtml
              baseStyle={baseStyle}
              contentWidth={containerWidth}
              customHTMLElementModels={customElements}
              source={description}
            />
          ) : (
            <ActivityIndicator color={theme.accent} />
          )
        ) : (
          <Description>{t('login.errors.noDescription')}</Description>
        )}
      </SpaceTop>
      <SpaceTop>
        {instance.features?.miauth ? (
          <MkButton
            loading={loggingIn}
            onPress={login}
            text={t('login.loginToInstance')}
          />
        ) : (
          <Alert severity="error">
            <AlertText>{t('login.errors.noMiAuth')}</AlertText>
          </Alert>
        )}
      </SpaceTop>
      {error && (
        <SpaceTop>
          <Alert severity="error">
            <AlertText>{t(error as any)}</AlertText>
          </Alert>
        </SpaceTop>
      )}
    </Container>
  )
}
