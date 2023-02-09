import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled, { useTheme } from 'styled-components/native'

const Container = styled.View<{ fullWidth?: boolean }>`
  background-color: ${({ theme }) => theme.accent};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  border-radius: 6px;
  overflow: hidden;
`

const TouchArea = styled.TouchableNativeFeedback`
  width: 100%;
  height: 100%;
`

const Content = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
`

const ButtonText = styled.Text`
  color: ${({ theme }) => theme.panel};
  font-size: 16px;
`

export const MiButton: React.FC<{
  fullWidth?: boolean
  text: string
  onPress?: () => void
  disabled?: boolean // TODO
  loading?: boolean
}> = ({ fullWidth, text, onPress, loading }) => {
  const theme = useTheme()

  return (
    <Container fullWidth={fullWidth}>
      <TouchArea disabled={loading} onPress={onPress}>
        <Content>
          {loading ? (
            <ActivityIndicator color={theme.panel} />
          ) : (
            <ButtonText>{text}</ButtonText>
          )}
        </Content>
      </TouchArea>
    </Container>
  )
}
