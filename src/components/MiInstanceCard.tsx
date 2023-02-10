import React from 'react'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components/native'
import { InstanceMeta } from '../types/meta'
import { MiButton } from './MiButton'
import RenderHtml, { HTMLElementModelRecord } from 'react-native-render-html'
import {
  HTMLContentModel,
  HTMLElementModel,
} from '@native-html/transient-render-engine'
import { ActivityIndicator } from 'react-native'
import { Alert, AlertText } from './Alert'

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

export const MiInstanceCard: React.FC<{ instance: InstanceMeta }> = ({
  instance,
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [containerWidth, setContainerWidth] = React.useState(0)

  const description = React.useMemo(
    () => ({ html: instance.description! }),
    [instance.description],
  )

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
              baseStyle={{ color: theme.fg }}
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
          <MiButton text={t('login.loginToInstance')} />
        ) : (
          <Alert severity="error">
            <AlertText>{t('login.errors.noMiAuth')}</AlertText>
          </Alert>
        )}
      </SpaceTop>
    </Container>
  )
}
