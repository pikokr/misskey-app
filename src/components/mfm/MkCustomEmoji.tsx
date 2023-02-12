import React from 'react'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'
import { useSelectedAccount } from '../../utils/accounts'

const Container = styled.View<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

const Content = styled.View<{ size: number }>`
  top: ${({ size }) => size / 4}px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: absolute;
`

export const MkCustomEmoji: React.FC<{
  url: string | undefined
  name: string
  size: number
}> = ({ url, name, size }) => {
  const selectedAccount = useSelectedAccount()

  return (
    <Container size={size}>
      <Content size={size}>
        <FastImage
          style={{ width: size, height: size }}
          source={{
            uri: url ?? selectedAccount.emojis[name]?.url,
          }}
        />
      </Content>
    </Container>
  )
}
